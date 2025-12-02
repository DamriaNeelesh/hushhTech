import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import services from "../../services/services";
import resources from "../../resources/resources";
import { UserPreferenceProfile } from "../../types/preferences";

interface FormState {
  name: string;
  email: string;
  age: number | "";
  phoneCountryCode: string;
  phoneNumber: string;
  organisation: string;
}

const defaultFormState: FormState = {
  name: "",
  email: "",
  age: "",
  phoneCountryCode: "+1",
  phoneNumber: "",
  organisation: "",
};

const HushhUserProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormState>(defaultFormState);
  const [userId, setUserId] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<UserPreferenceProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const [editingSection, setEditingSection] = useState<
    "food" | "drink" | "hotel" | "coffee" | "brand" | null
  >(null);

  type FoodProfile = UserPreferenceProfile["food"];
  type DrinkProfile = UserPreferenceProfile["drink"];
  type HotelProfile = UserPreferenceProfile["hotel"];
  type CoffeeProfile = UserPreferenceProfile["coffee"];
  type BrandProfile = UserPreferenceProfile["brand"];

  const [draftFood, setDraftFood] = useState<FoodProfile | null>(null);
  const [draftDrink, setDraftDrink] = useState<DrinkProfile | null>(null);
  const [draftHotel, setDraftHotel] = useState<HotelProfile | null>(null);
  const [draftCoffee, setDraftCoffee] = useState<CoffeeProfile | null>(null);
  const [draftBrand, setDraftBrand] = useState<BrandProfile | null>(null);

  // Prefill with Supabase user session
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const supabase = resources.config.supabaseClient;
        if (!supabase) {
          setError("Supabase client not available. Please try again later.");
          return;
        }

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/login");
          return;
        }
        setUserId(user.id);

        const fullName =
          (user.user_metadata?.full_name as string) ||
          [user.user_metadata?.first_name, user.user_metadata?.last_name]
            .filter(Boolean)
            .join(" ") ||
          "";

        // Start with basic auth metadata
        setForm((prev) => ({
          ...prev,
          name: fullName || prev.name,
          email: user.email || prev.email,
          organisation: (user.user_metadata?.company as string) || prev.organisation,
        }));

        // If a full Hushh ID already exists in Supabase, hydrate from there
        const existingRecord = await services.preferences.fetchPreferencesWithSeed(user.id);
        if (existingRecord) {
          const { preferences: existingPreferences, user_seed: existingSeed } = existingRecord;
          setPreferences(existingPreferences);

          if (existingSeed) {
            setForm((prev) => ({
              ...prev,
              name: existingSeed.name || prev.name,
              email: existingSeed.email || prev.email,
              age: existingSeed.age || prev.age,
              phoneCountryCode: existingSeed.phone_country_code || prev.phoneCountryCode,
              phoneNumber: existingSeed.phone_number || prev.phoneNumber,
              organisation: existingSeed.organisation || prev.organisation,
            }));
          }

          setStatus("Your Hushh ID is ready. You can review or update below.");
          return;
        }

        // Fallback: If we already stored preferences locally, show them
        const stored = localStorage.getItem("hushhUserPreferences");
        if (stored) {
          try {
            setPreferences(JSON.parse(stored));
          } catch {
            // ignore invalid cache
          }
        }
      } catch (e) {
        console.error("Failed to load session:", e);
        setError("Could not load your session. Please log in again.");
      }
    };

    bootstrap();
  }, [navigate]);

  const handleChange = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: key === "age" ? Number(value) || "" : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStatus(null);

    if (!form.name || !form.email || !form.phoneCountryCode || !form.phoneNumber || form.age === "") {
      setError("Please fill name, email, age, phone country code, and phone number.");
      return;
    }

    setLoading(true);
    try {
      let ensuredUserId = userId;
      if (!ensuredUserId) {
        const supabase = resources.config.supabaseClient;
        if (supabase) {
          const { data: { user } } = await supabase.auth.getUser();
          ensuredUserId = user?.id || null;
          if (user?.id) {
            setUserId(user.id);
          }
        }
      }

      if (!ensuredUserId) {
        throw new Error("Missing authenticated user id; please re-login with Google.");
      }

      const seed = {
        name: form.name,
        email: form.email,
        age: typeof form.age === "number" ? form.age : Number(form.age) || 0,
        phone_country_code: form.phoneCountryCode,
        phone_number: form.phoneNumber,
        organisation: form.organisation || null,
      };

      const result = await services.preferences.enrichPreferences(seed);
      setPreferences(result);
      localStorage.setItem("hushhUserPreferences", JSON.stringify(result));
      const userDetails = {
        id: ensuredUserId,
        name: seed.name,
        email: seed.email,
        age: seed.age,
        phoneCountryCode: seed.phone_country_code,
        phoneNumber: seed.phone_number,
        organisation: seed.organisation,
      };
      localStorage.setItem("hushhUserDetails", JSON.stringify(userDetails));
      setStatus("Preferences enriched successfully.");

      if (ensuredUserId) {
        // Save to Supabase in the background so the user is not blocked
        services.preferences
          .savePreferencesToSupabase(ensuredUserId, result, seed)
          .then((saveResult) => {
            if (!saveResult?.success) {
              console.error("Failed to save preferences to Supabase:", saveResult?.error);
            }
          })
          .catch((supabaseError) => {
            console.error("Failed to save preferences to Supabase:", supabaseError);
          });
      }

      navigate(`/profile/${ensuredUserId}`, { state: { preferences: result, user: userDetails } });
    } catch (prefError) {
      console.error("Enrichment failed:", prefError);
      setError(prefError instanceof Error ? prefError.message : "Failed to enrich preferences");
    } finally {
      setLoading(false);
    }
  };

  const formatList = (items?: string[]) => (items && items.length > 0 ? items.join(", ") : "unknown");
  const formatBudget = (budget?: { currency: string; min: number | null; max: number | null }) => {
    if (!budget) return "unknown";
    const min = budget.min ?? 0;
    const max = budget.max ?? 0;
    return `${budget.currency} ${min} - ${max}`;
  };

  const FOOD_OPTIONS = {
    dietType: ["veg", "non_veg", "vegan", "mixed", "unknown"],
    spiceLevel: ["low", "medium", "high", "unknown"],
    budgetLevel: ["low", "mid", "high", "unknown"],
    eatingOutFrequency: ["rarely", "weekly", "few_times_week", "daily", "unknown"],
  } as const;

  const DRINK_OPTIONS = {
    alcoholPreference: ["never", "occasionally", "frequently", "unknown"],
    sugarLevel: ["low", "medium", "high", "unknown"],
    caffeineTolerance: ["none", "low", "medium", "high", "unknown"],
  } as const;

  const HOTEL_OPTIONS = {
    hotelClass: ["hostel", "budget", "3_star", "4_star", "5_star", "unknown"],
    locationPreference: ["city_center", "suburbs", "near_airport", "scenic", "unknown"],
    roomType: ["single", "double", "dorm", "suite", "unknown"],
  } as const;

  const COFFEE_OPTIONS = {
    coffeeConsumerType: ["none", "occasional", "daily", "heavy", "unknown"],
    milkPreference: ["dairy", "oat", "soy", "almond", "none", "unknown"],
    sweetnessLevel: ["no_sugar", "low", "medium", "high", "unknown"],
    cafeAmbiencePreference: ["quiet_work", "casual", "social_loud", "no_preference"],
  } as const;

  const BRAND_OPTIONS = {
    fashionStyle: ["streetwear", "minimal", "formal", "sporty", "mixed", "unknown"],
    techEcosystem: ["apple", "android", "windows", "mixed", "unknown"],
    priceSensitivity: ["very_price_sensitive", "value_for_money", "mid_range", "premium", "unknown"],
  } as const;

  const hasPreferences = Boolean(preferences);

  const foodItems: PreferenceItem[] = preferences
    ? [
        { label: "Diet type", value: preferences.food.dietType },
        { label: "Spice level", value: preferences.food.spiceLevel },
        { label: "Favorite cuisines", value: formatList(preferences.food.favoriteCuisines) },
        { label: "Budget level", value: preferences.food.budgetLevel },
        { label: "Eating out", value: preferences.food.eatingOutFrequency },
      ]
    : [];

  const drinkItems: PreferenceItem[] = preferences
    ? [
        { label: "Alcohol preference", value: preferences.drink.alcoholPreference },
        { label: "Alcohol types", value: formatList(preferences.drink.favoriteAlcoholTypes) },
        { label: "Non‑alcoholic", value: formatList(preferences.drink.favoriteNonAlcoholicTypes) },
        { label: "Sugar level", value: preferences.drink.sugarLevel },
        { label: "Caffeine tolerance", value: preferences.drink.caffeineTolerance },
      ]
    : [];

  const hotelItems: PreferenceItem[] = preferences
    ? [
        { label: "Hotel class", value: preferences.hotel.hotelClass },
        { label: "Room type", value: preferences.hotel.roomType },
        { label: "Location", value: preferences.hotel.locationPreference },
        { label: "Budget / night", value: formatBudget(preferences.hotel.budgetPerNight) },
        { label: "Amenities", value: formatList(preferences.hotel.amenitiesPriority) },
      ]
    : [];

  const coffeeItems: PreferenceItem[] = preferences
    ? [
        { label: "Consumer type", value: preferences.coffee.coffeeConsumerType },
        { label: "Coffee styles", value: formatList(preferences.coffee.coffeeStyle) },
        { label: "Milk preference", value: preferences.coffee.milkPreference },
        { label: "Sweetness", value: preferences.coffee.sweetnessLevel },
        { label: "Cafe ambience", value: preferences.coffee.cafeAmbiencePreference },
      ]
    : [];

  const brandItems: PreferenceItem[] = preferences
    ? [
        { label: "Fashion style", value: preferences.brand.fashionStyle },
        { label: "Tech ecosystem", value: preferences.brand.techEcosystem },
        { label: "Shopping channels", value: formatList(preferences.brand.shoppingChannels) },
        { label: "Price sensitivity", value: preferences.brand.priceSensitivity },
        { label: "Brand values", value: formatList(preferences.brand.brandValues) },
      ]
    : [];

  const handleEditFood = () => {
    if (!preferences) return;
    setDraftFood(preferences.food);
    setEditingSection("food");
  };

  const handleSaveFood = async () => {
    if (!userId || !preferences || !draftFood) {
      setEditingSection(null);
      return;
    }

    const updatedPreferences: UserPreferenceProfile = {
      ...preferences,
      food: {
        ...draftFood,
        favoriteCuisines:
          draftFood.favoriteCuisines && draftFood.favoriteCuisines.length > 0
            ? draftFood.favoriteCuisines
            : ["unknown"],
      },
      lastEnrichedAt: new Date().toISOString(),
    };

    setPreferences(updatedPreferences);

    const seedFromForm = {
      name: form.name,
      email: form.email,
      age: typeof form.age === "number" ? form.age : Number(form.age) || 0,
      phone_country_code: form.phoneCountryCode,
      phone_number: form.phoneNumber,
      organisation: form.organisation || null,
    };

    services.preferences
      .savePreferencesToSupabase(userId, updatedPreferences, seedFromForm)
      .catch((saveError) => {
        console.error("Failed to save manual food edits to Supabase:", saveError);
      });

    setEditingSection(null);
    setDraftFood(null);
  };

  const handleEditDrink = () => {
    if (!preferences) return;
    setDraftDrink(preferences.drink);
    setEditingSection("drink");
  };

  const handleSaveDrink = async () => {
    if (!userId || !preferences || !draftDrink) {
      setEditingSection(null);
      return;
    }

    const updatedPreferences: UserPreferenceProfile = {
      ...preferences,
      drink: {
        ...draftDrink,
        favoriteAlcoholTypes:
          draftDrink.favoriteAlcoholTypes && draftDrink.favoriteAlcoholTypes.length > 0
            ? draftDrink.favoriteAlcoholTypes
            : ["unknown"],
        favoriteNonAlcoholicTypes:
          draftDrink.favoriteNonAlcoholicTypes && draftDrink.favoriteNonAlcoholicTypes.length > 0
            ? draftDrink.favoriteNonAlcoholicTypes
            : ["unknown"],
      },
      lastEnrichedAt: new Date().toISOString(),
    };

    setPreferences(updatedPreferences);

    const seedFromForm = {
      name: form.name,
      email: form.email,
      age: typeof form.age === "number" ? form.age : Number(form.age) || 0,
      phone_country_code: form.phoneCountryCode,
      phone_number: form.phoneNumber,
      organisation: form.organisation || null,
    };

    services.preferences
      .savePreferencesToSupabase(userId, updatedPreferences, seedFromForm)
      .catch((saveError) => {
        console.error("Failed to save manual drink edits to Supabase:", saveError);
      });

    setEditingSection(null);
    setDraftDrink(null);
  };

  const handleEditHotel = () => {
    if (!preferences) return;
    setDraftHotel(preferences.hotel);
    setEditingSection("hotel");
  };

  const handleSaveHotel = async () => {
    if (!userId || !preferences || !draftHotel) {
      setEditingSection(null);
      return;
    }

    const updatedPreferences: UserPreferenceProfile = {
      ...preferences,
      hotel: {
        ...draftHotel,
        amenitiesPriority:
          draftHotel.amenitiesPriority && draftHotel.amenitiesPriority.length > 0
            ? draftHotel.amenitiesPriority
            : ["unknown"],
      },
      lastEnrichedAt: new Date().toISOString(),
    };

    setPreferences(updatedPreferences);

    const seedFromForm = {
      name: form.name,
      email: form.email,
      age: typeof form.age === "number" ? form.age : Number(form.age) || 0,
      phone_country_code: form.phoneCountryCode,
      phone_number: form.phoneNumber,
      organisation: form.organisation || null,
    };

    services.preferences
      .savePreferencesToSupabase(userId, updatedPreferences, seedFromForm)
      .catch((saveError) => {
        console.error("Failed to save manual hotel edits to Supabase:", saveError);
      });

    setEditingSection(null);
    setDraftHotel(null);
  };

  const handleEditCoffee = () => {
    if (!preferences) return;
    setDraftCoffee(preferences.coffee);
    setEditingSection("coffee");
  };

  const handleSaveCoffee = async () => {
    if (!userId || !preferences || !draftCoffee) {
      setEditingSection(null);
      return;
    }

    const updatedPreferences: UserPreferenceProfile = {
      ...preferences,
      coffee: {
        ...draftCoffee,
        coffeeStyle:
          draftCoffee.coffeeStyle && draftCoffee.coffeeStyle.length > 0
            ? draftCoffee.coffeeStyle
            : ["unknown"],
      },
      lastEnrichedAt: new Date().toISOString(),
    };

    setPreferences(updatedPreferences);

    const seedFromForm = {
      name: form.name,
      email: form.email,
      age: typeof form.age === "number" ? form.age : Number(form.age) || 0,
      phone_country_code: form.phoneCountryCode,
      phone_number: form.phoneNumber,
      organisation: form.organisation || null,
    };

    services.preferences
      .savePreferencesToSupabase(userId, updatedPreferences, seedFromForm)
      .catch((saveError) => {
        console.error("Failed to save manual coffee edits to Supabase:", saveError);
      });

    setEditingSection(null);
    setDraftCoffee(null);
  };

  const handleEditBrand = () => {
    if (!preferences) return;
    setDraftBrand(preferences.brand);
    setEditingSection("brand");
  };

  const handleSaveBrand = async () => {
    if (!userId || !preferences || !draftBrand) {
      setEditingSection(null);
      return;
    }

    const updatedPreferences: UserPreferenceProfile = {
      ...preferences,
      brand: {
        ...draftBrand,
        shoppingChannels:
          draftBrand.shoppingChannels && draftBrand.shoppingChannels.length > 0
            ? draftBrand.shoppingChannels
            : ["unknown"],
        brandValues:
          draftBrand.brandValues && draftBrand.brandValues.length > 0
            ? draftBrand.brandValues
            : ["unknown"],
      },
      lastEnrichedAt: new Date().toISOString(),
    };

    setPreferences(updatedPreferences);

    const seedFromForm = {
      name: form.name,
      email: form.email,
      age: typeof form.age === "number" ? form.age : Number(form.age) || 0,
      phone_country_code: form.phoneCountryCode,
      phone_number: form.phoneNumber,
      organisation: form.organisation || null,
    };

    services.preferences
      .savePreferencesToSupabase(userId, updatedPreferences, seedFromForm)
      .catch((saveError) => {
        console.error("Failed to save manual brand edits to Supabase:", saveError);
      });

    setEditingSection(null);
    setDraftBrand(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-[#f3fbff] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-cyan-600 font-semibold">Investor Profile</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Create Your Investor Hushh ID</h1>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Create your investor profile once. Save to wallet. Share anywhere. No more repetitive forms.
              </p>
            </div>
            <div className="flex flex-col items-stretch md:items-end gap-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-white px-4 py-3 rounded-xl shadow-lg">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">Status</span>
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                  {preferences ? "Updated" : "Awaiting input"}
                </span>
              </div>
              {userId && (
                <button
                  type="button"
                  onClick={() => {
                    const origin = typeof window !== "undefined" ? window.location.origin : "https://www.hushhtech.com";
                    const shareUrl = `${origin}/hushhid/${userId}`;
                    if (navigator?.clipboard?.writeText) {
                      navigator.clipboard.writeText(shareUrl).catch((err) => {
                        console.error("Failed to copy Hushh ID link:", err);
                      });
                    }
                    setStatus("Hushh profile link copied.");
                  }}
                  className="mt-1 text-xs font-medium px-3 py-1 rounded-full bg-white/10 border border-white/30 hover:bg-white/15"
                >
                  Copy shareable Hushh ID link
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-7">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold text-gray-900">Your Hushh ID details</h2>
              <span className="text-xs text-gray-500">Edit anything here, then hit “Update preferences”.</span>
            </div>
            <p className="text-xs text-gray-500 mb-2">
              Changes you make are saved to your Hushh profile and used by Kai and Nav the next time they assist you.
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full name *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  placeholder="e.g., Ankit Sharma"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  placeholder="name@company.com"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
                  <input
                    type="number"
                    min={0}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={form.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    required
                    placeholder="22"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country code *</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={form.phoneCountryCode}
                    onChange={(e) => handleChange("phoneCountryCode", e.target.value)}
                    placeholder="+91"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone number *</label>
                  <input
                    type="tel"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={form.phoneNumber}
                    onChange={(e) => handleChange("phoneNumber", e.target.value)}
                    required
                    placeholder="9898989898"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organisation (optional)</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={form.organisation}
                  onChange={(e) => handleChange("organisation", e.target.value)}
                  placeholder="Company / team"
                />
              </div>

              {error && (
                <div className="text-red-700 text-sm bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </div>
              )}
              {status && (
                <div className="text-green-700 text-sm bg-green-50 border border-green-100 rounded-lg px-3 py-2">
                  {status}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-cyan-500 to-sky-500 hover:from-cyan-600 hover:to-sky-600 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-70 shadow-md"
              >
                {loading
                  ? hasPreferences
                    ? "Updating preferences..."
                    : "Generating preferences..."
                  : hasPreferences
                    ? "Update preferences"
                    : "Generate preferences"}
              </button>
            </form>
          </div>

          {/* Preferences card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-7">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Kai & Nav snapshot</h2>
                <p className="text-sm text-gray-500">
                  Food, drink, hotel, coffee, and brand defaults Kai and Nav are currently using for you.
                </p>
              </div>
              {preferences?.lastEnrichedAt && (
                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  Updated {new Date(preferences.lastEnrichedAt).toLocaleString()}
                </span>
              )}
            </div>

            {!preferences && (
              <div className="flex items-center gap-3 text-gray-600 bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4">
                <div className="h-10 w-10 rounded-full bg-cyan-50 text-cyan-600 font-semibold flex items-center justify-center">
                  AI
                </div>
                <p className="text-sm">
                  Submit the form to see your food, drink, hotel, coffee, and brand preferences here.
                </p>
              </div>
            )}

            {preferences && (
              <div className="space-y-4 text-sm text-gray-800">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700">{form.name}</span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">{form.email}</span>
                  <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                    Age {form.age || "NA"}
                  </span>
                </div>
                <p className="text-gray-600">
                  This is your current Hushh ID. Change any detail on the left and click "Update preferences" to resync what Kai and Nav see here.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <PreferenceCard title="Food" items={foodItems} onEdit={handleEditFood} />
                  <PreferenceCard title="Drink" items={drinkItems} onEdit={handleEditDrink} />
                  <PreferenceCard title="Hotel" items={hotelItems} onEdit={handleEditHotel} />
                  <PreferenceCard title="Coffee" items={coffeeItems} onEdit={handleEditCoffee} />
                  <PreferenceCard title="Brands" items={brandItems} onEdit={handleEditBrand} />
                </div>
              </div>
            )}
          </div>
        </div>

        {editingSection === "food" && draftFood && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Edit food preferences</h2>
                <button
                  type="button"
                  onClick={() => {
                    setEditingSection(null);
                    setDraftFood(null);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Diet type</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftFood.dietType}
                    onChange={(e) =>
                      setDraftFood((prev) => (prev ? { ...prev, dietType: e.target.value as FoodProfile["dietType"] } : prev))
                    }
                  >
                    {FOOD_OPTIONS.dietType.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Spice level</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftFood.spiceLevel}
                    onChange={(e) =>
                      setDraftFood((prev) => (prev ? { ...prev, spiceLevel: e.target.value as FoodProfile["spiceLevel"] } : prev))
                    }
                  >
                    {FOOD_OPTIONS.spiceLevel.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Budget level</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftFood.budgetLevel}
                    onChange={(e) =>
                      setDraftFood((prev) =>
                        prev ? { ...prev, budgetLevel: e.target.value as FoodProfile["budgetLevel"] } : prev
                      )
                    }
                  >
                    {FOOD_OPTIONS.budgetLevel.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Eating out</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftFood.eatingOutFrequency}
                    onChange={(e) =>
                      setDraftFood((prev) =>
                        prev
                          ? { ...prev, eatingOutFrequency: e.target.value as FoodProfile["eatingOutFrequency"] }
                          : prev
                      )
                    }
                  >
                    {FOOD_OPTIONS.eatingOutFrequency.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Favorite cuisines</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={draftFood.favoriteCuisines.join(", ")}
                  onChange={(e) =>
                    setDraftFood((prev) =>
                      prev
                        ? {
                            ...prev,
                            favoriteCuisines: e.target.value
                              .split(",")
                              .map((c) => c.trim())
                              .filter((c) => c.length > 0),
                          }
                        : prev
                    )
                  }
                  placeholder="Indian, Italian, Chinese"
                />
                <p className="mt-1 text-[11px] text-gray-500">
                  Separate cuisines with commas. This updates what Nav assumes you enjoy most.
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingSection(null);
                    setDraftFood(null);
                  }}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveFood}
                  className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold hover:from-cyan-600 hover:to-sky-600"
                >
                  Save food profile
                </button>
              </div>
            </div>
          </div>
        )}

        {editingSection === "drink" && draftDrink && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Edit drink preferences</h2>
                <button
                  type="button"
                  onClick={() => {
                    setEditingSection(null);
                    setDraftDrink(null);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Alcohol preference</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftDrink.alcoholPreference}
                    onChange={(e) =>
                      setDraftDrink((prev) =>
                        prev ? { ...prev, alcoholPreference: e.target.value as DrinkProfile["alcoholPreference"] } : prev
                      )
                    }
                  >
                    {DRINK_OPTIONS.alcoholPreference.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Sugar level</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftDrink.sugarLevel}
                    onChange={(e) =>
                      setDraftDrink((prev) =>
                        prev ? { ...prev, sugarLevel: e.target.value as DrinkProfile["sugarLevel"] } : prev
                      )
                    }
                  >
                    {DRINK_OPTIONS.sugarLevel.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Caffeine tolerance</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftDrink.caffeineTolerance}
                    onChange={(e) =>
                      setDraftDrink((prev) =>
                        prev
                          ? { ...prev, caffeineTolerance: e.target.value as DrinkProfile["caffeineTolerance"] }
                          : prev
                      )
                    }
                  >
                    {DRINK_OPTIONS.caffeineTolerance.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Alcohol types</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={draftDrink.favoriteAlcoholTypes.join(", ")}
                  onChange={(e) =>
                    setDraftDrink((prev) =>
                      prev
                        ? {
                            ...prev,
                            favoriteAlcoholTypes: e.target.value
                              .split(",")
                              .map((c) => c.trim())
                              .filter((c) => c.length > 0),
                          }
                        : prev
                    )
                  }
                  placeholder="beer, whiskey"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Non‑alcoholic</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={draftDrink.favoriteNonAlcoholicTypes.join(", ")}
                  onChange={(e) =>
                    setDraftDrink((prev) =>
                      prev
                        ? {
                            ...prev,
                            favoriteNonAlcoholicTypes: e.target.value
                              .split(",")
                              .map((c) => c.trim())
                              .filter((c) => c.length > 0),
                          }
                        : prev
                    )
                  }
                  placeholder="water, soda, juice"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingSection(null);
                    setDraftDrink(null);
                  }}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveDrink}
                  className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold hover:from-cyan-600 hover:to-sky-600"
                >
                  Save drink profile
                </button>
              </div>
            </div>
          </div>
        )}

        {editingSection === "hotel" && draftHotel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Edit hotel preferences</h2>
                <button
                  type="button"
                  onClick={() => {
                    setEditingSection(null);
                    setDraftHotel(null);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Hotel class</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftHotel.hotelClass}
                    onChange={(e) =>
                      setDraftHotel((prev) =>
                        prev ? { ...prev, hotelClass: e.target.value as HotelProfile["hotelClass"] } : prev
                      )
                    }
                  >
                    {HOTEL_OPTIONS.hotelClass.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Room type</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftHotel.roomType}
                    onChange={(e) =>
                      setDraftHotel((prev) =>
                        prev ? { ...prev, roomType: e.target.value as HotelProfile["roomType"] } : prev
                      )
                    }
                  >
                    {HOTEL_OPTIONS.roomType.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Location</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftHotel.locationPreference}
                    onChange={(e) =>
                      setDraftHotel((prev) =>
                        prev
                          ? { ...prev, locationPreference: e.target.value as HotelProfile["locationPreference"] }
                          : prev
                      )
                    }
                  >
                    {HOTEL_OPTIONS.locationPreference.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Budget min</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftHotel.budgetPerNight.min ?? 0}
                    onChange={(e) =>
                      setDraftHotel((prev) =>
                        prev
                          ? {
                              ...prev,
                              budgetPerNight: {
                                ...prev.budgetPerNight,
                                min: Number(e.target.value) || 0,
                              },
                            }
                          : prev
                      )
                    }
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Budget max</label>
                  <input
                    type="number"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftHotel.budgetPerNight.max ?? 0}
                    onChange={(e) =>
                      setDraftHotel((prev) =>
                        prev
                          ? {
                              ...prev,
                              budgetPerNight: {
                                ...prev.budgetPerNight,
                                max: Number(e.target.value) || 0,
                              },
                            }
                          : prev
                      )
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Amenities</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={draftHotel.amenitiesPriority.join(", ")}
                  onChange={(e) =>
                    setDraftHotel((prev) =>
                      prev
                        ? {
                            ...prev,
                            amenitiesPriority: e.target.value
                              .split(",")
                              .map((c) => c.trim())
                              .filter((c) => c.length > 0),
                          }
                        : prev
                    )
                  }
                  placeholder="wifi, breakfast, parking"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingSection(null);
                    setDraftHotel(null);
                  }}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveHotel}
                  className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold hover:from-cyan-600 hover:to-sky-600"
                >
                  Save hotel profile
                </button>
              </div>
            </div>
          </div>
        )}

        {editingSection === "coffee" && draftCoffee && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Edit coffee preferences</h2>
                <button
                  type="button"
                  onClick={() => {
                    setEditingSection(null);
                    setDraftCoffee(null);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Consumer type</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftCoffee.coffeeConsumerType}
                    onChange={(e) =>
                      setDraftCoffee((prev) =>
                        prev
                          ? { ...prev, coffeeConsumerType: e.target.value as CoffeeProfile["coffeeConsumerType"] }
                          : prev
                      )
                    }
                  >
                    {COFFEE_OPTIONS.coffeeConsumerType.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Milk preference</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftCoffee.milkPreference}
                    onChange={(e) =>
                      setDraftCoffee((prev) =>
                        prev ? { ...prev, milkPreference: e.target.value as CoffeeProfile["milkPreference"] } : prev
                      )
                    }
                  >
                    {COFFEE_OPTIONS.milkPreference.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Sweetness level</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftCoffee.sweetnessLevel}
                    onChange={(e) =>
                      setDraftCoffee((prev) =>
                        prev ? { ...prev, sweetnessLevel: e.target.value as CoffeeProfile["sweetnessLevel"] } : prev
                      )
                    }
                  >
                    {COFFEE_OPTIONS.sweetnessLevel.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Cafe ambience</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftCoffee.cafeAmbiencePreference}
                    onChange={(e) =>
                      setDraftCoffee((prev) =>
                        prev
                          ? {
                              ...prev,
                              cafeAmbiencePreference: e.target.value as CoffeeProfile["cafeAmbiencePreference"],
                            }
                          : prev
                      )
                    }
                  >
                    {COFFEE_OPTIONS.cafeAmbiencePreference.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Coffee styles</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={draftCoffee.coffeeStyle.join(", ")}
                  onChange={(e) =>
                    setDraftCoffee((prev) =>
                      prev
                        ? {
                            ...prev,
                            coffeeStyle: e.target.value
                              .split(",")
                              .map((c) => c.trim())
                              .filter((c) => c.length > 0),
                          }
                        : prev
                    )
                  }
                  placeholder="espresso, latte, cappuccino"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingSection(null);
                    setDraftCoffee(null);
                  }}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveCoffee}
                  className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold hover:from-cyan-600 hover:to-sky-600"
                >
                  Save coffee profile
                </button>
              </div>
            </div>
          </div>
        )}

        {editingSection === "brand" && draftBrand && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Edit brand preferences</h2>
                <button
                  type="button"
                  onClick={() => {
                    setEditingSection(null);
                    setDraftBrand(null);
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Fashion style</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftBrand.fashionStyle}
                    onChange={(e) =>
                      setDraftBrand((prev) =>
                        prev ? { ...prev, fashionStyle: e.target.value as BrandProfile["fashionStyle"] } : prev
                      )
                    }
                  >
                    {BRAND_OPTIONS.fashionStyle.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tech ecosystem</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftBrand.techEcosystem}
                    onChange={(e) =>
                      setDraftBrand((prev) =>
                        prev ? { ...prev, techEcosystem: e.target.value as BrandProfile["techEcosystem"] } : prev
                      )
                    }
                  >
                    {BRAND_OPTIONS.techEcosystem.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Price sensitivity</label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    value={draftBrand.priceSensitivity}
                    onChange={(e) =>
                      setDraftBrand((prev) =>
                        prev
                          ? { ...prev, priceSensitivity: e.target.value as BrandProfile["priceSensitivity"] }
                          : prev
                      )
                    }
                  >
                    {BRAND_OPTIONS.priceSensitivity.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Shopping channels</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={draftBrand.shoppingChannels.join(", ")}
                  onChange={(e) =>
                    setDraftBrand((prev) =>
                      prev
                        ? {
                            ...prev,
                            shoppingChannels: e.target.value
                              .split(",")
                              .map((c) => c.trim())
                              .filter((c) => c.length > 0),
                          }
                        : prev
                    )
                  }
                  placeholder="online, retail"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Brand values</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  value={draftBrand.brandValues.join(", ")}
                  onChange={(e) =>
                    setDraftBrand((prev) =>
                      prev
                        ? {
                            ...prev,
                            brandValues: e.target.value
                              .split(",")
                              .map((c) => c.trim())
                              .filter((c) => c.length > 0),
                          }
                        : prev
                    )
                  }
                  placeholder="sustainability, innovation"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setEditingSection(null);
                    setDraftBrand(null);
                  }}
                  className="px-4 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveBrand}
                  className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold hover:from-cyan-600 hover:to-sky-600"
                >
                  Save brand profile
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Inline preview only; full view is a dedicated page */}
      </div>
    </div>
  );
};

export default HushhUserProfilePage;

type PreferenceItem = { label: string; value: string };

const PreferenceCard = ({
  title,
  items,
  onEdit,
}: {
  title: string;
  items: PreferenceItem[];
  onEdit?: () => void;
}) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        {onEdit ? (
          <button
            type="button"
            onClick={onEdit}
            className="text-xs font-medium text-cyan-600 hover:text-cyan-700"
          >
            Edit
          </button>
        ) : (
          <span className="h-2 w-2 rounded-full bg-cyan-500 inline-block"></span>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
        {items.map((item) => (
          <div key={item.label} className="flex justify-between">
            <span className="text-gray-500">{item.label}</span>
            <span className="font-medium text-gray-900 text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

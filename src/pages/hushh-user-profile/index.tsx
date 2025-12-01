import React, { useEffect, useRef, useState } from "react";
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
  const [preferences, setPreferences] = useState<UserPreferenceProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const resultRef = useRef<HTMLDivElement | null>(null);

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

        const fullName =
          (user.user_metadata?.full_name as string) ||
          [user.user_metadata?.first_name, user.user_metadata?.last_name]
            .filter(Boolean)
            .join(" ") ||
          "";

        setForm((prev) => ({
          ...prev,
          name: fullName || prev.name,
          email: user.email || prev.email,
          organisation: (user.user_metadata?.company as string) || prev.organisation,
        }));

        // If we already stored preferences locally, show them
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
      setStatus("Preferences enriched successfully.");
      setShowResults(true);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-[#f3fbff] py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-wide text-cyan-600 font-semibold">Hushh Profile</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Personalize with AI</h1>
              <p className="text-gray-600 mt-2 max-w-2xl">
                Provide your basic details and we’ll generate lifestyle defaults across food, drink, hotel, coffee, and brands.
                Edit anytime—this is just a smart starting point.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-white px-4 py-3 rounded-xl shadow-lg">
              <span className="text-sm font-medium">Status</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                {preferences ? "Updated" : "Awaiting input"}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-7">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">User details</h2>
              <span className="text-xs text-gray-500">Required fields are marked *</span>
            </div>
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
                {loading ? "Generating preferences..." : "Generate preferences"}
              </button>
            </form>
          </div>

          {/* Preferences card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-7">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">AI-inferred profile</h2>
                <p className="text-sm text-gray-500">Food, drink, hotel, coffee, and brand defaults</p>
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
              <div className="space-y-4">
                <PreferenceCard
                  title="Food"
                  items={[
                    { label: "Diet", value: preferences.food.dietType },
                    { label: "Spice", value: preferences.food.spiceLevel },
                    { label: "Budget", value: preferences.food.budgetLevel },
                    { label: "Eats out", value: preferences.food.eatingOutFrequency },
                    { label: "Cuisines", value: formatList(preferences.food.favoriteCuisines) },
                  ]}
                />
                <PreferenceCard
                  title="Drink"
                  items={[
                    { label: "Alcohol", value: preferences.drink.alcoholPreference },
                    { label: "Alcohol types", value: formatList(preferences.drink.favoriteAlcoholTypes) },
                    { label: "Non-alcoholic", value: formatList(preferences.drink.favoriteNonAlcoholicTypes) },
                    { label: "Sugar", value: preferences.drink.sugarLevel },
                    { label: "Caffeine tolerance", value: preferences.drink.caffeineTolerance },
                  ]}
                />
                <PreferenceCard
                  title="Hotel"
                  items={[
                    { label: "Budget/night", value: formatBudget(preferences.hotel.budgetPerNight) },
                    { label: "Class", value: preferences.hotel.hotelClass },
                    { label: "Location", value: preferences.hotel.locationPreference },
                    { label: "Room", value: preferences.hotel.roomType },
                    { label: "Amenities", value: formatList(preferences.hotel.amenitiesPriority) },
                  ]}
                />
                <PreferenceCard
                  title="Coffee"
                  items={[
                    { label: "Consumer type", value: preferences.coffee.coffeeConsumerType },
                    { label: "Styles", value: formatList(preferences.coffee.coffeeStyle) },
                    { label: "Milk", value: preferences.coffee.milkPreference },
                    { label: "Sweetness", value: preferences.coffee.sweetnessLevel },
                    { label: "Ambience", value: preferences.coffee.cafeAmbiencePreference },
                  ]}
                />
                <PreferenceCard
                  title="Brands & shopping"
                  items={[
                    { label: "Style", value: preferences.brand.fashionStyle },
                    { label: "Tech ecosystem", value: preferences.brand.techEcosystem },
                    { label: "Shopping channels", value: formatList(preferences.brand.shoppingChannels) },
                    { label: "Price point", value: preferences.brand.priceSensitivity },
                    { label: "Values", value: formatList(preferences.brand.brandValues) },
                  ]}
                />
              </div>
            )}
          </div>
        </div>

        {/* Results page style block */}
        {preferences && showResults && (
          <div ref={resultRef} className="mt-10">
            <div className="bg-gradient-to-r from-cyan-600 to-sky-500 text-white rounded-2xl p-6 shadow-lg">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-sm uppercase tracking-wide font-semibold opacity-90">Your AI profile</p>
                  <h3 className="text-2xl md:text-3xl font-bold mt-1">{form.name || "Hushh User"}</h3>
                  <p className="text-sm mt-1 opacity-90">{form.email}</p>
                </div>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-white/15 px-3 py-1 rounded-full">Age {form.age || "NA"}</span>
                  <span className="bg-white/15 px-3 py-1 rounded-full">
                    {form.phoneCountryCode} {form.phoneNumber}
                  </span>
                  {form.organisation && (
                    <span className="bg-white/15 px-3 py-1 rounded-full">Org: {form.organisation}</span>
                  )}
                  <span className="bg-white/15 px-3 py-1 rounded-full">
                    Updated {new Date(preferences.lastEnrichedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <PreferenceCard
                title="Food"
                items={[
                  { label: "Diet", value: preferences.food.dietType },
                  { label: "Spice", value: preferences.food.spiceLevel },
                  { label: "Budget", value: preferences.food.budgetLevel },
                  { label: "Eats out", value: preferences.food.eatingOutFrequency },
                  { label: "Cuisines", value: formatList(preferences.food.favoriteCuisines) },
                ]}
              />
              <PreferenceCard
                title="Drink"
                items={[
                  { label: "Alcohol", value: preferences.drink.alcoholPreference },
                  { label: "Alcohol types", value: formatList(preferences.drink.favoriteAlcoholTypes) },
                  { label: "Non-alcoholic", value: formatList(preferences.drink.favoriteNonAlcoholicTypes) },
                  { label: "Sugar", value: preferences.drink.sugarLevel },
                  { label: "Caffeine tolerance", value: preferences.drink.caffeineTolerance },
                ]}
              />
              <PreferenceCard
                title="Hotel"
                items={[
                  { label: "Budget/night", value: formatBudget(preferences.hotel.budgetPerNight) },
                  { label: "Class", value: preferences.hotel.hotelClass },
                  { label: "Location", value: preferences.hotel.locationPreference },
                  { label: "Room", value: preferences.hotel.roomType },
                  { label: "Amenities", value: formatList(preferences.hotel.amenitiesPriority) },
                ]}
              />
              <PreferenceCard
                title="Coffee"
                items={[
                  { label: "Consumer type", value: preferences.coffee.coffeeConsumerType },
                  { label: "Styles", value: formatList(preferences.coffee.coffeeStyle) },
                  { label: "Milk", value: preferences.coffee.milkPreference },
                  { label: "Sweetness", value: preferences.coffee.sweetnessLevel },
                  { label: "Ambience", value: preferences.coffee.cafeAmbiencePreference },
                ]}
              />
              <PreferenceCard
                title="Brands & shopping"
                items={[
                  { label: "Style", value: preferences.brand.fashionStyle },
                  { label: "Tech ecosystem", value: preferences.brand.techEcosystem },
                  { label: "Shopping channels", value: formatList(preferences.brand.shoppingChannels) },
                  { label: "Price point", value: preferences.brand.priceSensitivity },
                  { label: "Values", value: formatList(preferences.brand.brandValues) },
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HushhUserProfilePage;

type PreferenceItem = { label: string; value: string };

const PreferenceCard = ({ title, items }: { title: string; items: PreferenceItem[] }) => {
  return (
    <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-gray-800">{title}</h3>
        <span className="h-2 w-2 rounded-full bg-cyan-500 inline-block"></span>
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

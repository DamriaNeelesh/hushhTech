import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserPreferenceProfile } from "../../types/preferences";

type UserDetails = {
  id?: string | null;
  name: string;
  email: string;
  age: number;
  phoneCountryCode: string;
  phoneNumber: string;
  organisation: string | null;
};

type LocationState = {
  preferences?: UserPreferenceProfile;
  user?: UserDetails;
};

const fallbackOrigin =
  typeof window !== "undefined" ? window.location.origin : "https://www.hushhtech.com";

const PreferenceCard = ({ title, items }: { title: string; items: { label: string; value: string }[] }) => {
  return (
    <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="h-2 w-2 rounded-full bg-cyan-500 inline-block"></span>
      </div>
      <div className="space-y-2 text-sm text-gray-800">
        {items.map((item) => (
          <div key={item.label} className="flex items-baseline justify-between gap-4">
            <span className="text-gray-500 whitespace-nowrap">{item.label}</span>
            <span className="font-semibold text-gray-900 text-right flex-1 truncate">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ViewPreferencesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as LocationState;
  const { id: routeUserId } = useParams();

  const [preferences, setPreferences] = useState<UserPreferenceProfile | null>(state.preferences || null);
  const [user, setUser] = useState<UserDetails | null>(state.user || null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const hydrate = async () => {
      if (routeUserId) {
        try {
          const res = await fetch(`/api/public-profile/${routeUserId}`);
          if (!res.ok) {
            const text = await res.text();
            throw new Error(text || "Failed to load profile");
          }
          const json = await res.json();
          if (json?.user?.profile) {
            setPreferences(json.user.profile as UserPreferenceProfile);
            localStorage.setItem("hushhUserPreferences", JSON.stringify(json.user.profile));
          }
          const seededUser: UserDetails = {
            id: routeUserId,
            name: json.user.name || "",
            email: json.user.email || "",
            age: json.user.age || 0,
            phoneCountryCode: json.user.phone_country_code || "",
            phoneNumber: json.user.phone_number || "",
            organisation: json.user.organisation || null,
          };
          setUser(seededUser);
          localStorage.setItem("hushhUserDetails", JSON.stringify(seededUser));
        } catch (error) {
          console.error("Failed to load preferences by user id:", error);
          setLoadError(error instanceof Error ? error.message : "Unable to load profile");
        }
      }

      if (!state.preferences && !preferences) {
        const cached = localStorage.getItem("hushhUserPreferences");
        if (cached) {
          try {
            setPreferences(JSON.parse(cached) as UserPreferenceProfile);
          } catch {
            /* ignore */
          }
        }
      }
      if (!state.user && !user) {
        const cachedUser = localStorage.getItem("hushhUserDetails");
        if (cachedUser) {
          try {
            setUser(JSON.parse(cachedUser) as UserDetails);
          } catch {
            /* ignore */
          }
        }
      }
    };

    hydrate();
  }, [routeUserId, state.preferences, state.user]);

  useEffect(() => {
    if (!preferences && !routeUserId) {
      navigate("/hushh-user-profile");
    }
  }, [navigate, preferences, routeUserId]);

  if (!preferences) return null;

  const formatList = (items?: string[]) => (items && items.length > 0 ? items.join(", ") : "unknown");
  const formatBudget = (budget?: { currency: string; min: number | null; max: number | null }) => {
    if (!budget) return "unknown";
    const min = budget.min ?? 0;
    const max = budget.max ?? 0;
    return `${budget.currency} ${min} - ${max}`;
  };

  const [isGeneratingPass, setIsGeneratingPass] = useState(false);
  const [passError, setPassError] = useState<string | null>(null);
  const profileLink = `${fallbackOrigin}/profile/${routeUserId || user?.id || ""}`;

  const handleGeneratePass = async () => {
    if (!user || !preferences) return;
    setIsGeneratingPass(true);
    setPassError(null);

    try {
      const passPayload = {
        passType: "generic",
        description: "Hushh Lifestyle Profile",
        organizationName: "Hushh Technologies",
        logoText: "HUSHH",
        backgroundColor: "rgb(26, 26, 46)",
        foregroundColor: "rgb(255, 255, 255)",
        primaryFields: [
          { key: "name", label: "Name", value: user.name || "Hushh User" },
        ],
        secondaryFields: [
          { key: "diet", label: "Diet", value: preferences.food.dietType },
          { key: "style", label: "Style", value: preferences.brand.fashionStyle },
          { key: "tech", label: "Tech", value: preferences.brand.techEcosystem },
        ],
        auxiliaryFields: [
          { key: "hotel", label: "Hotel", value: formatBudget(preferences.hotel.budgetPerNight) },
          { key: "coffee", label: "Coffee", value: preferences.coffee.coffeeConsumerType },
          { key: "drink", label: "Drink", value: preferences.drink.alcoholPreference },
        ],
        barcode: {
          message: profileLink,
          format: "PKBarcodeFormatQR",
        },
      };
      // Server proxy to avoid CORS
      const res = await fetch(" https://hushh-wallet.vercel.app/api/wallet-pass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(passPayload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Wallet pass generation failed");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "hushh-profile.pkpass";
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err: any) {
      setPassError(err?.message || "Unable to generate pass right now.");
    } finally {
      setIsGeneratingPass(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-[#f8fcff] py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-8">
        {loadError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {loadError}
          </div>
        )}
        {/* Hero */}
        <div className="bg-gradient-to-r from-cyan-600 via-sky-500 to-cyan-500 text-white rounded-3xl p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold opacity-90">AI lifestyle profile</p>
              <h1 className="text-3xl lg:text-4xl font-bold">{user?.name || "Hushh User"}</h1>
              <p className="text-sm opacity-90">{user?.email}</p>
              {user?.organisation && (
                <p className="text-sm opacity-90">Organisation: {user.organisation}</p>
              )}
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <span className="bg-white/15 px-3 py-1 rounded-full">Age {user?.age ?? "NA"}</span>
              {user?.phoneCountryCode && user?.phoneNumber && (
                <span className="bg-white/15 px-3 py-1 rounded-full">
                  {user.phoneCountryCode} {user.phoneNumber}
                </span>
              )}
              <span className="bg-white/15 px-3 py-1 rounded-full">
                Updated {new Date(preferences.lastEnrichedAt).toLocaleString()}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 text-sm">
              <button
                onClick={() => navigate("/hushh-user-profile")}
                className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg shadow-sm hover:bg-white/15 transition"
              >
                Edit details
              </button>
              <button
                onClick={handleGeneratePass}
                disabled={isGeneratingPass}
                className="px-4 py-2 bg-white text-cyan-700 rounded-lg shadow-sm hover:bg-gray-50 transition disabled:opacity-70"
              >
                {isGeneratingPass ? "Generating Wallet Pass..." : "Add to Apple Wallet"}
              </button>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg shadow-sm hover:bg-white/15 transition"
              >
                Back to home
              </button>
            </div>
          </div>
          {passError && (
            <div className="mt-3 text-sm bg-white/15 border border-white/25 text-white px-4 py-2 rounded-lg">
              {passError}
            </div>
          )}
        </div>

        {/* Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-gray-500">Food</p>
            <p className="text-lg font-semibold text-gray-900 mt-1 truncate">
              {formatList(preferences.food.favoriteCuisines)}
            </p>
            <p className="text-sm text-gray-500">Diet: {preferences.food.dietType} • Spice: {preferences.food.spiceLevel}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-gray-500">Hotel</p>
            <p className="text-lg font-semibold text-gray-900 mt-1 truncate">
              {formatBudget(preferences.hotel.budgetPerNight)}
            </p>
            <p className="text-sm text-gray-500">Class: {preferences.hotel.hotelClass} • Location: {preferences.hotel.locationPreference}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-gray-500">Brands</p>
            <p className="text-lg font-semibold text-gray-900 mt-1 truncate">{preferences.brand.fashionStyle}</p>
            <p className="text-sm text-gray-500">
              Tech: {preferences.brand.techEcosystem} • Price: {preferences.brand.priceSensitivity}
            </p>
          </div>
        </div>

        {/* Detailed cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
    </div>
  );
};

export default ViewPreferencesPage;

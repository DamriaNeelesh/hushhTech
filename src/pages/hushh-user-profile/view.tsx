import React, { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserPreferenceProfile } from "../../types/preferences";

type UserDetails = {
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

  const preferences: UserPreferenceProfile | null = useMemo(() => {
    if (state.preferences) return state.preferences;
    const cached = localStorage.getItem("hushhUserPreferences");
    if (cached) {
      try {
        return JSON.parse(cached) as UserPreferenceProfile;
      } catch {
        return null;
      }
    }
    return null;
  }, [state.preferences]);

  const user: UserDetails | null = useMemo(() => {
    if (state.user) return state.user;
    const cached = localStorage.getItem("hushhUserDetails");
    if (cached) {
      try {
        return JSON.parse(cached) as UserDetails;
      } catch {
        return null;
      }
    }
    return null;
  }, [state.user]);

  useEffect(() => {
    if (!preferences) {
      navigate("/hushh-user-profile");
    }
  }, [navigate, preferences]);

  if (!preferences) return null;

  const formatList = (items?: string[]) => (items && items.length > 0 ? items.join(", ") : "unknown");
  const formatBudget = (budget?: { currency: string; min: number | null; max: number | null }) => {
    if (!budget) return "unknown";
    const min = budget.min ?? 0;
    const max = budget.max ?? 0;
    return `${budget.currency} ${min} - ${max}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-[#f8fcff] py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-8">
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
          </div>
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

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={() => navigate("/hushh-user-profile")}
            className="px-5 py-3 bg-white border border-gray-200 text-gray-800 rounded-lg shadow-sm hover:bg-gray-50"
          >
            Edit details
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-3 bg-gradient-to-r from-cyan-500 to-sky-500 text-white rounded-lg shadow-md hover:from-cyan-600 hover:to-sky-600"
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPreferencesPage;

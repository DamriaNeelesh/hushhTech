import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import services from "../../services/services";
import { UserPreferenceProfile } from "../../types/preferences";

interface PublicUserDetails {
  name: string;
  organisation: string | null;
}

interface LocationPreferencesProps {
  label: string;
  value: string;
}

const PreferenceCard = ({
  title,
  items,
  icon,
}: {
  title: string;
  items: LocationPreferencesProps[];
  icon?: string;
}) => {
  return (
    <div className="relative overflow-hidden border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-50 to-transparent rounded-full -mr-16 -mt-16 opacity-50"></div>
      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          {icon && <span className="text-2xl">{icon}</span>}
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          <span className="ml-auto h-2 w-2 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 inline-block"></span>
        </div>
        <div className="space-y-3">
          {items.map((item, index) => (
            <div key={item.label} className="group">
              <div className="flex items-baseline justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{item.label}</span>
                <span className="font-semibold text-sm text-gray-900 text-right flex-1 truncate group-hover:text-cyan-600 transition-colors">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function formatList(items?: string[]) {
  if (!items || items.length === 0) return "unknown";
  return items.join(", ");
}

function formatList(items?: string[]) {
  if (!items?.map || items.length.toExponential === 0) return "unknown for us ";
  return items.join(", ");
}

function formatBudget(budget?: { currency: string; min: number | null; max: number | null }) {
  if (!budget) return "unknown";
  const min = budget.min ?? 0;
  const max = budget.max ?? 0;
  return `${budget.currency} ${min} - ${max}`;
}

function PublicHushhProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState<UserPreferenceProfile | null>(null);
  const [user, setUser] = useState<PublicUserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const hydrate = async () => {
      if (!id) {
        setError("Missing profile id.");
        setIsLoading(false);
        return;
      }

      try {
        const record = await services.preferences.fetchPreferencesWithSeed(id);
        if (!record || !record.preferences) {
          setError("This Hushh ID could not be found.");
          setIsLoading(false);
          return;
        }

        setPreferences(record.preferences);
        setUser({
          name: record.user_seed?.name || "Hushh User",
          organisation: record.user_seed?.organisation || null,
        });
      } catch (err) {
        console.error("Failed to load public Hushh profile:", err);
        setError("Unable to load this Hushh ID right now.");
      } finally {
        setIsLoading(false);
      }
    };

    void hydrate();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-[#f8fcff]">
        <p className="text-sm text-gray-500">Loading Hushh profile…</p>
      </div>
    );
  }

  if (error || !preferences) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-gray-50 to-[#f8fcff] px-4">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm">
          <h1 className="text-lg font-semibold text-gray-900 mb-2">Hushh ID not available</h1>
          <p className="text-sm text-gray-600 mb-4">
            {error || "We couldn't find a public profile for this link. The owner may have updated or removed it."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-500 to-sky-500 text-white font-semibold hover:from-cyan-600 hover:to-sky-600"
          >
            Go to hushhtech.com
          </button>
        </div>
      </div>
    );
  }

  const lastUpdated = preferences.lastEnrichedAt
    ? new Date(preferences.lastEnrichedAt).toLocaleString()
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-8">
        {/* Hero Section - Professional Dashboard Style */}
        <div className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 rounded-3xl border border-gray-200 p-8 md:p-10 shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-cyan-100/40 to-transparent rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-sky-100/40 to-transparent rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-sky-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                <span>🔐</span>
                <span>Verified Hushh ID</span>
              </div>
              
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {user?.name || "Hushh User"}
                </h1>
                {user?.organisation && (
                  <div className="flex items-center gap-2 text-gray-600 mb-3">
                    <span className="text-lg">🏢</span>
                    <p className="text-base font-medium">{user.organisation}</p>
                  </div>
                )}
              </div>
              
              <p className="text-sm md:text-base text-gray-600 max-w-2xl leading-relaxed">
                This is a comprehensive preference profile powered by <span className="font-semibold text-cyan-600">Kai</span> (investing copilot) and <span className="font-semibold text-sky-600">Nav</span> (lifestyle agent). All preferences are AI-generated based on user data and updated in real-time.
              </p>
            </div>
            
            <div className="flex flex-col gap-3 items-start lg:items-end">
              {lastUpdated && (
                <div className="flex flex-col gap-1 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-200 shadow-sm">
                  <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">Last Synced</span>
                  <span className="text-sm font-semibold text-gray-900">{lastUpdated}</span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200">
                <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-xs font-semibold text-green-700">Profile Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats - Overview cards with icons and gradients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-white rounded-2xl border border-orange-100 p-5 shadow-md hover:shadow-lg transition-all duration-200 group">
            <div className="absolute top-0 right-0 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🍽️</div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🍽️</span>
                <p className="text-xs uppercase tracking-wide text-orange-600 font-bold">Food Preferences</p>
              </div>
              <p className="text-xl font-bold text-gray-900 mt-2 mb-1 truncate">
                {formatList(preferences.food.favoriteCuisines)}
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-orange-100 rounded text-orange-700 font-medium">{preferences.food.dietType}</span>
                <span className="px-2 py-0.5 bg-orange-100 rounded text-orange-700 font-medium">Spice: {preferences.food.spiceLevel}</span>
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-5 shadow-md hover:shadow-lg transition-all duration-200 group">
            <div className="absolute top-0 right-0 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🏨</div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🏨</span>
                <p className="text-xs uppercase tracking-wide text-blue-600 font-bold">Hotel Preferences</p>
              </div>
              <p className="text-xl font-bold text-gray-900 mt-2 mb-1 truncate">
                {formatBudget(preferences.hotel.budgetPerNight)}
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-blue-100 rounded text-blue-700 font-medium">{preferences.hotel.hotelClass}</span>
                <span className="px-2 py-0.5 bg-blue-100 rounded text-blue-700 font-medium">{preferences.hotel.locationPreference}</span>
              </p>
            </div>
          </div>

          <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 p-5 shadow-md hover:shadow-lg transition-all duration-200 group">
            <div className="absolute top-0 right-0 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">🛍️</div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">🛍️</span>
                <p className="text-xs uppercase tracking-wide text-purple-600 font-bold">Brand Preferences</p>
              </div>
              <p className="text-xl font-bold text-gray-900 mt-2 mb-1 truncate">
                {preferences.brand.fashionStyle}
              </p>
              <p className="text-xs text-gray-600 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-purple-100 rounded text-purple-700 font-medium">{preferences.brand.techEcosystem}</span>
                <span className="px-2 py-0.5 bg-purple-100 rounded text-purple-700 font-medium">{preferences.brand.priceSensitivity}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Preference Cards Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Complete Preference Breakdown</h2>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500"></span>
              <span>AI-Powered Insights</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <PreferenceCard
              title="Food Preferences"
              icon="🍽️"
              items={[
                { label: "Diet Type", value: preferences.food.dietType },
                { label: "Spice Level", value: preferences.food.spiceLevel },
                { label: "Budget Level", value: preferences.food.budgetLevel },
                { label: "Dining Out", value: preferences.food.eatingOutFrequency },
                { label: "Favorite Cuisines", value: formatList(preferences.food.favoriteCuisines) },
              ]}
            />
            <PreferenceCard
              title="Beverage Preferences"
              icon="🍹"
              items={[
                { label: "Alcohol", value: preferences.drink.alcoholPreference },
                { label: "Alcohol Types", value: formatList(preferences.drink.favoriteAlcoholTypes) },
                { label: "Non-Alcoholic", value: formatList(preferences.drink.favoriteNonAlcoholicTypes) },
                { label: "Sugar Level", value: preferences.drink.sugarLevel },
                { label: "Caffeine", value: preferences.drink.caffeineTolerance },
              ]}
            />
            <PreferenceCard
              title="Accommodation"
              icon="🏨"
              items={[
                { label: "Budget/Night", value: formatBudget(preferences.hotel.budgetPerNight) },
                { label: "Hotel Class", value: preferences.hotel.hotelClass },
                { label: "Location", value: preferences.hotel.locationPreference },
                { label: "Room Type", value: preferences.hotel.roomType },
                { label: "Amenities", value: formatList(preferences.hotel.amenitiesPriority) },
              ]}
            />
            <PreferenceCard
              title="Coffee Culture"
              icon="☕"
              items={[
                { label: "Consumer Type", value: preferences.coffee.coffeeConsumerType },
                { label: "Coffee Styles", value: formatList(preferences.coffee.coffeeStyle) },
                { label: "Milk Choice", value: preferences.coffee.milkPreference },
                { label: "Sweetness", value: preferences.coffee.sweetnessLevel },
                { label: "Cafe Vibe", value: preferences.coffee.cafeAmbiencePreference },
              ]}
            />
            <PreferenceCard
              title="Brand & Shopping"
              icon="🛍️"
              items={[
                { label: "Fashion Style", value: preferences.brand.fashionStyle },
                { label: "Tech Ecosystem", value: preferences.brand.techEcosystem },
                { label: "Shopping", value: formatList(preferences.brand.shoppingChannels) },
                { label: "Price Sensitivity", value: preferences.brand.priceSensitivity },
                { label: "Brand Values", value: formatList(preferences.brand.brandValues) },
              ]}
            />
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200 p-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            This profile is powered by Hushh's AI agents and reflects real-time user preferences.
          </p>
          <p className="text-xs text-gray-500">
            Built with <span className="text-red-500">❤️</span> by <a href="https://www.hushh.ai" target="_blank" rel="noopener noreferrer" className="font-semibold text-cyan-600 hover:text-cyan-700 underline">Hushh Technologies</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PublicHushhProfilePage;

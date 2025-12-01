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
}: {
  title: string;
  items: LocationPreferencesProps[];
}) => {
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

function formatList(items?: string[]) {
  if (!items || items.length === 0) return "unknown";
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
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-[#f8fcff] py-12">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 space-y-8">
        {/* Hero */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-cyan-600">Hushh ID</p>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Hushh profile for {user?.name || "Hushh User"}
              </h1>
              {user?.organisation && (
                <p className="text-sm text-gray-600">Organisation: {user.organisation}</p>
              )}
              <p className="text-sm text-gray-600 max-w-xl">
                This is a shared snapshot of how Kai, the explainable investing copilot, and Nav, the lifestyle agent,
                understand this profile today.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs md:text-sm text-gray-600">
              {lastUpdated && (
                <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
                  Last updated {lastUpdated}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-gray-500">Food</p>
            <p className="text-lg font-semibold text-gray-900 mt-1 truncate">
              {formatList(preferences.food.favoriteCuisines)}
            </p>
            <p className="text-sm text-gray-500">
              Diet: {preferences.food.dietType} • Spice: {preferences.food.spiceLevel}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-gray-500">Hotel</p>
            <p className="text-lg font-semibold text-gray-900 mt-1 truncate">
              {formatBudget(preferences.hotel.budgetPerNight)}
            </p>
            <p className="text-sm text-gray-500">
              Class: {preferences.hotel.hotelClass} • Location: {preferences.hotel.locationPreference}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-gray-500">Brands</p>
            <p className="text-lg font-semibold text-gray-900 mt-1 truncate">
              {preferences.brand.fashionStyle}
            </p>
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
}

export default PublicHushhProfilePage;

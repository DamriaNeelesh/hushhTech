export type DietType = "veg" | "non_veg" | "vegan" | "mixed" | "unknown";
export type SpiceLevel = "low" | "medium" | "high" | "unknown";
export type BudgetLevel = "low" | "mid" | "high" | "unknown";
export type EatingOutFrequency = "rarely" | "weekly" | "few_times_week" | "daily" | "unknown";

export interface FoodPreference {
  dietType: DietType;
  spiceLevel: SpiceLevel;
  favoriteCuisines: string[];
  budgetLevel: BudgetLevel;
  eatingOutFrequency: EatingOutFrequency;
}

export type AlcoholPreference = "never" | "occasionally" | "frequently" | "unknown";
export type SugarLevel = "low" | "medium" | "high" | "unknown";
export type CaffeineTolerance = "none" | "low" | "medium" | "high" | "unknown";

export interface DrinkPreference {
  alcoholPreference: AlcoholPreference;
  favoriteAlcoholTypes: string[];
  favoriteNonAlcoholicTypes: string[];
  sugarLevel: SugarLevel;
  caffeineTolerance: CaffeineTolerance;
}

export interface BudgetPerNight {
  currency: string;
  min: number | null;
  max: number | null;
}

export type HotelClass = "hostel" | "budget" | "3_star" | "4_star" | "5_star" | "unknown";
export type LocationPreference = "city_center" | "suburbs" | "near_airport" | "scenic" | "unknown";
export type RoomType = "single" | "double" | "dorm" | "suite" | "unknown";

export interface HotelPreference {
  budgetPerNight: BudgetPerNight;
  hotelClass: HotelClass;
  locationPreference: LocationPreference;
  roomType: RoomType;
  amenitiesPriority: string[];
}

export type CoffeeConsumerType = "none" | "occasional" | "daily" | "heavy" | "unknown";
export type MilkPreference = "dairy" | "oat" | "soy" | "almond" | "none" | "unknown";
export type SweetnessLevel = "no_sugar" | "low" | "medium" | "high" | "unknown";
export type CafeAmbiencePreference = "quiet_work" | "casual" | "social_loud" | "no_preference";

export interface CoffeePreference {
  coffeeConsumerType: CoffeeConsumerType;
  coffeeStyle: string[];
  milkPreference: MilkPreference;
  sweetnessLevel: SweetnessLevel;
  cafeAmbiencePreference: CafeAmbiencePreference;
}

export type FashionStyle = "streetwear" | "minimal" | "formal" | "sporty" | "mixed" | "unknown";
export type TechEcosystem = "apple" | "android" | "windows" | "mixed" | "unknown";
export type PriceSensitivity =
  | "very_price_sensitive"
  | "value_for_money"
  | "mid_range"
  | "premium"
  | "unknown";

export interface BrandPreference {
  fashionStyle: FashionStyle;
  techEcosystem: TechEcosystem;
  shoppingChannels: string[];
  priceSensitivity: PriceSensitivity;
  brandValues: string[];
}

export interface UserPreferenceProfile {
  food: FoodPreference;
  drink: DrinkPreference;
  hotel: HotelPreference;
  coffee: CoffeePreference;
  brand: BrandPreference;
  lastEnrichedAt: string;
}

export interface PreferenceSeedInput {
  name: string;
  email: string;
  age: number;
  phone_country_code: string;
  phone_number: string;
  organisation: string | null;
}

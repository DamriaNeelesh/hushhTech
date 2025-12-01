import resources from "../../resources/resources";
import { PreferenceSeedInput, UserPreferenceProfile } from "../../types/preferences";

export interface UserPreferencesRecord {
  preferences: UserPreferenceProfile;
  user_seed: PreferenceSeedInput | null;
}

export default async function fetchPreferences(
  userId: string
): Promise<UserPreferenceProfile | null> {
  const record = await fetchPreferencesWithSeed(userId);
  return record?.preferences || null;
}

export async function fetchPreferencesWithSeed(
  userId: string
): Promise<UserPreferencesRecord | null> {
  const supabase = resources.config.supabaseClient;
  if (!supabase) {
    console.error("Supabase client is not initialized");
    return null;
  }

  const { data, error } = await supabase
    .from("members")
    .select(
      "profile, name, email, age, phone_country_code, phone_number, organisation"
    )
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch preferences:", error);
    return null;
  }

  if (!data?.profile) return null;

  const preferences = data.profile as UserPreferenceProfile;
  const user_seed: PreferenceSeedInput = {
    name: (data.name as string) || "",
    email: (data.email as string) || "",
    age: (data.age as number) || 0,
    phone_country_code: (data.phone_country_code as string) || "",
    phone_number: (data.phone_number as string) || "",
    organisation: (data.organisation as string) || null,
  };

  return {
    preferences,
    user_seed,
  };
}

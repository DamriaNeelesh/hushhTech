import resources from "../../resources/resources";
import { PreferenceSeedInput, UserPreferenceProfile } from "../../types/preferences";

export interface SavePreferencesResult {
  success: boolean;
  error?: string;
}

export default async function savePreferencesToSupabase(
  userId: string,
  preferences: UserPreferenceProfile,
  seed?: PreferenceSeedInput
): Promise<SavePreferencesResult> {
  if (!userId) {
    return { success: false, error: "Missing user id for Supabase upsert" };
  }

  const supabase = resources.config.supabaseClient;
  if (!supabase) {
    return { success: false, error: "Supabase client is not initialized" };
  }

  const { error } = await supabase
    .from("members")
    .upsert(
      {
        id: userId,
        name: seed?.name || null,
        email: seed?.email || null,
        age: seed?.age || null,
        phone_country_code: seed?.phone_country_code || null,
        phone_number: seed?.phone_number || null,
        organisation: seed?.organisation || null,
        profile: preferences,
        profile_source: "ai_seed",
        updated_at: new Date().toISOString(),
      },
      // { onConflict: "id" }
    );

  if (error) {
    console.error("Failed to save preferences to Supabase:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

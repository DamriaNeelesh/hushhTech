import resources from "../../resources/resources";
import { UserPreferenceProfile } from "../../types/preferences";

export interface SavePreferencesResult {
  success: boolean;
  error?: string;
}

export default async function savePreferencesToSupabase(
  userId: string,
  preferences: UserPreferenceProfile
): Promise<SavePreferencesResult> {
  const supabase = resources.config.supabaseClient;
  if (!supabase) {
    return { success: false, error: "Supabase client is not initialized" };
  }

  const { error } = await supabase
    .from("user_preferences")
    .upsert(
      {
        user_id: userId,
        preferences,
        last_enriched_at: preferences.lastEnrichedAt,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

  if (error) {
    console.error("Failed to save preferences to Supabase:", error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

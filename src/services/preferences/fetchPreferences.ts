import resources from "../../resources/resources";
import { UserPreferenceProfile } from "../../types/preferences";

export default async function fetchPreferences(
  userId: string
): Promise<UserPreferenceProfile | null> {
  const supabase = resources.config.supabaseClient;
  if (!supabase) {
    console.error("Supabase client is not initialized");
    return null;
  }

  const { data, error } = await supabase
    .from("user_preferences")
    .select("preferences")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch preferences:", error);
    return null;
  }

  return (data?.preferences as UserPreferenceProfile) || null;
}

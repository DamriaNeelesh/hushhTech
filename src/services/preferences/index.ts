import enrichPreferences from "./enrichPreferences";
import fetchPreferences, { fetchPreferencesWithSeed } from "./fetchPreferences";
import savePreferencesToSupabase from "./savePreferences";

const preferencesService = {
  enrichPreferences,
  fetchPreferences,
  fetchPreferencesWithSeed,
  savePreferencesToSupabase,
};

export default preferencesService;
export { enrichPreferences, fetchPreferences, fetchPreferencesWithSeed, savePreferencesToSupabase };

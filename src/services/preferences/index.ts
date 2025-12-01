import enrichPreferences from "./enrichPreferences";
import fetchPreferences from "./fetchPreferences";
import savePreferencesToSupabase from "./savePreferences";

const preferencesService = {
  enrichPreferences,
  fetchPreferences,
  savePreferencesToSupabase,
};

export default preferencesService;
export { enrichPreferences, fetchPreferences, savePreferencesToSupabase };

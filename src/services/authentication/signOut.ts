import resources from "../../resources/resources";

export default async function signOut() {
  if (resources.config.supabaseClient) {
    await resources.config.supabaseClient.auth.signOut();
  }
}

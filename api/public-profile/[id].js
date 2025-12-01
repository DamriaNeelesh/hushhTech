import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  if (!id) return res.status(400).json({ error: "Missing id" });

  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SERVICE_KEY ||
    process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    return res.status(500).json({ error: "Server not configured with Supabase service key/URL" });
  }

  const supabase = createClient(url, serviceKey);

  const { data, error } = await supabase
    .from("members")
    .select("id, name, email, age, phone_country_code, phone_number, organisation, profile")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("public-profile fetch error:", error);
    return res.status(500).json({ error: error.message });
  }

  if (!data) {
    return res.status(404).json({ error: "Not found" });
  }

  return res.status(200).json({ user: data });
}

import { createClient } from "@supabase/supabase-js";

const env = typeof import.meta !== "undefined" ? import.meta.env : {};
const redirect_urls = {
  development: "http://localhost:5173/",
  staging: "https://hushhTech.com",
  production: "https://hushhTech.com",
};

const config = {
  SUPABASE_URL: env?.VITE_SUPABASE_URL || "https://ibsisfnjxeowvdtvgzff.supabase.co",
  SUPABASE_ANON_KEY:
    env?.VITE_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlic2lzZm5qeGVvd3ZkdHZnemZmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1NTk1NzgsImV4cCI6MjA4MDEzNTU3OH0.K16sO1R9L2WZGPueDP0mArs2eDYZc-TnIk2LApDw_fs",

  guestModeAccessToken:
    "P2H8RNXPvIiPoeM0iJEDjJ2Skk37h5pScMQF5oMRUXm3dKoUC2wxrWImx5ccA9VOrOoeaLcMQqn57vYDPucTkYnkkH6icUQy09vtd5eIrAIXhBtmUfAmPI3thD2OoUeF",
  redirect_url:
    env?.VITE_SUPABASE_REDIRECT_URL ||
    (typeof window !== "undefined" ? `${window.location.origin}/auth/callback` : "https://www.hushhtech.com/auth/callback"),
};

function createSupabaseClient() {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY);
  return supabase;
}

config.supabaseClient = createSupabaseClient();

export default config;

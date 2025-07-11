import { createClient, SupabaseClient } from "@supabase/supabase-js";

interface Config {
  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
  redirect_url: string;
  supabaseClient?: SupabaseClient;
}

const config: Config = {
  // SUPABASE_URL: "https://rpmzykoxqnbozgdoqbpc.supabase.co",
  SUPABASE_URL:"https://gsqmwxqgqrgzhlhmbscg.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzcW13eHFncXJnemhsaG1ic2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NTk5ODYsImV4cCI6MjA1NDMzNTk4Nn0.a30I6aLvNNIS6coxJbgTeGBUmKR0NvTkZUDG5uyloFY",
  // SUPABASE_ANON_KEY:
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJwbXp5a294cW5ib3pnZG9xYnBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE5Mjc5NzEsImV4cCI6MjAxNzUwMzk3MX0.3GwG8YQKwZSWfGgTBEEA47YZAZ-Nr4HiirYPWiZtpZ0",
  redirect_url: "https://www.hushhtech.com/",
  
  // supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzcW13eHFncXJnemhsaG1ic2NnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg3NTk5ODYsImV4cCI6MjA1NDMzNTk4Nn0.a30I6aLvNNIS6coxJbgTeGBUmKR0NvTkZUDG5uyloFY",
};

function createSupabaseClient() {
  const supabase = createClient(config.SUPABASE_URL, config.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  });
  return supabase;
}

config.supabaseClient = createSupabaseClient();

export default config;

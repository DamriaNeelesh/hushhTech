/**
 * Client service to call the Supabase Edge Function for investor profile generation
 */

import { InvestorProfileInput, DerivedContext, InvestorProfile } from "../../types/investorProfile";
import { enrichContext } from "./enrichContext";
import resources from "../../resources/resources";

export interface GenerateProfileResponse {
  success: boolean;
  profile: InvestorProfile;
  error?: string;
}

/**
 * Calls the Supabase Edge Function to generate investor profile using OpenAI GPT-4o
 */
export async function generateInvestorProfile(
  input: InvestorProfileInput
): Promise<GenerateProfileResponse> {
  try {
    const supabase = resources.config.supabaseClient;
    
    if (!supabase) {
      throw new Error("Supabase client not initialized");
    }

    // 1. Get authenticated user session for Authorization header
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      throw new Error(`Auth session error: ${sessionError.message}`);
    }
    
    if (!session?.access_token) {
      throw new Error("User not logged in. Please sign in to generate investor profile.");
    }

    // 2. Enrich the context from the input
    const context = await enrichContext(input);

    // 3. Determine Edge Function URL (dev vs production)
    const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL;
    const isDev = (import.meta as any).env.DEV;
    
    const edgeFunctionUrl = isDev
      ? 'http://localhost:54321/functions/v1/generate-investor-profile'
      : `${supabaseUrl}/functions/v1/generate-investor-profile`;

    // 4. Call the Supabase Edge Function
    const response = await fetch(edgeFunctionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        input,
        context,
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMessage = data.error || `Edge function failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    if (!data.success || !data.profile) {
      throw new Error('Invalid response from Edge Function');
    }

    return {
      success: true,
      profile: data.profile,
    };
  } catch (error) {
    console.error('Error generating investor profile:', error);
    return {
      success: false,
      profile: {} as InvestorProfile,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

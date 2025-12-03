/**
 * Client service to call the investor profile API
 */

import { InvestorProfileInput, DerivedContext, InvestorProfile } from "../../types/investorProfile";
import { enrichContext } from "./enrichContext";

export interface GenerateProfileResponse {
  success: boolean;
  profile: InvestorProfile;
  error?: string;
}

/**
 * Calls the serverless function to generate investor profile using OpenAI
 */
export async function generateInvestorProfile(
  input: InvestorProfileInput
): Promise<GenerateProfileResponse> {
  try {
    // First, enrich the context from the input
    const context = await enrichContext(input);

    // Call the API (Vite env variables)
    const apiUrl = (import.meta as any).env?.VITE_INVESTOR_PROFILE_API_URL || '/api/generate-investor-profile';
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input,
        context,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to generate investor profile');
    }

    const data = await response.json();

    if (!data.success || !data.profile) {
      throw new Error('Invalid response from API');
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

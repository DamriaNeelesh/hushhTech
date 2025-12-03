import resources from "../../resources/resources";
import { 
  InvestorProfileInput, 
  InvestorProfileRecord,
  InvestorProfile,
  DerivedContext 
} from "../../types/investorProfile";
import { enrichContext } from "./enrichContext";
import { generateInvestorProfile } from "./generateProfile";

/**
 * Create a new investor profile for the authenticated user
 * 
 * Flow:
 * 1. Get authenticated user
 * 2. Enrich context from input (phone → country/currency, email → type, etc.)
 * 3. Generate AI-powered investor profile (12 fields with confidence scores)
 * 4. Save to Supabase investor_profiles table
 * 5. Return complete profile record
 */
export async function createInvestorProfile(
  input: InvestorProfileInput
): Promise<InvestorProfileRecord> {
  const supabase = resources.config.supabaseClient;
  
  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }
  
  // 1. Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error("User must be authenticated to create investor profile");
  }
  
  // 2. Check if profile already exists
  const { data: existingProfile } = await supabase
    .from("investor_profiles")
    .select("id")
    .eq("user_id", user.id)
    .single();
  
  if (existingProfile) {
    throw new Error("Investor profile already exists for this user. Use updateInvestorProfile instead.");
  }
  
  // 3. Enrich context from input
  const derivedContext = await enrichContext(input);
  
  // 4. Generate AI-powered investor profile
  const investorProfile = await generateInvestorProfile(input, derivedContext);
  
  // 5. Save to database
  const { data: profileRecord, error: insertError } = await supabase
    .from("investor_profiles")
    .insert({
      user_id: user.id,
      name: input.name,
      email: input.email,
      age: input.age,
      phone_country_code: input.phone_country_code,
      phone_number: input.phone_number,
      organisation: input.organisation || null,
      derived_context: derivedContext,
      investor_profile: investorProfile,
      is_ai_prefilled: true,
      user_confirmed: false,
    })
    .select()
    .single();
  
  if (insertError) {
    throw new Error(`Failed to save investor profile: ${insertError.message}`);
  }
  
  return profileRecord as InvestorProfileRecord;
}

/**
 * Update an existing investor profile
 * Allows user to edit AI-generated fields or any other data
 */
export async function updateInvestorProfile(
  updates: {
    name?: string;
    email?: string;
    age?: number;
    phone_country_code?: string;
    phone_number?: string;
    organisation?: string;
    investor_profile?: Partial<InvestorProfile>;
    user_confirmed?: boolean;
  }
): Promise<InvestorProfileRecord> {
  const supabase = resources.config.supabaseClient;
  
  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }
  
  // 1. Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error("User must be authenticated to update investor profile");
  }
  
  // 2. Fetch existing profile
  const { data: existingProfile, error: fetchError } = await supabase
    .from("investor_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();
  
  if (fetchError || !existingProfile) {
    throw new Error("Investor profile not found. Please create one first.");
  }
  
  // 3. Build update object
  const updateData: any = {
    updated_at: new Date().toISOString(),
  };
  
  if (updates.name !== undefined) updateData.name = updates.name;
  if (updates.email !== undefined) updateData.email = updates.email;
  if (updates.age !== undefined) updateData.age = updates.age;
  if (updates.phone_country_code !== undefined) updateData.phone_country_code = updates.phone_country_code;
  if (updates.phone_number !== undefined) updateData.phone_number = updates.phone_number;
  if (updates.organisation !== undefined) updateData.organisation = updates.organisation;
  
  // 4. Handle investor_profile updates (merge with existing)
  if (updates.investor_profile) {
    updateData.investor_profile = {
      ...existingProfile.investor_profile,
      ...updates.investor_profile,
    };
  }
  
  // 5. Handle user confirmation
  if (updates.user_confirmed === true && !existingProfile.user_confirmed) {
    updateData.user_confirmed = true;
    updateData.confirmed_at = new Date().toISOString();
  }
  
  // 6. Re-enrich context if basic info changed
  if (updates.phone_country_code || updates.phone_number || updates.email || updates.age || updates.organisation) {
    const inputForEnrichment: InvestorProfileInput = {
      name: updates.name || existingProfile.name,
      email: updates.email || existingProfile.email,
      age: updates.age || existingProfile.age,
      phone_country_code: updates.phone_country_code || existingProfile.phone_country_code,
      phone_number: updates.phone_number || existingProfile.phone_number,
      organisation: updates.organisation !== undefined ? updates.organisation : existingProfile.organisation,
    };
    
    const newDerivedContext = await enrichContext(inputForEnrichment);
    updateData.derived_context = newDerivedContext;
  }
  
  // 7. Save updates
  const { data: updatedProfile, error: updateError } = await supabase
    .from("investor_profiles")
    .update(updateData)
    .eq("user_id", user.id)
    .select()
    .single();
  
  if (updateError) {
    throw new Error(`Failed to update investor profile: ${updateError.message}`);
  }
  
  return updatedProfile as InvestorProfileRecord;
}

/**
 * Fetch the investor profile for the authenticated user
 */
export async function fetchInvestorProfile(): Promise<InvestorProfileRecord | null> {
  const supabase = resources.config.supabaseClient;
  
  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }
  
  // 1. Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error("User must be authenticated to fetch investor profile");
  }
  
  // 2. Fetch profile
  const { data: profile, error: fetchError } = await supabase
    .from("investor_profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();
  
  if (fetchError) {
    // Profile doesn't exist yet
    if (fetchError.code === "PGRST116") {
      return null;
    }
    throw new Error(`Failed to fetch investor profile: ${fetchError.message}`);
  }
  
  return profile as InvestorProfileRecord;
}

/**
 * Delete the investor profile for the authenticated user
 */
export async function deleteInvestorProfile(): Promise<void> {
  const supabase = resources.config.supabaseClient;
  
  if (!supabase) {
    throw new Error("Supabase client not initialized");
  }
  
  // 1. Get authenticated user
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error("User must be authenticated to delete investor profile");
  }
  
  // 2. Delete profile
  const { error: deleteError } = await supabase
    .from("investor_profiles")
    .delete()
    .eq("user_id", user.id);
  
  if (deleteError) {
    throw new Error(`Failed to delete investor profile: ${deleteError.message}`);
  }
}

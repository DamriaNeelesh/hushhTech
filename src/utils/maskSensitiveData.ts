/**
 * Utility functions to mask sensitive data for public profile viewing
 */

export function maskEmail(email: string): string {
  if (!email || !email.includes('@')) return '***@***.com';
  
  const [username, domain] = email.split('@');
  
  if (username.length <= 2) {
    return `${username[0]}***@${domain}`;
  }
  
  const maskedUsername = username[0] + '***' + username.slice(-1);
  return `${maskedUsername}@${domain}`;
}

export function maskPhone(phoneNumber: string, countryCode: string): string {
  if (!phoneNumber) return '+X-***-****';
  
  // Remove all non-digit characters
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  if (digitsOnly.length < 4) {
    return `${countryCode}-***`;
  }
  
  // Show last 4 digits: +1-***-4567
  const lastFour = digitsOnly.slice(-4);
  return `${countryCode}-***-${lastFour}`;
}

export interface MaskedProfileData {
  name: string;
  email: string;
  age: number;
  phone: string;
  organisation: string | null;
  slug: string;
}

export function maskProfileData(profileData: any): MaskedProfileData {
  return {
    name: profileData.name,
    email: maskEmail(profileData.email),
    age: profileData.age,
    phone: maskPhone(profileData.phone_number, profileData.phone_country_code),
    organisation: profileData.organisation,
    slug: profileData.slug,
  };
}

/**
 * Mask onboarding data for public profile display
 * Protects sensitive information - only visible in paid tier chat
 */
export function maskOnboardingField(fieldKey: string, value: any): string {
  // Always mask legal names
  if (fieldKey === 'legal_first_name' || fieldKey === 'legal_last_name') {
    if (!value || typeof value !== 'string') return '***';
    return value.length <= 2 ? '***' : `${value[0]}***${value.slice(-1)}`;
  }
  
  // Always mask date of birth
  if (fieldKey === 'date_of_birth') {
    return '**/**/****';
  }
  
  // Always mask SSN (already handled but double check)
  if (fieldKey === 'ssn_encrypted') {
    return '***-**-****';
  }
  
  // Mask full address
  if (fieldKey === 'address_line_1') {
    return '*****';
  }
  
  // Mask ZIP code (show last 2 digits)
  if (fieldKey === 'zip_code') {
    if (!value || typeof value !== 'string') return '***';
    return value.length > 2 ? `***${value.slice(-2)}` : '***';
  }
  
  // Mask investment amounts (show range instead)
  if (fieldKey === 'initial_investment_amount' || fieldKey === 'recurring_amount') {
    const amount = Number(value);
    if (isNaN(amount)) return '$***,***';
    
    // Show ranges instead of exact amounts
    if (amount < 10000) return '$1K - $10K';
    if (amount < 50000) return '$10K - $50K';
    if (amount < 100000) return '$50K - $100K';
    if (amount < 500000) return '$100K - $500K';
    if (amount < 1000000) return '$500K - $1M';
    return '$1M+';
  }
  
  // Don't mask these fields (general info)
  if (['account_type', 'selected_fund', 'referral_source', 'citizenship_country', 
       'residence_country', 'account_structure', 'recurring_investment_enabled',
       'recurring_frequency', 'city', 'state', 'address_country'].includes(fieldKey)) {
    return value;
  }
  
  // Default: show value as is
  return value;
}

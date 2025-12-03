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

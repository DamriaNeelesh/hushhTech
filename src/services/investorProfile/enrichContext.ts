import { DerivedContext, InvestorProfileInput } from "../../types/investorProfile";
import { parsePhoneNumber } from "libphonenumber-js";

// Static country → currency mapping
const COUNTRY_CURRENCY_MAP: Record<string, string> = {
  US: "USD", CA: "CAD", GB: "GBP", IN: "INR", AE: "AED",
  SG: "SGD", AU: "AUD", NZ: "NZD", JP: "JPY", CN: "CNY",
  FR: "EUR", DE: "EUR", IT: "EUR", ES: "EUR", NL: "EUR",
  CH: "CHF", SE: "SEK", NO: "NOK", DK: "DKK", BR: "BRL",
  MX: "MXN", AR: "ARS", ZA: "ZAR", KR: "KRW", TW: "TWD",
  HK: "HKD", MY: "MYR", TH: "THB", PH: "PHP", ID: "IDR",
};

// Life stage buckets based on age
function getLifeStage(age: number): string {
  if (age < 25) return "early_career";
  if (age < 35) return "young_professional";
  if (age < 50) return "mid_career";
  if (age < 60) return "late_career";
  return "retired_or_near_retirement";
}

// Email domain analysis
function analyzeEmail(email: string): {
  type: "personal" | "corporate";
  domain?: string;
} {
  const domain = email.split("@")[1]?.toLowerCase();
  
  if (!domain) {
    return { type: "personal" };
  }
  
  const personalDomains = [
    "gmail.com", "yahoo.com", "outlook.com", "hotmail.com",
    "icloud.com", "protonmail.com", "mail.com", "aol.com",
    "live.com", "msn.com", "yandex.com", "zoho.com"
  ];
  
  if (personalDomains.includes(domain)) {
    return { type: "personal" };
  }
  
  return { type: "corporate", domain };
}

// Infer company info from known domains (simple heuristic)
function inferCompanyInfo(domain?: string): {
  industry?: string;
  size_bucket?: string;
} {
  if (!domain) return {};
  
  const domainLower = domain.toLowerCase();
  
  // Known tech companies
  const bigTechDomains = ["google.com", "meta.com", "facebook.com", "amazon.com", "apple.com", "microsoft.com", "netflix.com"];
  const fintechDomains = ["stripe.com", "paypal.com", "square.com", "coinbase.com", "robinhood.com", "plaid.com"];
  const consultingDomains = ["mckinsey.com", "bcg.com", "bain.com", "deloitte.com", "ey.com", "pwc.com", "kpmg.com"];
  
  if (bigTechDomains.some(d => domainLower.includes(d))) {
    return { industry: "bigtech", size_bucket: "enterprise_250_plus" };
  }
  
  if (fintechDomains.some(d => domainLower.includes(d))) {
    return { industry: "fintech_payments", size_bucket: "enterprise_250_plus" };
  }
  
  if (consultingDomains.some(d => domainLower.includes(d))) {
    return { industry: "consulting", size_bucket: "enterprise_250_plus" };
  }
  
  // Default for corporate emails
  return { industry: "corporate", size_bucket: "unknown" };
}

// Infer org type from organisation name
function inferOrgType(organisation?: string, emailType?: "personal" | "corporate"): string | undefined {
  if (!organisation) {
    return emailType === "corporate" ? "corporate" : undefined;
  }
  
  const orgLower = organisation.toLowerCase();
  
  if (orgLower.includes("university") || orgLower.includes("college") || orgLower.includes("student")) {
    return "student";
  }
  
  if (orgLower.includes("startup")) {
    return "startup_employee";
  }
  
  const bigTechKeywords = ["google", "meta", "facebook", "amazon", "apple", "microsoft", "stripe", "paypal"];
  if (bigTechKeywords.some(keyword => orgLower.includes(keyword))) {
    return "bigtech_finance";
  }
  
  if (orgLower.includes("government") || orgLower.includes("public sector")) {
    return "public_sector";
  }
  
  if (orgLower.includes("founder") || orgLower.includes("ceo") || orgLower.includes("co-founder")) {
    return "founder";
  }
  
  return "corporate";
}

/**
 * Enriches user input with derived context
 * - Phone number → Country, Region, Currency
 * - Email → Personal/Corporate, Company domain
 * - Age → Life stage bucket
 * - Organisation → Org type inference
 */
export async function enrichContext(
  input: InvestorProfileInput
): Promise<DerivedContext> {
  // Default values
  let country = "US";
  let region = "NA";
  let currency = "USD";
  
  // Parse phone number to get country
  try {
    const fullPhone = input.phone_country_code.startsWith("+")
      ? `${input.phone_country_code}${input.phone_number}`
      : `+${input.phone_country_code}${input.phone_number}`;
    
    const phoneNumber = parsePhoneNumber(fullPhone);
    
    if (phoneNumber && phoneNumber.country) {
      country = phoneNumber.country;
      currency = COUNTRY_CURRENCY_MAP[country] || "USD";
      
      // Map country to region
      if (["US", "CA"].includes(country)) {
        region = "NA";
      } else if (["GB", "FR", "DE", "IT", "ES", "NL", "CH", "SE", "NO", "DK"].includes(country)) {
        region = "EU";
      } else if (["IN", "CN", "JP", "SG", "AU", "NZ", "KR", "TW", "HK", "MY", "TH", "PH", "ID"].includes(country)) {
        region = "APAC";
      } else if (["AE", "SA"].includes(country)) {
        region = "MENA";
      } else if (["BR", "MX", "AR"].includes(country)) {
        region = "LATAM";
      } else if (["ZA"].includes(country)) {
        region = "AFRICA";
      } else {
        region = "OTHER";
      }
    }
  } catch (error) {
    console.warn("Phone parsing failed, using defaults:", error);
  }
  
  // Analyze email
  const emailInfo = analyzeEmail(input.email);
  
  // Get company info if corporate email
  const companyInfo = emailInfo.type === "corporate" 
    ? inferCompanyInfo(emailInfo.domain) 
    : {};
  
  // Life stage from age
  const life_stage = getLifeStage(input.age);
  
  // Org type inference
  const org_type = inferOrgType(input.organisation, emailInfo.type);
  
  // Build complete derived context
  const context: DerivedContext = {
    country,
    region,
    currency,
    email_type: emailInfo.type,
    life_stage,
  };
  
  // Add optional fields if available
  if (emailInfo.domain) {
    context.company_domain = emailInfo.domain;
  }
  
  if (companyInfo.industry) {
    context.company_industry = companyInfo.industry;
  }
  
  if (companyInfo.size_bucket) {
    context.company_size_bucket = companyInfo.size_bucket;
  }
  
  if (org_type) {
    context.org_type = org_type;
  }
  
  return context;
}

const HUSHH_WALLET_ENDPOINT = "https://hushh-wallet.vercel.app/api/passes/universal/create";
const HUSHH_GOOGLE_WALLET_ENDPOINT = "https://hushh-wallet.vercel.app/api/passes/google/create";

export interface WalletPassInput {
  name: string;
  email?: string | null;
  organisation?: string | null;
  slug?: string | null;
  userId?: string | null;
  investmentAmount?: number | null;
}

interface WalletPassResult {
  blob: Blob;
  filename: string;
}

interface GoogleWalletResult {
  saveUrl?: string;
  blob?: Blob;
  filename?: string;
}

const sanitizeForFilename = (value: string) => {
  const safe = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return safe || "hushh-gold-card";
};

const getDisplayValue = (value?: string | null, fallback = "Not provided") =>
  value && value.trim().length > 0 ? value : fallback;

const getInvestmentClass = (amount?: number | null) => {
  if (typeof amount !== "number" || Number.isNaN(amount)) return "Class C";
  if (amount >= 5_000_000) return "Class A";
  if (amount >= 2_000_000) return "Class B";
  return "Class C";
};

const buildGoldPassPayload = (input: WalletPassInput) => {
  const profileUrl = input.slug
    ? `https://hushhtech.com/investor/${input.slug}`
    : "https://hushhtech.com";

  const membershipId =
    input.slug ||
    input.userId ||
    (input.email ? input.email.split("@")[0] : "hushh-investor");

  const investorName = getDisplayValue(input.name, "Hushh Investor");
  const investmentClass = getInvestmentClass(input.investmentAmount);

  return {
    passType: "storeCard",
    description: "Hushh Gold Investor Pass",
    organizationName: "Hushh Technologies",
    logoText: "hushh Gold Pass",
    backgroundColor: "rgb(212, 175, 55)", // gold
    foregroundColor: "rgb(12, 12, 12)", // black text
    labelColor: "rgb(32, 32, 32)",
    headerFields: [
      { key: "status", label: "Status", value: "Gold Member", textAlignment: "PKTextAlignmentLeft" },
      { key: "org", label: "Organization", value: getDisplayValue(input.organisation, "Hushh"), textAlignment: "PKTextAlignmentLeft" },
    ],
    primaryFields: [
      { key: "investor", label: "Holder", value: investorName, textAlignment: "PKTextAlignmentLeft" },
    ],
    secondaryFields: [
      { key: "class", label: "Investor", value: `Investor - ${investmentClass}`, textAlignment: "PKTextAlignmentLeft" },
    ],
    auxiliaryFields: [
      { key: "email", label: "Email", value: getDisplayValue(input.email, "—"), textAlignment: "PKTextAlignmentLeft" },
      { key: "memberId", label: "Membership ID", value: membershipId, textAlignment: "PKTextAlignmentLeft" },
    ],
    barcode: {
      message: profileUrl,
      format: "PKBarcodeFormatQR",
      altText: "Hushh Gold Pass QR",
    },
    webServiceURL: profileUrl,
  };
};

export async function requestHushhGoldPass(input: WalletPassInput): Promise<WalletPassResult> {
  const response = await fetch(HUSHH_WALLET_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildGoldPassPayload(input)),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(errorText || "Wallet pass generation failed");
  }

  const blob = await response.blob();
  const filename = `${sanitizeForFilename(input.name)}-hushh-gold.pkpass`;

  return { blob, filename };
}

export async function downloadHushhGoldPass(input: WalletPassInput): Promise<void> {
  const { blob, filename } = await requestHushhGoldPass(input);
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    window.URL.revokeObjectURL(url);
  }, 4000);
}

export async function requestGoogleWalletPass(input: WalletPassInput): Promise<GoogleWalletResult> {
  const response = await fetch(HUSHH_GOOGLE_WALLET_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildGoldPassPayload(input)),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(errorText || "Google Wallet pass generation failed");
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const data = await response.json();
    if (data.saveUrl) {
      return { saveUrl: data.saveUrl as string };
    }
  }

  const blob = await response.blob();
  const filename = `${sanitizeForFilename(input.name)}-hushh-gold-google.pkpass`;
  return { blob, filename };
}

export async function launchGoogleWalletPass(input: WalletPassInput): Promise<void> {
  const result = await requestGoogleWalletPass(input);

  if (result.saveUrl) {
    window.location.href = result.saveUrl;
    return;
  }

  if (result.blob && result.filename) {
    const url = window.URL.createObjectURL(result.blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = result.filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => window.URL.revokeObjectURL(url), 4000);
  }
}

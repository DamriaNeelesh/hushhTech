const HUSHH_WALLET_ENDPOINT = "https://hushh-wallet.vercel.app/api/passes/universal/create";

export interface WalletPassInput {
  name: string;
  email?: string | null;
  organisation?: string | null;
  slug?: string | null;
  userId?: string | null;
}

interface WalletPassResult {
  blob: Blob;
  filename: string;
}

const sanitizeForFilename = (value: string) => {
  const safe = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return safe || "hushh-gold-card";
};

const getDisplayValue = (value?: string | null, fallback = "Not provided") =>
  value && value.trim().length > 0 ? value : fallback;

const buildGoldPassPayload = (input: WalletPassInput) => {
  const profileUrl = input.slug
    ? `https://hushhtech.com/investor/${input.slug}`
    : "https://hushhtech.com";

  const membershipId =
    input.slug ||
    input.userId ||
    (input.email ? input.email.split("@")[0] : "hushh-investor");

  const investorName = getDisplayValue(input.name, "Hushh Investor");

  return {
    passType: "storeCard",
    description: "Hushh Gold Investor Card",
    organizationName: "Hushh Technologies",
    logoText: "HUSHH GOLD",
    backgroundColor: "rgb(117, 65, 10)",
    foregroundColor: "rgb(255, 248, 235)",
    labelColor: "rgb(216, 178, 111)",
    primaryFields: [
      { key: "investor", label: "Investor", value: investorName },
    ],
    secondaryFields: [
      { key: "tier", label: "Status", value: "Gold Member" },
      { key: "memberId", label: "Membership", value: membershipId },
    ],
    auxiliaryFields: [
      { key: "email", label: "Email", value: getDisplayValue(input.email, "—") },
      { key: "org", label: "Organization", value: getDisplayValue(input.organisation, "Hushh Investor") },
    ],
    barcode: {
      message: profileUrl,
      format: "PKBarcodeFormatQR",
      altText: "Hushh Investor Profile",
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

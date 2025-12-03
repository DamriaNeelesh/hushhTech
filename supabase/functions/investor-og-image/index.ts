import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.46.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const slug = url.searchParams.get("slug");

    if (!slug) {
      return new Response("Missing slug parameter", {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "text/plain" },
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch public investor profile
    const { data: profile, error } = await supabase
      .from("investor_profiles")
      .select("name, age, organisation, investor_profile, slug")
      .eq("slug", slug)
      .eq("is_public", true)
      .eq("user_confirmed", true)
      .single();

    if (error || !profile) {
      return new Response("Profile not found", {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "text/plain" },
      });
    }

    // Generate SVG OG image
    const svgImage = generateOGImage(profile);

    return new Response(svgImage, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("Error generating OG image:", error);
    return new Response("Internal server error", {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "text/plain" },
    });
  }
});

function generateOGImage(profile: any): string {
  const name = profile.name || "Anonymous";
  const age = profile.age || "N/A";
  const organisation = profile.organisation || "";
  const investorProfile = profile.investor_profile || {};

  // Get key investment attributes
  const riskTolerance = investorProfile.risk_tolerance?.value || "moderate";
  const primaryGoal = investorProfile.primary_goal?.value || "growth";
  const experienceLevel = investorProfile.experience_level?.value || "intermediate";

  // Format display values
  const riskLabel = riskTolerance.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
  const goalLabel = primaryGoal.replace(/_/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase());
  const expLabel = experienceLevel.charAt(0).toUpperCase() + experienceLevel.slice(1);

  return `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="card" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.15" />
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0.05" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- Grid pattern overlay -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" stroke-width="1"/>
  </pattern>
  <rect width="1200" height="630" fill="url(#grid)"/>
  
  <!-- Content card -->
  <rect x="80" y="80" width="1040" height="470" rx="20" fill="url(#card)" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  
  <!-- Hushh branding -->
  <text x="120" y="140" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="#ffffff">
    Hushh
  </text>
  <text x="120" y="175" font-family="Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.8)">
    Verified Investor Profile
  </text>
  
  <!-- Profile name -->
  <text x="120" y="260" font-family="Arial, sans-serif" font-size="56" font-weight="bold" fill="#ffffff">
    ${escapeXml(name)}
  </text>
  
  <!-- Profile details -->
  <text x="120" y="310" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.9)">
    Age ${age}${organisation ? ` • ${escapeXml(organisation)}` : ""}
  </text>
  
  <!-- Investment attributes -->
  <g transform="translate(120, 360)">
    <!-- Risk Tolerance Badge -->
    <rect x="0" y="0" width="180" height="50" rx="25" fill="rgba(255,255,255,0.2)"/>
    <text x="90" y="32" font-family="Arial, sans-serif" font-size="18" fill="#ffffff" text-anchor="middle">
      🎯 ${escapeXml(riskLabel)}
    </text>
    
    <!-- Primary Goal Badge -->
    <rect x="200" y="0" width="220" height="50" rx="25" fill="rgba(255,255,255,0.2)"/>
    <text x="310" y="32" font-family="Arial, sans-serif" font-size="18" fill="#ffffff" text-anchor="middle">
      📈 ${escapeXml(goalLabel)}
    </text>
    
    <!-- Experience Badge -->
    <rect x="440" y="0" width="180" height="50" rx="25" fill="rgba(255,255,255,0.2)"/>
    <text x="530" y="32" font-family="Arial, sans-serif" font-size="18" fill="#ffffff" text-anchor="middle">
      ⭐ ${escapeXml(expLabel)}
    </text>
  </g>
  
  <!-- Footer -->
  <text x="120" y="510" font-family="Arial, sans-serif" font-size="20" fill="rgba(255,255,255,0.7)">
    hushhtech.com/investor/${escapeXml(profile.slug || "")}
  </text>
</svg>
  `.trim();
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

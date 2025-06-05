import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://hushhTech.com";
const staticPages = ["/", "/about", "/contact", "/blog", "/privacy-policy", "/terms-of-service"];

// Additional community routes based on observed URL structure in posts.ts
const communityRoutes = [
  // Market updates
  "/community/daily-market-update/10-apr-2025",
  "/community/daily-market-update/11-apr-2025",
  "/community/daily-market-update/15-apr-2025",
  "/community/daily-market-update/16-apr-2025",
  "/community/daily-market-update/17-apr-2025",
  "/community/daily-market-update/14-feb-2025",
  "/community/market/daily-market-update",
  "/community/market/updates",
  "/community/market/alpha-aloha-fund-update",
  "/community/market/weekly-report",
  "/community/market/feb-5-market-update",
  "/community/market/latest-fund-update-11th-feb",
  "/community/market/updates-28-feb-2025",
  "/community/market/market-updates-1st-april",
  "/community/market/market-updates-4th-april",
  "/community/market/market-update-19-feb",
  "/community/market/market-update-20-feb",
  "/community/market/daily-update-30-may",
  
  // Funds
  "/community/funds/hushh-technology-fund",
  "/community/funds/renaissance-tech",
  "/community/funds/fund-ahushh",
  "/community/funds/fee-schedule",
  "/community/funds/alpha-aloha-fund-update-feb6",
  "/community/funds/hushh-alpha-fund-nav-update",
  
  // General
  "/community/general/manifesto",
  "/community/general/ai-infrastructure-thesis",
  "/community/general/fund-afaq",
  "/community/general/hushh-fund-faq",
  "/community/general/hushh-employee-champion-handbook",
  "/community/general/hushhtech-prospectus",
  "/community/general/compensation-report",
  
  // Product updates
  "/community/product/product-updates",
  "/community/product/hushh-wallet",
  "/community/product/renaissance-tech",
  
  // Investor relations
  "/community/investor-relations/investor-faq/charlie-munger-edition",
  "/community/investors-faq/shared-class-explanation",
  "/community/investors-faq/withdrawal-schedule",
  "/community/investors-faq/investor-suitability-questionnarie",
  "/community/investors-news/market-wrap",
  "/community/investment-strategies/sell-the-wall",
  "/community/investment-strategy/hushh-alpha-fund-growth-plan",
  "/community/investment-strategy/investment-framework-renting-maximum-income",
  "/community/news/investment-perspective"
];

const generateSitemap = () => {
  console.log("🔹 Generating sitemap...");

  // Generate URLs for static pages
  const staticUrls = staticPages.map((page) => {
    return `
      <url>
        <loc>${SITE_URL}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>`;
  });

  // Generate URLs for community routes with fixed URLs
  const communityUrls = communityRoutes.map((route) => {
    return `
      <url>
        <loc>${SITE_URL}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`;
  });

  // Additionally, scan directories for any posts that might not be included
  const postUrls = [];
  let postCount = 0;
  
  // Directories containing community posts
  const publicPostDirectories = [
    path.join(__dirname, "../src/content/posts/market"),
    path.join(__dirname, "../src/content/posts/funds"),
    path.join(__dirname, "../src/content/posts/general"),
    path.join(__dirname, "../src/content/posts/investors-faq"),
    path.join(__dirname, "../src/content/posts/product")
  ];
  
  // Process each public directory
  publicPostDirectories.forEach(directory => {
    if (fs.existsSync(directory)) {
      // Get the category name from the directory path
      const category = path.basename(directory);
      
      // Get all the files in the directory
      const files = fs.readdirSync(directory);
      
      files.forEach(file => {
        // Skip if not a .tsx or .jsx file
        if (!file.endsWith('.tsx') && !file.endsWith('.jsx')) return;
        
        // Get the file name without extension to use as a slug part
        const fileName = path.basename(file, path.extname(file));
        
        // Create a slug for the post (convert to kebab-case if needed)
        const slug = fileName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        
        // Use file's modified date as lastmod
        const filePath = path.join(directory, file);
        const stats = fs.statSync(filePath);
        const lastMod = stats.mtime.toISOString();
        
        // Add URL entry for the post
        postUrls.push(`
      <url>
        <loc>${SITE_URL}/community/${category}/${slug}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>`);
        
        postCount++;
      });
    }
  });

  // Combine all URLs
  const allUrls = [...staticUrls, ...communityUrls, ...postUrls].join("\n");

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allUrls}
    </urlset>`;

  const filePath = path.join(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(filePath, sitemapContent);

  console.log(`✅ Sitemap successfully generated at ${filePath}`);
  console.log(`✅ Added ${staticUrls.length} static pages, ${communityUrls.length} community pages, and ${postCount} scanned posts`);
  console.log(`🔎 Verifying file: ${fs.existsSync(filePath) ? "✅ Exists" : "❌ Not Found"}`);
};

generateSitemap();

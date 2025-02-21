import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = "https://hushhTech.com";
const staticPages = ["/", "/about", "/contact", "/blog", "/privacy-policy", "/terms-of-service"];

const generateSitemap = () => {
  console.log("🔹 Generating sitemap...");

  const urls = staticPages.map((page) => {
    return `
      <url>
        <loc>${SITE_URL}${page}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.7</priority>
      </url>`;
  }).join("\n");

  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;

  const filePath = path.join(__dirname, "../public/sitemap.xml");
  fs.writeFileSync(filePath, sitemapContent);

  console.log(`✅ Sitemap successfully generated at ${filePath}`);
  console.log(`🔎 Verifying file: ${fs.existsSync(filePath) ? "✅ Exists" : "❌ Not Found"}`);
};

generateSitemap();

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Convert ESM __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const robotsContent = `
User-agent: *
Allow: /
Sitemap: https://hushhTech.com/sitemap.xml
`;

fs.writeFileSync(path.join(__dirname, "../public/robots.txt"), robotsContent);
console.log("✅ Robots.txt successfully generated!");

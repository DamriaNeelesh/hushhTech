const fs = require('fs');
const path = require('path');

// Old content to find (with various formatting possibilities)
const oldPatterns = [
  // Pattern 1: Exact with line breaks
  /Invest in a better alternative[\s\n\r]*Build a portfolio of private assets like real estate, private credit, and venture capital\./gi,
  
  // Pattern 2: With HTML/JSX breaks
  /Invest in a better alternative[\s]*<[^>]*>[\s]*Build a portfolio of private assets like real estate, private credit, and venture capital\./gi,
  
  // Pattern 3: Title and subtitle separately but close together
  /Invest in a better alternative/gi,
];

// For the separate title pattern, we need to check context
const oldTitle = "Invest in a better alternative";
const oldSubtitle = "Build a portfolio of private assets like real estate, private credit, and venture capital.";

// New content
const newContent = {
  title: "Investing in the Future.",
  subtitle1: "The AI-Powered Berkshire Hathaway.",
  subtitle2: "We combine AI and human expertise to build exceptional businesses for long-term value creation."
};

// Directories to scan
const directoriesToScan = [
  'src/components',
  'src/pages',
  'src/content',
  'public',
];

// File extensions to process
const fileExtensions = ['.tsx', '.ts', '.jsx', '.js', '.html', '.md'];

let totalReplacements = 0;
let filesChanged = [];

function replaceInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    let fileChanged = false;
    let replacements = 0;

    // Check for the old title
    if (newContent.includes(oldTitle)) {
      // Pattern 1: Multi-line with actual breaks
      const pattern1 = /Invest in a better alternative\s*\n\s*Build a portfolio of private assets like real estate, private credit, and venture capital\./g;
      if (pattern1.test(content)) {
        newContent = newContent.replace(
          pattern1,
          `Investing in the Future.\n\nThe AI-Powered Berkshire Hathaway.\n\nWe combine AI and human expertise to build exceptional businesses for long-term value creation.`
        );
        fileChanged = true;
        replacements++;
      }

      // Pattern 2: JSX/HTML with breaks and tags
      const pattern2 = /Invest in a better alternative([\s\S]{0,100})Build a portfolio of private assets like real estate, private credit, and venture capital\./g;
      const matches = content.match(pattern2);
      
      if (matches && !fileChanged) {
        // Smart replacement based on context
        newContent = newContent.replace(
          /Invest in a better alternative/g,
          'Investing in the Future.'
        );
        
        newContent = newContent.replace(
          /Build a portfolio of private assets like real estate, private credit, and venture capital\./g,
          'The AI-Powered Berkshire Hathaway.\n\nWe combine AI and human expertise to build exceptional businesses for long-term value creation.'
        );
        
        fileChanged = true;
        replacements++;
      }
      
      // Pattern 3: Simple title replacement if subtitle not nearby
      if (!fileChanged) {
        const titlePattern = /Invest in a better alternative/g;
        const titleMatches = content.match(titlePattern);
        if (titleMatches) {
          newContent = newContent.replace(titlePattern, 'Investing in the Future.');
          fileChanged = true;
          replacements++;
        }
      }
    }

    // Also check for subtitle independently
    if (newContent.includes(oldSubtitle)) {
      const subtitlePattern = /Build a portfolio of private assets like real estate, private credit, and venture capital\./g;
      newContent = newContent.replace(
        subtitlePattern,
        'The AI-Powered Berkshire Hathaway.\n\nWe combine AI and human expertise to build exceptional businesses for long-term value creation.'
      );
      if (!fileChanged) {
        fileChanged = true;
        replacements++;
      }
    }

    if (fileChanged) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      filesChanged.push(filePath);
      totalReplacements += replacements;
      console.log(`✓ ${filePath}: ${replacements} replacement(s)`);
    }

  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
  }
}

function scanDirectory(dir) {
  try {
    const items = fs.readdirSync(dir);

    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip node_modules, .git, dist, build directories
        if (!['node_modules', '.git', 'dist', 'build', '.next'].includes(item)) {
          scanDirectory(fullPath);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(fullPath);
        if (fileExtensions.includes(ext)) {
          replaceInFile(fullPath);
        }
      }
    });
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
}

console.log('🔄 Starting tagline replacement...\n');
console.log('Old Content:');
console.log('  "Invest in a better alternative"');
console.log('  "Build a portfolio of private assets like real estate, private credit, and venture capital."\n');
console.log('New Content:');
console.log('  "Investing in the Future."');
console.log('  "The AI-Powered Berkshire Hathaway."');
console.log('  "We combine AI and human expertise to build exceptional businesses for long-term value creation."\n');
console.log('═'.repeat(80));

// Scan all directories
directoriesToScan.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    console.log(`\nScanning ${dir}/...`);
    scanDirectory(fullPath);
  }
});

console.log('\n' + '═'.repeat(80));
console.log(`\n✅ Complete! Made ${totalReplacements} replacement(s) in ${filesChanged.length} file(s)\n`);

if (filesChanged.length > 0) {
  console.log('Files changed:');
  filesChanged.forEach(file => console.log(`  - ${file}`));
}

{/* <h1 class="text-[34px] font-[700] leading-[1.10] text-[#0B1120] text-center">Investing in the Future.</h1>

<h1 class="text-[36px] font-[700] leading-[1.10] text-[#0B1120] text-center">Investing in the Future.</h1>
 */}

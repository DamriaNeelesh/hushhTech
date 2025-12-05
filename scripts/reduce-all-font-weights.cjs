#!/usr/bin/env node

/**
 * Comprehensive script to reduce ALL font weights greater than 500 to 500
 * Checks TypeScript, JavaScript, CSS, and theme files
 */

const fs = require('fs');
const path = require('path');

// Comprehensive patterns to match all font weight declarations
const patterns = [
  // JavaScript/TypeScript patterns
  { regex: /fontWeight=["'](\d{3,4})["']/g, name: 'fontWeight prop with quotes' },
  { regex: /fontWeight:\s*["'](\d{3,4})["']/g, name: 'fontWeight object with quotes' },
  { regex: /fontWeight:\s*(\d{3,4})/g, name: 'fontWeight numeric' },
  { regex: /font-weight:\s*(\d{3,4})/g, name: 'CSS font-weight' },
  { regex: /fw:\s*["']?(\d{3,4})["']?/g, name: 'fw shorthand' },
  
  // Tailwind bracket notation - font-[XXX]
  { regex: /font-\[(\d{3,4})\]/g, name: 'Tailwind font-[XXX]' },
  
  // Text-based font weights
  { regex: /fontWeight=["'](bold|bolder|semibold)["']/g, name: 'fontWeight text', textReplace: true },
  { regex: /fontWeight:\s*["'](bold|bolder|semibold)["']/g, name: 'fontWeight object text', textReplace: true },
  { regex: /font-weight:\s*(bold|bolder|semibold)/g, name: 'CSS font-weight text', textReplace: true },
];

let totalFiles = 0;
let modifiedFiles = 0;
let totalReplacements = 0;
const modifiedFilesList = [];

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  let fileModified = false;
  let fileReplacements = 0;

  // Process each pattern
  patterns.forEach(pattern => {
    if (pattern.textReplace) {
      // Replace text-based bold weights with "500"
      newContent = newContent.replace(pattern.regex, (match) => {
        fileModified = true;
        fileReplacements++;
        if (match.includes('fontWeight=')) {
          return 'fontWeight="500"';
        } else if (match.includes('fontWeight:')) {
          return 'fontWeight: "500"';
        } else if (match.includes('font-weight:')) {
          return 'font-weight: 500';
        }
        return match.replace(/(bold|bolder|semibold)/, '500');
      });
    } else {
      // Replace numeric weights > 500
      newContent = newContent.replace(pattern.regex, (match, fontWeight) => {
        const weight = parseInt(fontWeight);
        if (weight > 500) {
          fileModified = true;
          fileReplacements++;
          return match.replace(fontWeight.toString(), '500');
        }
        return match;
      });
    }
  });

  if (fileModified) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    modifiedFiles++;
    totalReplacements += fileReplacements;
    const relativePath = path.relative(process.cwd(), filePath);
    modifiedFilesList.push(`  ✅ ${relativePath} (${fileReplacements} replacements)`);
  }
}

function walkDirectory(dir, extensions) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and other build directories
      if (!['node_modules', 'dist', 'build', '.git', '.next'].includes(file)) {
        walkDirectory(filePath, extensions);
      }
    } else if (stat.isFile()) {
      // Process specified file types
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        totalFiles++;
        processFile(filePath);
      }
    }
  });
}

console.log('🔍 Comprehensive font weight scan starting...\n');
console.log('📝 Checking: TypeScript, JavaScript, TSX, JSX, CSS files\n');

const srcDir = path.join(__dirname, '..', 'src');
const extensions = ['.tsx', '.ts', '.jsx', '.js', '.css'];

walkDirectory(srcDir, extensions);

console.log('\n📊 Summary:');
console.log(`   Total files scanned: ${totalFiles}`);
console.log(`   Files modified: ${modifiedFiles}`);
console.log(`   Total replacements: ${totalReplacements}`);

if (modifiedFiles > 0) {
  console.log('\n📝 Modified files:');
  modifiedFilesList.forEach(file => console.log(file));
}

console.log('\n✨ Done! All font weights are now capped at 500.');
console.log('💡 Tip: Clear browser cache and hard refresh to see changes.');

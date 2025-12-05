#!/usr/bin/env node

/**
 * Script to reduce all font weights greater than 500 to 500
 * Searches through all TypeScript and JavaScript files in src directory
 */

const fs = require('fs');
const path = require('path');

// Patterns to match font weight declarations
const patterns = [
  // fontWeight="600" or fontWeight='600'
  /fontWeight=["'](\d{3,4})["']/g,
  // fontWeight: "600" or fontWeight: '600'
  /fontWeight:\s*["'](\d{3,4})["']/g,
  // fontWeight: 600 (numeric)
  /fontWeight:\s*(\d{3,4})/g,
];

let totalFiles = 0;
let modifiedFiles = 0;
let totalReplacements = 0;

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  let fileModified = false;
  let fileReplacements = 0;

  // Process each pattern
  patterns.forEach(pattern => {
    newContent = newContent.replace(pattern, (match, fontWeight) => {
      const weight = parseInt(fontWeight);
      if (weight > 500) {
        fileModified = true;
        fileReplacements++;
        // Preserve the original format (with or without quotes)
        if (match.includes('"')) {
          return match.replace(fontWeight, '500');
        } else if (match.includes("'")) {
          return match.replace(fontWeight, '500');
        } else {
          return match.replace(fontWeight, '500');
        }
      }
      return match;
    });
  });

  if (fileModified) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    modifiedFiles++;
    totalReplacements += fileReplacements;
    console.log(`✅ Modified: ${filePath} (${fileReplacements} replacements)`);
  }
}

function walkDirectory(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Skip node_modules and other build directories
      if (!['node_modules', 'dist', 'build', '.git'].includes(file)) {
        walkDirectory(filePath);
      }
    } else if (stat.isFile()) {
      // Process TypeScript, TSX, JavaScript, and JSX files
      if (/\.(tsx?|jsx?)$/.test(file)) {
        totalFiles++;
        processFile(filePath);
      }
    }
  });
}

console.log('🔍 Searching for font weights greater than 500...\n');

const srcDir = path.join(__dirname, '..', 'src');
walkDirectory(srcDir);

console.log('\n📊 Summary:');
console.log(`   Total files scanned: ${totalFiles}`);
console.log(`   Files modified: ${modifiedFiles}`);
console.log(`   Total replacements: ${totalReplacements}`);
console.log('\n✨ Done! All font weights are now capped at 500.');

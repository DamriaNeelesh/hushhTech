#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// --- CONFIG ---

// Target logo path
const TARGET_SRC = '/src/components/images/Hushhogo.png';

// File extensions to scan
const TARGET_EXTENSIONS = [
  '.js',
  '.jsx',
  '.ts',
  '.tsx',
  '.html',
  '.vue',
  '.mdx'
];

// Directories to skip
const IGNORE_DIRS = new Set([
  'node_modules',
  '.git',
  '.next',
  'dist',
  'build',
  'out',
  '.turbo',
  '.vercel'
]);

// Files to skip
const IGNORE_FILES = new Set([
  'Navbar.tsx'
]);

// --- HELPERS ---

function shouldProcessFile(filePath) {
  const ext = path.extname(filePath);
  const fileName = path.basename(filePath);
  return TARGET_EXTENSIONS.includes(ext) && !IGNORE_FILES.has(fileName);
}

function walkDir(dir, fileCallback) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) {
        walkDir(fullPath, fileCallback);
      }
    } else if (entry.isFile()) {
      if (shouldProcessFile(fullPath)) {
        fileCallback(fullPath);
      }
    }
  }
}

function updateFile(filePath) {
  const original = fs.readFileSync(filePath, 'utf8');
  let updated = original;
  let changed = false;

  // Check if file contains HushhLogo import and usage
  if (!original.includes('Hushhogo.png') && !original.includes('HushhLogo')) {
    return;
  }

  // 1) Plain <img> tags with width/height attributes
  const imgPattern = /<img([^>]*?)src=["'][^"']*Hushhogo\.png["']([^>]*?)>/gi;
  updated = updated.replace(imgPattern, (match) => {
    let tag = match;
    if ((tag.includes('width="50"') || tag.includes('width=\'50\'')) && 
        (tag.includes('height="50"') || tag.includes('height=\'50\''))) {
      tag = tag
        .replace(/width=["']50["']/g, 'width="70"')
        .replace(/height=["']50["']/g, 'height="70"');
      changed = true;
      console.log('✅ Updated <img> 50x50 → 70x70 in', filePath);
    }
    return tag;
  });

  // 2) Chakra <Image> components with various size props
  const chakraPattern = /<Image([^>]*?)src=["'][^"']*Hushhogo\.png["']([^>]*?)\/?>/gi;
  updated = updated.replace(chakraPattern, (match) => {
    let tag = match;
    const has50 =
      /boxSize=["']50px["']/.test(tag) ||
      /width=["']50px["']/.test(tag) ||
      /height=["']50px["']/.test(tag) ||
      /boxSize=\{50\}/.test(tag) ||
      /width=\{50\}/.test(tag) ||
      /height=\{50\}/.test(tag) ||
      /boxSize=["']50["']/.test(tag) ||
      /width=["']50["']/.test(tag) ||
      /height=["']50["']/.test(tag);

    if (has50) {
      tag = tag
        .replace(/boxSize=["']50px["']/g, 'boxSize="70px"')
        .replace(/width=["']50px["']/g, 'width="70px"')
        .replace(/height=["']50px["']/g, 'height="70px"')
        .replace(/boxSize=\{50\}/g, 'boxSize={70}')
        .replace(/width=\{50\}/g, 'width={70}')
        .replace(/height=\{50\}/g, 'height={70}')
        .replace(/boxSize=["']50["']/g, 'boxSize="70"')
        .replace(/width=["']50["']/g, 'width="70"')
        .replace(/height=["']50["']/g, 'height="70"');
      changed = true;
      console.log('✅ Updated <Image> 50x50 → 70x70 in', filePath);
    }
    return tag;
  });

  // 3) Inline styles with width/height: 50px
  const stylePattern = /style=\{\{([^}]*?)\}\}/g;
  updated = updated.replace(stylePattern, (match, styleContent) => {
    if (styleContent.includes('width') && styleContent.includes('50') && 
        styleContent.includes('height') && styleContent.includes('50')) {
      const newStyle = styleContent
        .replace(/width:\s*["']?50px?["']?/g, 'width: "70px"')
        .replace(/height:\s*["']?50px?["']?/g, 'height: "70px"');
      if (newStyle !== styleContent) {
        changed = true;
        console.log('✅ Updated inline style 50x50 → 70x70 in', filePath);
      }
      return `style={{${newStyle}}}`;
    }
    return match;
  });

  if (changed && updated !== original) {
    fs.writeFileSync(filePath, updated, 'utf8');
  }
}

// --- MAIN ---

(function main() {
  const rootDir = process.cwd();
  console.log('🔍 Searching for Hushh logo (50x50) in:', rootDir);
  console.log('Target src:', TARGET_SRC);
  console.log('Excluding files:', Array.from(IGNORE_FILES).join(', '));
  console.log('----------------------------------------');

  walkDir(rootDir, updateFile);

  console.log('✨ Done.');
})();

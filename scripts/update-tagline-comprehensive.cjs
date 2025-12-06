const fs = require('fs');
const path = require('path');

// File extensions to process
const TARGET_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx', '.html', '.cjs', '.mjs', '.json'];

// Directories to ignore
const IGNORE_DIRS = new Set(['node_modules', '.git', '.next', 'dist', 'build', 'out', '.turbo', '.vercel', 'public']);

// Search and replace pattern
const SEARCH_TEXT = 'invest in exceptional businesses';
const REPLACE_TEXT = 'invest in exceptional businesses';

let filesUpdated = 0;
let occurrencesReplaced = 0;

/**
 * Recursively walks through directories and processes files
 */
function walkDir(dir, fileCallback) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip ignored directories
      if (!IGNORE_DIRS.has(file)) {
        walkDir(filePath, fileCallback);
      }
    } else if (stat.isFile()) {
      // Check if file has target extension
      const ext = path.extname(file);
      if (TARGET_EXTENSIONS.includes(ext)) {
        fileCallback(filePath);
      }
    }
  }
}

/**
 * Process a single file - search and replace text
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file contains the search text
    if (content.includes(SEARCH_TEXT)) {
      // Count occurrences
      const matches = content.match(new RegExp(SEARCH_TEXT, 'g'));
      const count = matches ? matches.length : 0;
      
      // Replace all occurrences
      const updatedContent = content.replace(new RegExp(SEARCH_TEXT, 'g'), REPLACE_TEXT);
      
      // Write back to file
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      
      filesUpdated++;
      occurrencesReplaced += count;
      
      console.log(`✅ Updated ${filePath} (${count} occurrence${count > 1 ? 's' : ''})`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

/**
 * Main execution
 */
function main() {
  const projectRoot = path.join(__dirname, '..');
  
  console.log('🔍 Searching for "invest in exceptional businesses" across the project...\n');
  console.log(`Project root: ${projectRoot}`);
  console.log(`Target extensions: ${TARGET_EXTENSIONS.join(', ')}`);
  console.log(`Ignored directories: ${Array.from(IGNORE_DIRS).join(', ')}\n`);
  
  // Walk through all directories and process files
  walkDir(projectRoot, processFile);
  
  console.log('\n' + '='.repeat(60));
  console.log(`✨ Complete! Updated ${filesUpdated} file${filesUpdated !== 1 ? 's' : ''}`);
  console.log(`📝 Replaced ${occurrencesReplaced} occurrence${occurrencesReplaced !== 1 ? 's' : ''}`);
  console.log('='.repeat(60));
}

main();

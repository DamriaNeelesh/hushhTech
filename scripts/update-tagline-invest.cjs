#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// File to update
const heroPath = path.join(__dirname, '..', 'src', 'components', 'Hero.tsx');

// Read the file
let content = fs.readFileSync(heroPath, 'utf8');

// Replace "invest in exceptional businesses" with "invest in exceptional businesses"
const updated = content.replace(
  /invest in exceptional businesses/g,
  'invest in exceptional businesses'
);

// Write back
fs.writeFileSync(heroPath, updated, 'utf8');

console.log('✅ Updated tagline in Hero.tsx');
console.log('   Changed: "invest in exceptional businesses"');
console.log('   To:      "invest in exceptional businesses"');

#!/usr/bin/env node

/**
 * Script to add scroll-to-top useEffect to all onboarding step files
 */

const fs = require('fs');
const path = require('path');

const scrollToTopCode = `  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  `;

const onboardingDir = path.join(__dirname, '..', 'src', 'pages', 'onboarding');
const steps = ['Step4.tsx', 'Step5.tsx', 'Step6.tsx', 'Step7.tsx', 'Step8.tsx', 'Step9.tsx', 
               'Step10.tsx', 'Step11.tsx', 'Step12.tsx', 'Step13.tsx', 'Step14.tsx'];

let modifiedCount = 0;

steps.forEach(stepFile => {
  const filePath = path.join(onboardingDir, stepFile);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ File not found: ${stepFile}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if scroll-to-top is already added
  if (content.includes('Scroll to top on component mount')) {
    console.log(`⏭️  Skipped ${stepFile} (already has scroll-to-top)`);
    return;
  }

  // Find the first useEffect and add scroll-to-top before it
  const useEffectRegex = /(\n  useEffect\(\(\) => \{)/;
  
  if (useEffectRegex.test(content)) {
    content = content.replace(useEffectRegex, `\n${scrollToTopCode}$1`);
    fs.writeFileSync(filePath, content, 'utf8');
    modifiedCount++;
    console.log(`✅ Added scroll-to-top to ${stepFile}`);
  } else {
    console.log(`⚠️  Could not find useEffect in ${stepFile}`);
  }
});

console.log(`\n📊 Summary: Modified ${modifiedCount} files`);
console.log('✨ Done!');

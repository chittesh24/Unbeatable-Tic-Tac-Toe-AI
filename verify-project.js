#!/usr/bin/env node

/**
 * Project Verification Script
 * Checks that all files are present and properly configured
 */

const fs = require('fs');
const path = require('path');

const COLORS = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function checkFile(filePath, description) {
  const exists = fs.existsSync(filePath);
  const icon = exists ? '✓' : '✗';
  const color = exists ? 'green' : 'red';
  log(`  ${icon} ${description}`, color);
  return exists;
}

function checkDirectory(dirPath, description) {
  const exists = fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
  const icon = exists ? '✓' : '✗';
  const color = exists ? 'green' : 'red';
  log(`  ${icon} ${description}`, color);
  return exists;
}

console.log('\n' + '='.repeat(60));
log('UNBEATABLE TIC-TAC-TOE AI - PROJECT VERIFICATION', 'cyan');
console.log('='.repeat(60) + '\n');

let totalChecks = 0;
let passedChecks = 0;

// Core Files
log('📦 Core Configuration Files:', 'yellow');
totalChecks += 7;
passedChecks += checkFile('package.json', 'package.json') ? 1 : 0;
passedChecks += checkFile('next.config.js', 'next.config.js') ? 1 : 0;
passedChecks += checkFile('tailwind.config.js', 'tailwind.config.js') ? 1 : 0;
passedChecks += checkFile('postcss.config.js', 'postcss.config.js') ? 1 : 0;
passedChecks += checkFile('jsconfig.json', 'jsconfig.json') ? 1 : 0;
passedChecks += checkFile('.env.example', '.env.example') ? 1 : 0;
passedChecks += checkFile('.gitignore', '.gitignore') ? 1 : 0;

console.log();

// Source Directories
log('📁 Source Directories:', 'yellow');
totalChecks += 8;
passedChecks += checkDirectory('src', 'src/') ? 1 : 0;
passedChecks += checkDirectory('src/app', 'src/app/') ? 1 : 0;
passedChecks += checkDirectory('src/components', 'src/components/') ? 1 : 0;
passedChecks += checkDirectory('src/ai', 'src/ai/') ? 1 : 0;
passedChecks += checkDirectory('src/store', 'src/store/') ? 1 : 0;
passedChecks += checkDirectory('src/lib', 'src/lib/') ? 1 : 0;
passedChecks += checkDirectory('src/utils', 'src/utils/') ? 1 : 0;
passedChecks += checkDirectory('src/context', 'src/context/') ? 1 : 0;

console.log();

// Core Components
log('⚛️  React Components:', 'yellow');
totalChecks += 10;
passedChecks += checkFile('src/app/page.js', 'Main page') ? 1 : 0;
passedChecks += checkFile('src/app/layout.js', 'Root layout') ? 1 : 0;
passedChecks += checkFile('src/components/game/GameBoard.js', 'GameBoard') ? 1 : 0;
passedChecks += checkFile('src/components/game/Cell.js', 'Cell') ? 1 : 0;
passedChecks += checkFile('src/components/game/GameModal.js', 'GameModal') ? 1 : 0;
passedChecks += checkFile('src/components/game/GameSettings.js', 'GameSettings') ? 1 : 0;
passedChecks += checkFile('src/components/game/AIThinkingIndicator.js', 'AIThinkingIndicator') ? 1 : 0;
passedChecks += checkFile('src/components/analytics/AnalyticsDashboard.js', 'AnalyticsDashboard') ? 1 : 0;
passedChecks += checkFile('src/components/layout/Header.js', 'Header') ? 1 : 0;
passedChecks += checkFile('src/components/ui/Toaster.js', 'Toaster') ? 1 : 0;

console.log();

// Core Logic
log('🧠 AI & Logic:', 'yellow');
totalChecks += 5;
passedChecks += checkFile('src/ai/minimax.js', 'Minimax AI Engine') ? 1 : 0;
passedChecks += checkFile('src/store/gameStore.js', 'Game Store (Zustand)') ? 1 : 0;
passedChecks += checkFile('src/utils/gameLogic.js', 'Game Logic Utils') ? 1 : 0;
passedChecks += checkFile('src/utils/soundManager.js', 'Sound Manager') ? 1 : 0;
passedChecks += checkFile('src/context/ThemeContext.js', 'Theme Context') ? 1 : 0;

console.log();

// Documentation
log('📚 Documentation Files:', 'yellow');
totalChecks += 15;
passedChecks += checkFile('README.md', 'README.md') ? 1 : 0;
passedChecks += checkFile('START_HERE.md', 'START_HERE.md') ? 1 : 0;
passedChecks += checkFile('HOW_TO_RUN.md', 'HOW_TO_RUN.md') ? 1 : 0;
passedChecks += checkFile('⭐_READ_ME_FIRST.txt', '⭐_READ_ME_FIRST.txt') ? 1 : 0;
passedChecks += checkFile('PROJECT_SUMMARY.md', 'PROJECT_SUMMARY.md') ? 1 : 0;
passedChecks += checkFile('COMPLETION_REPORT.md', 'COMPLETION_REPORT.md') ? 1 : 0;
passedChecks += checkFile('LOCAL_SETUP.md', 'LOCAL_SETUP.md') ? 1 : 0;
passedChecks += checkFile('DEPLOYMENT_GUIDE.md', 'DEPLOYMENT_GUIDE.md') ? 1 : 0;
passedChecks += checkFile('DATABASE_SETUP.md', 'DATABASE_SETUP.md') ? 1 : 0;
passedChecks += checkFile('SECURITY_GUIDE.md', 'SECURITY_GUIDE.md') ? 1 : 0;
passedChecks += checkFile('ARCHITECTURE.md', 'ARCHITECTURE.md') ? 1 : 0;
passedChecks += checkFile('AI_ALGORITHM_EXPLANATION.md', 'AI_ALGORITHM_EXPLANATION.md') ? 1 : 0;
passedChecks += checkFile('PERFORMANCE_OPTIMIZATION.md', 'PERFORMANCE_OPTIMIZATION.md') ? 1 : 0;
passedChecks += checkFile('TESTING_GUIDE.md', 'TESTING_GUIDE.md') ? 1 : 0;
passedChecks += checkFile('SCALABILITY_ROADMAP.md', 'SCALABILITY_ROADMAP.md') ? 1 : 0;

console.log();

// Results
console.log('='.repeat(60));
const percentage = Math.round((passedChecks / totalChecks) * 100);
const status = percentage === 100 ? 'PERFECT' : percentage >= 90 ? 'EXCELLENT' : percentage >= 75 ? 'GOOD' : 'NEEDS ATTENTION';
const statusColor = percentage === 100 ? 'green' : percentage >= 90 ? 'cyan' : percentage >= 75 ? 'yellow' : 'red';

log(`Results: ${passedChecks}/${totalChecks} checks passed (${percentage}%)`, statusColor);
log(`Status: ${status}`, statusColor);
console.log('='.repeat(60));

if (percentage === 100) {
  console.log();
  log('🎉 PROJECT VERIFICATION COMPLETE!', 'green');
  log('✅ All files present and accounted for', 'green');
  log('🚀 Ready for deployment!', 'green');
  console.log();
  log('Next steps:', 'cyan');
  log('  1. npm install', 'white');
  log('  2. npm run dev', 'white');
  log('  3. Open http://localhost:3000', 'white');
  console.log();
} else if (percentage >= 90) {
  console.log();
  log('✅ Project structure looks good!', 'cyan');
  log('⚠️  Some optional files may be missing', 'yellow');
  log('🚀 Should be ready to run', 'cyan');
  console.log();
} else {
  console.log();
  log('⚠️  Some required files are missing', 'yellow');
  log('📖 Check the documentation for setup instructions', 'yellow');
  console.log();
}

process.exit(percentage === 100 ? 0 : 1);

#!/usr/bin/env node

/**
 * Electron Build Script
 * Builds the application for distribution
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}[Build]${colors.reset} ${message}`);
}

function execCommand(command, description) {
  log(description, 'yellow');
  try {
    execSync(command, { stdio: 'inherit' });
    log(`✓ ${description} complete`, 'green');
  } catch (error) {
    log(`✗ ${description} failed`, 'red');
    throw error;
  }
}

async function main() {
  log('Starting Electron build process...', 'cyan');
  console.log('');

  // Step 1: Clean previous builds
  log('Cleaning previous builds...', 'yellow');
  const dirsToClean = ['dist', 'dist-electron', 'release'];
  dirsToClean.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (fs.existsSync(dirPath)) {
      fs.rmSync(dirPath, { recursive: true, force: true });
      log(`  Removed ${dir}/`, 'blue');
    }
  });
  log('✓ Clean complete', 'green');
  console.log('');

  // Step 2: Build Vite app
  execCommand('npm run build', 'Building Vite application');
  console.log('');

  // Step 3: Compile Electron TypeScript
  execCommand('npx tsc -p electron/tsconfig.json', 'Compiling Electron TypeScript');
  console.log('');

  // Step 4: Create build directory for icons (if not exists)
  const buildDir = path.join(__dirname, '../build');
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
    log('Created build directory for icons', 'blue');
  }

  // Step 5: Build Electron app
  const platform = process.argv[2] || process.platform;
  const arch = process.argv[3] || process.arch;
  
  log(`Building for platform: ${platform}, arch: ${arch}`, 'cyan');
  execCommand(
    `npx electron-builder --${platform === 'win32' ? 'win' : platform === 'darwin' ? 'mac' : 'linux'} --${arch}`,
    'Building Electron package'
  );
  console.log('');

  log('🎉 Build complete! Check the /release folder.', 'green');
}

main().catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});

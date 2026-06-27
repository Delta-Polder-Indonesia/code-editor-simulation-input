#!/usr/bin/env node

/**
 * Electron Development Script
 * Compiles TypeScript and starts Electron in development mode
 * NOTE: This is for DEVELOPMENT only - it connects to Vite dev server
 */

const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}[Electron Dev]${colors.reset} ${message}`);
}

async function main() {
  log('Starting Electron development mode...', 'cyan');

  // Step 1: Compile Electron TypeScript files
  log('Compiling Electron TypeScript...', 'yellow');
  
  try {
    execSync('npx tsc -p electron/tsconfig.json', { stdio: 'inherit' });
    // Force CommonJS mode for compiled Electron files even when root package uses "type": "module"
    const distElectronDir = path.join(__dirname, '../dist-electron');
    fs.writeFileSync(
      path.join(distElectronDir, 'package.json'),
      JSON.stringify({ type: 'commonjs' }, null, 2)
    );
    log('TypeScript compilation complete!', 'green');
  } catch (error) {
    log('TypeScript compilation failed!', 'red');
    process.exit(1);
  }

  // Step 2: Start Electron pointing to Vite dev server
  log('Starting Electron...', 'cyan');
  
  const electronPath = require('electron');
  const mainPath = path.join(__dirname, '../dist-electron/main.js');
  
  const env = {
    ...process.env,
    NODE_ENV: 'development',
  };

  const electronProcess = spawn(electronPath, [mainPath], {
    env,
    stdio: 'inherit',
  });

  electronProcess.on('close', (code) => {
    log(`Electron exited with code ${code}`, code === 0 ? 'green' : 'yellow');
    process.exit(code);
  });

  electronProcess.on('error', (error) => {
    log(`Failed to start Electron: ${error.message}`, 'red');
    process.exit(1);
  });
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});

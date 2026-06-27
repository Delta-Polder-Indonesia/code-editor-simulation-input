#!/usr/bin/env node

/**
 * Electron Development Script
 * Compiles TypeScript and starts Electron with hot reload
 */

const { spawn, exec } = require('child_process');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}[Electron Dev]${colors.reset} ${message}`);
}

async function main() {
  log('Starting Electron development environment...', 'cyan');

  // Step 1: Compile Electron TypeScript files
  log('Compiling Electron TypeScript...', 'yellow');
  
  await new Promise((resolve, reject) => {
    exec('npx tsc -p electron/tsconfig.json', (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        reject(error);
        return;
      }
      if (stdout) console.log(stdout);
      resolve();
    });
  });

  log('TypeScript compilation complete!', 'green');

  // Step 2: Set environment and start Electron
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
    log(`Electron process exited with code ${code}`, code === 0 ? 'green' : 'yellow');
    process.exit(code);
  });

  electronProcess.on('error', (error) => {
    console.error('Failed to start Electron:', error);
    process.exit(1);
  });
}

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});

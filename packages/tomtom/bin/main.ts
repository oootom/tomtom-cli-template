#!/usr/bin/env node
import { spawn } from 'child_process';
import path from 'path';

import log from './log';

function main() {
  const cmdProcess = spawn(
    process.execPath,
    [
      '--no-warnings',
      '--experimental-vm-modules',
      ...process.execArgv,
      path.join(__dirname, '../cmd-dist/cli.js'),
      ...process.argv.slice(2),
    ],
    { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] },
  );

  process.on('SIGINT', () => {
    cmdProcess.kill('SIGTERM');
  });
  process.on('SIGTERM', () => {
    cmdProcess.kill('SIGTERM');
  });

  cmdProcess.on('message', () => {
    // log something
  });

  cmdProcess.on('exit', code => {
    log.report().then(() => {
      process.exit(code === undefined || code === null ? 0 : code);
    });
  });
}

void main();

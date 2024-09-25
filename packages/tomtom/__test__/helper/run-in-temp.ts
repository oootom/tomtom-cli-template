import fs from 'fs';
import os from 'os';
import path from 'path';

const originalCwd = process.cwd();

export function runInTempDir() {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'tomtom-test')));
    process.chdir(tmpDir);
    process.env.PWD = tmpDir;
  });

  afterEach(() => {
    if (fs.existsSync(tmpDir)) {
      process.chdir(originalCwd);
      process.env.PWD = originalCwd;
      fs.rmSync(tmpDir, { recursive: true });
    }
  });
}

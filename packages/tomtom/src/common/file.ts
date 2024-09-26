import fs from 'fs';
import os from 'os';

import { getFullPath } from './path';

export function emptyDirSync(dir: string) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = `${dir}/${file}`;
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      deleteDirSync(filePath);
    } else {
      deleteFileSync(filePath);
    }
  });
}

export function createDirSync(dir: string) {
  return fs.mkdirSync(dir);
}

export function deleteDirSync(dir: string) {
  emptyDirSync(dir);
  return fs.rmdirSync(dir);
}

export function renameDirSync(oldDir: string, newDir: string) {
  return fs.renameSync(oldDir, newDir);
}

export function createTempDirSync(prefix: string) {
  return fs.mkdtempSync(getFullPath(os.tmpdir(), prefix));
}

export function fileExitsSync(file: string) {
  return fs.existsSync(file);
}

export function readFileSync(file: string, encoding: BufferEncoding = 'utf-8'): string {
  return fs.readFileSync(file, encoding);
}

export function writeFileSync(
  file: string,
  content: string | NodeJS.ArrayBufferView,
  encoding: BufferEncoding = 'utf-8',
) {
  return fs.writeFileSync(file, content, encoding);
}

export function copyFileSync(src: string, dest: string) {
  return fs.copyFileSync(src, dest);
}

export function deleteFileSync(file: string) {
  return fs.unlinkSync(file);
}

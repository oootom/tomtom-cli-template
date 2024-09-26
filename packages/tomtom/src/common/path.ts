import path from 'path';

export function getRelativePath(dir: string, file: string) {
  return path.relative(dir, file);
}

export function getCwdRelativePath(file: string) {
  return getRelativePath(process.cwd(), file);
}

export function getFullPath(dir: string, file: string) {
  return path.join(dir, file);
}

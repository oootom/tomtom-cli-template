import TOML from '@iarna/toml';
import fs from 'fs';
import path from 'path';
import { parseConfigFileTextToJson } from 'typescript';

interface TestFile {
  contents: unknown;
}
interface TestFolder {
  items: {
    [id: string]: TestFile | TestFolder | boolean;
  };
}

function parse(name: string, value: string): unknown {
  if (name.endsWith('.toml')) {
    return TOML.parse(value);
  }
  if (name.endsWith('tsconfig.json')) {
    return parseConfigFileTextToJson(name, value);
  }
  if (name.endsWith('.json')) {
    return JSON.parse(value);
  }
  return value;
}

export function checkFiles(folder: TestFolder, cwd = process.cwd()) {
  Object.entries(folder.items).forEach(([name, item]) => {
    const itemPath = path.resolve(cwd, name);
    if (typeof item === 'boolean') {
      if (fs.existsSync(itemPath) !== item) {
        throw new Error(`Expected ${itemPath} ${item ? '' : 'not '}to exist.`);
      }
    } else if ('contents' in item) {
      const actualContents = parse(name, fs.readFileSync(itemPath, 'utf-8'));
      expect(actualContents).toEqual(item.contents);
    } else if ('items' in item) {
      checkFiles(item, itemPath);
    } else {
      throw new Error('Unexpected TestFile object.');
    }
  });
}

import TOML from '@iarna/toml';

import { readFileSync, writeFileSync } from '../common/file';
import type { PackageJSON, TomlConfig } from '../types/config';
import { ConfigLoadError, ConfigSaveError } from './error';

export function loadPackageJson(path: string): PackageJSON {
  try {
    if (!path.endsWith('.json')) {
      throw new Error(`Invalid package.json path: ${path}`);
    }
    const packageJsonContent = readFileSync(path);
    return JSON.parse(packageJsonContent);
  } catch (err) {
    throw new ConfigLoadError(`Failed to load package.json:\n${err?.message}`);
  }
}

export function savePackageJson(path: string, packageJsonConfig: PackageJSON) {
  try {
    if (!path.endsWith('.json')) {
      throw new Error(`Invalid package.json path: ${path}`);
    }
    const packageJsonContent = `${JSON.stringify(packageJsonConfig, null, 2)}\n`;
    writeFileSync(path, packageJsonContent);
  } catch (err) {
    throw new ConfigSaveError(`Failed to save package.json:\n${err?.message}`);
  }
}

export function loadToml(path: string): TomlConfig {
  try {
    if (!path.endsWith('.toml')) {
      throw new Error(`Invalid toml path: ${path}`);
    }
    const tefTomlContent = readFileSync(path);
    const normalized = tefTomlContent.replace(/\r\n/g, '\n');

    return TOML.parse(normalized) as unknown as TomlConfig;
  } catch (err) {
    throw new ConfigSaveError(`Failed to load toml:\n${err?.message}`);
  }
}

export function saveToml(path: string, tefTomlConfig: TomlConfig) {
  try {
    if (!path.endsWith('.toml')) {
      throw new Error(`Invalid .toml path: ${path}`);
    }
    const tefTomlContent = TOML.stringify(tefTomlConfig as unknown as TOML.JsonMap);
    writeFileSync(path, tefTomlContent);
  } catch (err) {
    throw new ConfigSaveError(`Failed to save toml:\n${err?.message}`);
  }
}

/**
 * package.json 配置
 */
export interface PackageJSON {
  name?: string;
  version?: string;
  private?: boolean;
  scripts?: Record<string, unknown>;
  dependencies?: Record<string, unknown>;
  devDependencies?: Record<string, unknown>;
}

export interface TomlConfig {
  name: string;
  main: string;
}

export interface EnvConfig {
  DEV_SERVER_ENDPOINT?: string;
  DEV_SERVER_PORT?: number | string;
}

import type { ArgumentsCamelCase, Argv } from 'yargs';

type CamelCaseString<S extends string> = S extends `${infer L}_${infer R}`
  ? `${Lowercase<L>}${Capitalize<CamelCaseString<R>>}`
  : S extends `${infer L}${infer R}`
  ? L extends Uppercase<L>
    ? `${Lowercase<L>}${CamelCaseString<`${R}`>}`
    : S
  : S;

type CommonYargsOptions = {
  v: boolean | undefined;
  config: string | undefined;
  env: string | undefined;
};

type OnlyCamelCase<T = Record<string, never>> = {
  [K in keyof T as CamelCaseString<K & string>]?: T[K];
};

type RemoveIndex<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K];
};

type CommonYargsArgv = Argv<CommonYargsOptions>;

export type StrictYargsOptionsToInterface<T extends (yargs: CommonYargsArgv) => Argv> = T extends (
  yargs: CommonYargsArgv,
) => Argv<infer P>
  ? OnlyCamelCase<RemoveIndex<ArgumentsCamelCase<P>>>
  : never;

export type CamelCase<T> = {
  [K in keyof T as CamelCaseString<K & string>]: T[K] extends Array<infer U>
    ? Array<U extends object ? CamelCase<U> : U>
    : T[K] extends object
    ? CamelCase<T[K]>
    : T[K];
};

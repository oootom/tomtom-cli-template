import { ZodError, ZodIssue } from 'zod';

export class BaseError extends Error {
  public handled: boolean;
  constructor(message: string) {
    super(message);
    this.handled = true;
    this.name = this.constructor.name;
  }
}

export class UnexpectedError extends BaseError {
  constructor(message: string) {
    super(`[UnexpectedError] ${message}`);
  }
}

export class ConfigLoadError extends BaseError {
  constructor(message: string) {
    super(`[ConfigLoadError] ${message}`);
  }
}

export class ConfigSaveError extends BaseError {
  constructor(message: string) {
    super(`[ConfigSaveError] ${message}`);
  }
}

function joinPath(path: Array<string | number>): string {
  if (path.length === 1) {
    return path[0].toString();
  }

  return path.reduce<string>((acc, item) => {
    if (typeof item === 'number') {
      return `${acc}[${item.toString()}]`;
    }

    if (item.includes('"')) {
      return `${acc}["${item.replace(/"/g, '\\"')}"]`;
    }

    if (!/[$_\p{ID_Start}][$\u200c\u200d\p{ID_Continue}]*/u.test(item)) {
      return `${acc}["${item}"]`;
    }

    const separator = acc.length === 0 ? '' : '.';
    return acc + separator + item;
  }, '');
}

function getMessageFromZodIssue(issue: ZodIssue, issueSeparator: string, unionSeparator: string): string {
  if (issue.code === 'invalid_union') {
    return issue.unionErrors
      .reduce<string[]>((acc, zodError) => {
        const newIssues = zodError.issues
          .map(issue => getMessageFromZodIssue(issue, issueSeparator, unionSeparator))
          .join(issueSeparator);

        if (!acc.includes(newIssues)) {
          acc.push(newIssues);
        }

        return acc;
      }, [])
      .join(unionSeparator);
  }

  if (issue.path?.length !== 0) {
    if (issue.path.length === 1) {
      const identifier = issue.path[0];

      if (typeof identifier === 'number') {
        return `${issue.message} at index ${identifier}`;
      }
    }
    return `${issue.message} at "${joinPath(issue.path)}"`;
  }

  return issue.message;
}

function conditionallyPrefixMessage(reason: string, prefix: string, prefixSeparator: string): string {
  if (reason.length > 0) {
    return [prefix, reason].join(prefixSeparator);
  }
  return prefix;
}

type FromZodErrorOptions = {
  issueSeparator?: string;
  unionSeparator?: string;
  prefix: string;
  prefixSeparator?: string;
};

function transformZodError(zodError: ZodError, options: FromZodErrorOptions) {
  const { issueSeparator = '\n', unionSeparator = ', or ', prefixSeparator = '\n', prefix } = options;

  const reason = zodError.errors
    .map(issue => getMessageFromZodIssue(issue, issueSeparator, unionSeparator))
    .join(issueSeparator);

  return conditionallyPrefixMessage(reason, prefix, prefixSeparator);
}

export class ValidationError extends BaseError {
  public details: Array<ZodIssue>;
  constructor(prefixMessage: string, zodError: ZodError) {
    const transedZodErrorMessage = transformZodError(zodError, { prefix: `${prefixMessage}:` });
    super(`[ValidationError] ${transedZodErrorMessage}`);
    this.details = zodError.errors;
  }
}

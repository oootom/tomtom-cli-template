import type { Argv } from 'yargs';

export function addOptions(yargs: Argv) {
  return yargs
    .positional('a', {
      describe: 'a input',
      type: 'string',
      requiresArg: true,
    })
    .positional('b', {
      describe: 'b input',
      type: 'string',
      requiresArg: true,
    });
}

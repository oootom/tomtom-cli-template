import type { Argv } from 'yargs';

export function initOptions(yargs: Argv) {
  return yargs
    .positional('name', {
      describe: 'The name of your project',
      type: 'string',
    })
    .option('y', {
      alias: 'yes',
      describe: 'Automatically answer yes to all prompts',
      type: 'boolean',
    });
}

import type { Argv } from 'yargs';

import { addHandler } from './handler';
import { addOptions } from './option';

export function addCommand(cmd: Argv) {
  cmd.command('add [a] [b]', 'Calculate the sum of two numbers.', addOptions, addHandler);
}

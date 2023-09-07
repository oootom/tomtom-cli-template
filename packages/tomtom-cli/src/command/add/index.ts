import type { Argv } from 'yargs';

import { addHandler } from './handler';
import { addOptions } from './option';

export function addCommand(tomtom: Argv) {
  tomtom.command('add [a] [b]', 'Calculate the sum of two numbers.', addOptions, addHandler);
}

import type { Argv } from 'yargs';

import { initHandler } from './handler';
import { initOptions } from './option';

export function initCommand(tomtom: Argv) {
  tomtom.command('init [name]', 'Initialize project.', initOptions, initHandler);
}

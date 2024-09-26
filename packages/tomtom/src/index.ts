import yargs from 'yargs';

import { addCommand } from './command/add';
import { initCommand } from './command/init';

export async function main(argv: string[]) {
  const cmd = createCommandParser(argv);
  await cmd.parse();
}

function createCommandParser(argv: string[]) {
  const cmd = yargs(argv).strict().scriptName('tomtom').wrap(null);

  addCommand(cmd);
  initCommand(cmd);

  return cmd;
}

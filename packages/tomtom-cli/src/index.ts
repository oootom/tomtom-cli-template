import yargs from 'yargs';

import { addCommand } from './command/add';
import { initCommand } from './command/init';

export async function main(argv: string[]) {
  const tomtom = createCommandParser(argv);
  await tomtom.parse();
}

function createCommandParser(argv: string[]) {
  const tomtom = yargs(argv).strict().scriptName('tomtom').wrap(null);

  addCommand(tomtom);
  initCommand(tomtom);

  return tomtom;
}

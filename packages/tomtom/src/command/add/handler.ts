import validator from '../../business/validator';
import printer from '../../common/printer';
import type { AddArgs } from '../../types/args';

export async function addHandler(args: AddArgs) {
  try {
    validator.addArgs(args);

    const { a, b } = args;
    printer.info(`${+a + +b}`);
  } catch (err) {
    printer.error(err?.message);
    process.exit(0);
  }
}

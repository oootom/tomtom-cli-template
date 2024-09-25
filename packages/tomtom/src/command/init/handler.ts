import validator from '../../business/validator';
import printer from '../../common/printer';
import type { InitArgs } from '../../types/args';
import { initProcess } from './process';

export async function initHandler(args: InitArgs) {
  try {
    validator.initArgs(args);
    await initProcess(args);
  } catch (err) {
    printer.error(err?.message);
    process.exit(0);
  }
}

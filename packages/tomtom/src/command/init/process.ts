import { UnexpectedError } from '../../business/error';
import printer from '../../common/printer';
import { InitArgs } from '../../types/args';
import { printInitBanner } from './banner';

export async function initProcess(args: InitArgs) {
  try {
    printer.info(args);

    printInitBanner();
  } catch (err) {
    if (err?.handled) {
      throw err;
    }
    throw new UnexpectedError(`Failed to execute init command:\n${err?.message}`);
  }
}

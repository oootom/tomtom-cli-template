import { UnexpectedError } from '../../business/error';
// import type { InitArgs } from '../../types/args';
import { printInitBanner } from './banner';

export async function initProcess() {
  try {
    // do something

    printInitBanner();
  } catch (err) {
    if (err?.handled) {
      throw err;
    }
    throw new UnexpectedError(`Failed to execute init command:\n${err?.message}`);
  }
}

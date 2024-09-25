import { addOptions } from '../command/add/option';
import { initOptions } from '../command/init/option';
import { StrictYargsOptionsToInterface } from './global';

export type AddArgs = StrictYargsOptionsToInterface<typeof addOptions>;
export type InitArgs = StrictYargsOptionsToInterface<typeof initOptions>;

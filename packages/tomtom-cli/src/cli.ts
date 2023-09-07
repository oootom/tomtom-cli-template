import { hideBin } from 'yargs/helpers';

import { main } from '.';

main(hideBin(process.argv)).catch(() => {});

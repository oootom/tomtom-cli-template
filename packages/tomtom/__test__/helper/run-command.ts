import { main } from '../../src/index';

export async function runCommand(cmd?: string) {
  try {
    await main(cmd?.split(' ') ?? []);
  } catch {}
}

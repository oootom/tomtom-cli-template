import { main } from '../../src/index';

export async function runTomtom(cmd?: string) {
  try {
    await main(cmd?.split(' ') ?? []);
  } catch {}
}

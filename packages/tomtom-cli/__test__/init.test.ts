import { runTomtom } from './helper/run-command';
import { runInTempDir } from './helper/run-in-temp';
import { spyConsoleMethods } from './helper/spy-console';
import { spyProcessMethods } from './helper/spy-process';
import { clearDialogs } from './helper/use-dialog';

describe('init command', () => {
  runInTempDir();
  const consoleSpy = spyConsoleMethods();
  const processSpy = spyProcessMethods();

  afterEach(() => {
    clearDialogs();
  });

  it('init name invalid', async () => {
    await runTomtom('init test-_@');

    expect(processSpy.exit).toBeCalledTimes(1);
    expect(consoleSpy.error).toBeCalledWith('[ValidationError] Failed to validate initArgs:\nInvalid input at "name"');
  });

  it('init -y', async () => {
    await runTomtom('init test-init -y');

    // do something
  });
});

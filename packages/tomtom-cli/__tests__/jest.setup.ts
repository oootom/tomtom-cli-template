jest.mock('prompts', () => {
  return {
    __esModule: true,
    default: jest.fn((...args) => {
      throw new Error(`Unexpected call to \`prompts("${JSON.stringify(args)}")\`.`);
    }),
  };
});

jest.mock('../src/common/printer', () => {
  return {
    error: (...args: unknown[]) => console.error(...args),
    warn: (...args: unknown[]) => console.warn(...args),
    header: (...args: unknown[]) => console.log(...args),
    note: (...args: unknown[]) => console.log(...args),
    info: (...args: unknown[]) => console.log(...args),
  };
});

jest.mock('execa', () => {
  const execaModule = jest.requireActual('execa');

  return {
    ...execaModule,
    execa: jest.fn((command, args, options = {}) => {
      if (command === 'npm') {
        return Promise.resolve();
      }
      return execaModule.execa(command, args, { ...options, stdio: 'pipe' });
    }),
  };
});

jest.mock('ink', () => {});
jest.mock('react', () => {});

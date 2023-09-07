let exitSpy: jest.SpyInstance;

const processSpy = {
  get exit() {
    return exitSpy;
  },
};

export function spyProcessMethods() {
  beforeEach(() => {
    exitSpy = jest.spyOn(process, 'exit').mockImplementation();
  });

  afterEach(() => {
    exitSpy.mockRestore();
  });

  return processSpy;
}

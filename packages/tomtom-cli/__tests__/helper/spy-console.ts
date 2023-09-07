let debugSpy: jest.SpyInstance;
let logSpy: jest.SpyInstance;
let infoSpy: jest.SpyInstance;
let errorSpy: jest.SpyInstance;
let warnSpy: jest.SpyInstance;

const consoleSpy = {
  get debug() {
    return debugSpy;
  },
  get log() {
    return logSpy;
  },
  get info() {
    return infoSpy;
  },
  get error() {
    return errorSpy;
  },
  get warn() {
    return warnSpy;
  },
};

export function spyConsoleMethods() {
  beforeEach(() => {
    debugSpy = jest.spyOn(console, 'debug').mockImplementation();
    logSpy = jest.spyOn(console, 'log').mockImplementation();
    infoSpy = jest.spyOn(console, 'info').mockImplementation();
    errorSpy = jest.spyOn(console, 'error').mockImplementation();
    warnSpy = jest.spyOn(console, 'warn').mockImplementation();
  });

  afterEach(() => {
    debugSpy.mockRestore();
    logSpy.mockRestore();
    infoSpy.mockRestore();
    errorSpy.mockRestore();
    warnSpy.mockRestore();
  });

  return consoleSpy;
}

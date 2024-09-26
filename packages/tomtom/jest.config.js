module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: '__test__/.*\\.(test|spec)\\.[jt]sx?$',
  testTimeout: 50000,
  transform: {
    '^.+\\.c?(t|j)sx?$': ['esbuild-jest', { sourcemap: true, target: 'node12' }],
  },
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/__test__/jest.setup.ts'],
  transformIgnorePatterns: [
    '/node_modules/(?!execa|strip-final-newline|npm-run-path|path-key|onetime|mimic-fn|human-signals|is-stream)',
  ],
  collectCoverage: true,
  coverageReporters: ['text'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts', '!<rootDir>/src/command/init/templates/*', '!<rootDir>/src/types/*'],
};

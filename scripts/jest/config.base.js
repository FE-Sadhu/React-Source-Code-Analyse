'use strict';

module.exports = {
  globalSetup: require.resolve('./setupGlobal.js'),
<<<<<<< HEAD
  haste: {
    hasteImplModulePath: require.resolve('./noHaste.js'),
  },
=======
>>>>>>> remotes/upstream/main
  modulePathIgnorePatterns: [
    '<rootDir>/scripts/rollup/shims/',
    '<rootDir>/scripts/bench/',
  ],
  transform: {
    '.*': require.resolve('./preprocessor.js'),
  },
  setupFiles: [require.resolve('./setupEnvironment.js')],
  setupFilesAfterEnv: [require.resolve('./setupTests.js')],
  // Only include files directly in __tests__, not in nested folders.
  testRegex: '/__tests__/[^/]*(\\.js|\\.coffee|[^d]\\.ts)$',
  moduleFileExtensions: ['js', 'json', 'node', 'coffee', 'ts'],
  rootDir: process.cwd(),
  roots: ['<rootDir>/packages', '<rootDir>/scripts'],
  collectCoverageFrom: ['packages/**/*.js'],
<<<<<<< HEAD
  timers: 'fake',
=======
  fakeTimers: {
    enableGlobally: true,
    legacyFakeTimers: true,
  },
>>>>>>> remotes/upstream/main
  snapshotSerializers: [require.resolve('jest-snapshot-serializer-raw')],

  testSequencer: require.resolve('./jestSequencer'),

  testEnvironment: 'jsdom',
<<<<<<< HEAD
=======

  testRunner: 'jest-circus/runner',
>>>>>>> remotes/upstream/main
};

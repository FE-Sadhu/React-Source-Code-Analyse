'use strict';

jest.mock('shared/ReactFeatureFlags', () => {
  jest.mock(
    'ReactFeatureFlags',
    () => jest.requireActual('shared/forks/ReactFeatureFlags.www-dynamic'),
    {virtual: true}
  );
<<<<<<< HEAD

  const wwwFlags = jest.requireActual('shared/forks/ReactFeatureFlags.www');
  const defaultFlags = jest.requireActual('shared/ReactFeatureFlags');

  // TODO: Many tests were written before we started running them against the
  // www configuration. Update those tests so that they work against the www
  // configuration, too. Then remove these overrides.
  wwwFlags.disableLegacyContext = defaultFlags.disableLegacyContext;
  wwwFlags.disableJavaScriptURLs = defaultFlags.disableJavaScriptURLs;

  return wwwFlags;
=======
  const actual = jest.requireActual('shared/forks/ReactFeatureFlags.www');

  // This flag is only used by tests, it should never be set elsewhere.
  actual.forceConcurrentByDefaultForTesting = !__VARIANT__;

  return actual;
>>>>>>> remotes/upstream/main
});

jest.mock('scheduler/src/SchedulerFeatureFlags', () => {
  const schedulerSrcPath = process.cwd() + '/packages/scheduler';
  jest.mock(
    'SchedulerFeatureFlags',
    () =>
      jest.requireActual(
        schedulerSrcPath + '/src/forks/SchedulerFeatureFlags.www-dynamic'
      ),
    {virtual: true}
  );
<<<<<<< HEAD
  return jest.requireActual(
    schedulerSrcPath + '/src/forks/SchedulerFeatureFlags.www'
  );
=======
  const actual = jest.requireActual(
    schedulerSrcPath + '/src/forks/SchedulerFeatureFlags.www'
  );

  // These flags are not a dynamic on www, but we still want to run
  // tests in both versions.
  actual.enableIsInputPending = __VARIANT__;
  actual.enableIsInputPendingContinuous = __VARIANT__;
  actual.enableProfiling = __VARIANT__;
  actual.enableSchedulerDebugging = __VARIANT__;

  return actual;
>>>>>>> remotes/upstream/main
});

global.__WWW__ = true;

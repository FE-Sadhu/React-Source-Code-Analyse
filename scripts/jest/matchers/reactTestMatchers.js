'use strict';

const JestReact = require('jest-react');
<<<<<<< HEAD
const SchedulerMatchers = require('./schedulerTestMatchers');
=======

// TODO: Move to ReactInternalTestUtils
>>>>>>> remotes/upstream/main

function captureAssertion(fn) {
  // Trick to use a Jest matcher inside another Jest matcher. `fn` contains an
  // assertion; if it throws, we capture the error and return it, so the stack
  // trace presented to the user points to the original assertion in the
  // test file.
  try {
    fn();
  } catch (error) {
    return {
      pass: false,
      message: () => error.message,
    };
  }
  return {pass: true};
}

<<<<<<< HEAD
function assertYieldsWereCleared(Scheduler) {
  const actualYields = Scheduler.unstable_clearYields();
  if (actualYields.length !== 0) {
    throw new Error(
      'Log of yielded values is not empty. ' +
        'Call expect(Scheduler).toHaveYielded(...) first.'
    );
=======
function assertYieldsWereCleared(Scheduler, caller) {
  const actualYields = Scheduler.unstable_clearLog();
  if (actualYields.length !== 0) {
    const error = Error(
      'The event log is not empty. Call assertLog(...) first.'
    );
    Error.captureStackTrace(error, caller);
    throw error;
>>>>>>> remotes/upstream/main
  }
}

function toMatchRenderedOutput(ReactNoop, expectedJSX) {
  if (typeof ReactNoop.getChildrenAsJSX === 'function') {
    const Scheduler = ReactNoop._Scheduler;
<<<<<<< HEAD
    assertYieldsWereCleared(Scheduler);
=======
    assertYieldsWereCleared(Scheduler, toMatchRenderedOutput);
>>>>>>> remotes/upstream/main
    return captureAssertion(() => {
      expect(ReactNoop.getChildrenAsJSX()).toEqual(expectedJSX);
    });
  }
  return JestReact.unstable_toMatchRenderedOutput(ReactNoop, expectedJSX);
}

module.exports = {
<<<<<<< HEAD
  ...SchedulerMatchers,
=======
>>>>>>> remotes/upstream/main
  toMatchRenderedOutput,
};

/*!
<<<<<<< HEAD
 * Copyright (c) Facebook, Inc. and its affiliates.
=======
 * Copyright (c) Meta Platforms, Inc. and affiliates.
>>>>>>> remotes/upstream/main
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

<<<<<<< HEAD
const expect = global.expect;

let numExpectations = 0;

global.expect = function() {
  numExpectations += 1;
  return expect.apply(this, arguments);
};

const spyOn = global.spyOn;
=======
const spyOn = jest.spyOn;
>>>>>>> remotes/upstream/main

// Spying on console methods in production builds can mask errors.
// This is why we added an explicit spyOnDev() helper.
// It's too easy to accidentally use the more familiar spyOn() helper though,
// So we disable it entirely.
// Spying on both dev and prod will require using both spyOnDev() and spyOnProd().
<<<<<<< HEAD
global.spyOn = function() {
=======
global.spyOn = function () {
>>>>>>> remotes/upstream/main
  throw new Error(
    'Do not use spyOn(). ' +
      'It can accidentally hide unexpected errors in production builds. ' +
      'Use spyOnDev(), spyOnProd(), or spyOnDevAndProd() instead.'
  );
};

<<<<<<< HEAD
global.spyOnDev = function(...args) {
=======
global.spyOnDev = function (...args) {
>>>>>>> remotes/upstream/main
  if (__DEV__) {
    return spyOn(...args);
  }
};

global.spyOnDevAndProd = spyOn;

<<<<<<< HEAD
global.spyOnProd = function(...args) {
=======
global.spyOnProd = function (...args) {
>>>>>>> remotes/upstream/main
  if (!__DEV__) {
    return spyOn(...args);
  }
};

expect.extend({
  ...require('../matchers/reactTestMatchers'),
  ...require('../matchers/toThrow'),
  ...require('../matchers/toWarnDev'),
});
<<<<<<< HEAD

beforeEach(() => (numExpectations = 0));

jasmine.currentEnv_.addReporter({
  specDone: spec => {
    console.log(
      `EQUIVALENCE: ${spec.description}, ` +
        `status: ${spec.status}, ` +
        `numExpectations: ${numExpectations}`
    );
  },
});
=======
>>>>>>> remotes/upstream/main

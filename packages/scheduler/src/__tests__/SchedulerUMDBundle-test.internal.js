/**
<<<<<<< HEAD
 * Copyright (c) Facebook, Inc. and its affiliates.
=======
 * Copyright (c) Meta Platforms, Inc. and affiliates.
>>>>>>> remotes/upstream/main
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */
'use strict';

class MockMessageChannel {
  constructor() {
    this.port1 = jest.fn();
    this.port2 = jest.fn();
  }
}

describe('Scheduling UMD bundle', () => {
  beforeEach(() => {
    // Fool SECRET_INTERNALS object into including UMD forwarding methods.
    global.__UMD__ = true;

    jest.resetModules();
    jest.unmock('scheduler');

    global.MessageChannel = MockMessageChannel;
  });

  afterEach(() => {
    global.MessageChannel = undefined;
  });

  function validateForwardedAPIs(api, forwardedAPIs) {
    const apiKeys = Object.keys(api).sort();
    forwardedAPIs.forEach(forwardedAPI => {
      expect(Object.keys(forwardedAPI).sort()).toEqual(apiKeys);
    });
  }

  it('should define the same scheduling API', () => {
    const api = require('../../index');
    const umdAPIDev = require('../../npm/umd/scheduler.development');
    const umdAPIProd = require('../../npm/umd/scheduler.production.min');
    const umdAPIProfiling = require('../../npm/umd/scheduler.profiling.min');
<<<<<<< HEAD
    const secretAPI = require('react/src/forks/ReactSharedInternals.umd')
      .default;
=======
    const secretAPI =
      require('react/src/forks/ReactSharedInternals.umd').default;
>>>>>>> remotes/upstream/main
    validateForwardedAPIs(api, [
      umdAPIDev,
      umdAPIProd,
      umdAPIProfiling,
      secretAPI.Scheduler,
    ]);
  });
});

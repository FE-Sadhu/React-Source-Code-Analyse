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
 * @emails react-core
 */

'use strict';

let ReactDOM;
let React;
let ReactCache;
let ReactTestRenderer;
<<<<<<< HEAD
let Scheduler;
=======
let waitForAll;
>>>>>>> remotes/upstream/main

describe('ReactTestRenderer', () => {
  beforeEach(() => {
    jest.resetModules();
    ReactDOM = require('react-dom');

    // Isolate test renderer.
    jest.resetModules();
    React = require('react');
    ReactCache = require('react-cache');
    ReactTestRenderer = require('react-test-renderer');
<<<<<<< HEAD
    Scheduler = require('scheduler');
=======
    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
>>>>>>> remotes/upstream/main
  });

  it('should warn if used to render a ReactDOM portal', () => {
    const container = document.createElement('div');
    expect(() => {
<<<<<<< HEAD
      expect(() => {
        ReactTestRenderer.create(ReactDOM.createPortal('foo', container));
      }).toThrow();
=======
      let error;
      try {
        ReactTestRenderer.create(ReactDOM.createPortal('foo', container));
      } catch (e) {
        error = e;
      }
      // After the update throws, a subsequent render is scheduled to
      // unmount the whole tree. This update also causes an error, so React
      // throws an AggregateError.
      const errors = error.errors;
      expect(errors.length).toBe(2);
      expect(errors[0].message.includes('indexOf is not a function')).toBe(
        true,
      );
      expect(errors[1].message.includes('indexOf is not a function')).toBe(
        true,
      );
>>>>>>> remotes/upstream/main
    }).toErrorDev('An invalid container has been provided.', {
      withoutStack: true,
    });
  });

  describe('timed out Suspense hidden subtrees should not be observable via toJSON', () => {
    let AsyncText;
    let PendingResources;
    let TextResource;

    beforeEach(() => {
      PendingResources = {};
      TextResource = ReactCache.unstable_createResource(
        text =>
          new Promise(resolve => {
            PendingResources[text] = resolve;
          }),
        text => text,
      );

      AsyncText = ({text}) => {
        const value = TextResource.read(text);
        return value;
      };
    });

    it('for root Suspense components', async () => {
      const App = ({text}) => {
        return (
          <React.Suspense fallback="fallback">
            <AsyncText text={text} />
          </React.Suspense>
        );
      };

      const root = ReactTestRenderer.create(<App text="initial" />);
      PendingResources.initial('initial');
<<<<<<< HEAD
      await Promise.resolve();
      Scheduler.unstable_flushAll();
=======
      await waitForAll([]);
>>>>>>> remotes/upstream/main
      expect(root.toJSON()).toEqual('initial');

      root.update(<App text="dynamic" />);
      expect(root.toJSON()).toEqual('fallback');

      PendingResources.dynamic('dynamic');
<<<<<<< HEAD
      await Promise.resolve();
      Scheduler.unstable_flushAll();
=======
      await waitForAll([]);
>>>>>>> remotes/upstream/main
      expect(root.toJSON()).toEqual('dynamic');
    });

    it('for nested Suspense components', async () => {
      const App = ({text}) => {
        return (
          <div>
            <React.Suspense fallback="fallback">
              <AsyncText text={text} />
            </React.Suspense>
          </div>
        );
      };

      const root = ReactTestRenderer.create(<App text="initial" />);
      PendingResources.initial('initial');
<<<<<<< HEAD
      await Promise.resolve();
      Scheduler.unstable_flushAll();
=======
      await waitForAll([]);
>>>>>>> remotes/upstream/main
      expect(root.toJSON().children).toEqual(['initial']);

      root.update(<App text="dynamic" />);
      expect(root.toJSON().children).toEqual(['fallback']);

      PendingResources.dynamic('dynamic');
<<<<<<< HEAD
      await Promise.resolve();
      Scheduler.unstable_flushAll();
=======
      await waitForAll([]);
>>>>>>> remotes/upstream/main
      expect(root.toJSON().children).toEqual(['dynamic']);
    });
  });
});

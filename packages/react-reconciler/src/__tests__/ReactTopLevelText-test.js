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
 * @jest-environment node
 */

'use strict';

let React;
let ReactNoop;
<<<<<<< HEAD
let Scheduler;
=======
let waitForAll;
>>>>>>> remotes/upstream/main

// This is a new feature in Fiber so I put it in its own test file. It could
// probably move to one of the other test files once it is official.
describe('ReactTopLevelText', () => {
  beforeEach(() => {
    jest.resetModules();
    React = require('react');
    ReactNoop = require('react-noop-renderer');
<<<<<<< HEAD
    Scheduler = require('scheduler');
  });

  it('should render a component returning strings directly from render', () => {
    const Text = ({value}) => value;
    ReactNoop.render(<Text value="foo" />);
    expect(Scheduler).toFlushWithoutYielding();
    expect(ReactNoop).toMatchRenderedOutput('foo');
  });

  it('should render a component returning numbers directly from render', () => {
    const Text = ({value}) => value;
    ReactNoop.render(<Text value={10} />);
    expect(Scheduler).toFlushWithoutYielding();
=======

    const InternalTestUtils = require('internal-test-utils');
    waitForAll = InternalTestUtils.waitForAll;
  });

  it('should render a component returning strings directly from render', async () => {
    const Text = ({value}) => value;
    ReactNoop.render(<Text value="foo" />);
    await waitForAll([]);
    expect(ReactNoop).toMatchRenderedOutput('foo');
  });

  it('should render a component returning numbers directly from render', async () => {
    const Text = ({value}) => value;
    ReactNoop.render(<Text value={10} />);
    await waitForAll([]);
>>>>>>> remotes/upstream/main
    expect(ReactNoop).toMatchRenderedOutput('10');
  });
});

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
<<<<<<< HEAD
=======
 * @jest-environment ./scripts/jest/ReactDOMServerIntegrationEnvironment
>>>>>>> remotes/upstream/main
 */

'use strict';

const ReactDOMServerIntegrationUtils = require('./utils/ReactDOMServerIntegrationTestUtils');

let React;
let ReactDOM;
let ReactDOMServer;
let ReactTestUtils;

function initModules() {
  // Reset warning cache.
<<<<<<< HEAD
  jest.resetModuleRegistry();
=======
  jest.resetModules();
>>>>>>> remotes/upstream/main
  React = require('react');
  ReactDOM = require('react-dom');
  ReactDOMServer = require('react-dom/server');
  ReactTestUtils = require('react-dom/test-utils');

  // Make them available to the helpers.
  return {
    ReactDOM,
    ReactDOMServer,
    ReactTestUtils,
  };
}

const {resetModules, itRenders} = ReactDOMServerIntegrationUtils(initModules);

describe('ReactDOMServerIntegrationProgress', () => {
  beforeEach(() => {
    resetModules();
  });

  itRenders('a progress in an indeterminate state', async render => {
    // Regression test for https://github.com/facebook/react/issues/6119
    const e = await render(<progress value={null} />);
    expect(e.hasAttribute('value')).toBe(false);
    const e2 = await render(<progress value={50} />);
    expect(e2.getAttribute('value')).toBe('50');
  });
});

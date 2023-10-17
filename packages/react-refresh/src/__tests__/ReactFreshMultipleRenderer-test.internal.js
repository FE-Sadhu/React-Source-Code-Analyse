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

jest.resetModules();
const React = require('react');
let ReactFreshRuntime;
if (__DEV__) {
  ReactFreshRuntime = require('react-refresh/runtime');
  ReactFreshRuntime.injectIntoGlobalHook(global);
}
const ReactDOM = require('react-dom');

jest.resetModules();
const ReactART = require('react-art');
const ARTSVGMode = require('art/modes/svg');
const ARTCurrentMode = require('art/modes/current');
ARTCurrentMode.setCurrent(ARTSVGMode);

describe('ReactFresh', () => {
  let container;

  beforeEach(() => {
    if (__DEV__) {
      container = document.createElement('div');
      document.body.appendChild(container);
    }
  });

  afterEach(() => {
    if (__DEV__) {
      document.body.removeChild(container);
      container = null;
    }
  });

  it('can update components managed by different renderers independently', () => {
    if (__DEV__) {
<<<<<<< HEAD
      const InnerV1 = function() {
=======
      const InnerV1 = function () {
>>>>>>> remotes/upstream/main
        return <ReactART.Shape fill="blue" />;
      };
      ReactFreshRuntime.register(InnerV1, 'Inner');

<<<<<<< HEAD
      const OuterV1 = function() {
=======
      const OuterV1 = function () {
>>>>>>> remotes/upstream/main
        return (
          <div style={{color: 'blue'}}>
            <ReactART.Surface>
              <InnerV1 />
            </ReactART.Surface>
          </div>
        );
      };
      ReactFreshRuntime.register(OuterV1, 'Outer');

      ReactDOM.render(<OuterV1 />, container);
      const el = container.firstChild;
      const pathEl = el.querySelector('path');
      expect(el.style.color).toBe('blue');
      expect(pathEl.getAttributeNS(null, 'fill')).toBe('rgb(0, 0, 255)');

      // Perform a hot update to the ART-rendered component.
<<<<<<< HEAD
      const InnerV2 = function() {
=======
      const InnerV2 = function () {
>>>>>>> remotes/upstream/main
        return <ReactART.Shape fill="red" />;
      };
      ReactFreshRuntime.register(InnerV2, 'Inner');

      ReactFreshRuntime.performReactRefresh();
      expect(container.firstChild).toBe(el);
      expect(el.querySelector('path')).toBe(pathEl);
      expect(el.style.color).toBe('blue');
      expect(pathEl.getAttributeNS(null, 'fill')).toBe('rgb(255, 0, 0)');

      // Perform a hot update to the DOM-rendered component.
<<<<<<< HEAD
      const OuterV2 = function() {
=======
      const OuterV2 = function () {
>>>>>>> remotes/upstream/main
        return (
          <div style={{color: 'red'}}>
            <ReactART.Surface>
              <InnerV1 />
            </ReactART.Surface>
          </div>
        );
      };
      ReactFreshRuntime.register(OuterV2, 'Outer');

      ReactFreshRuntime.performReactRefresh();
      expect(el.style.color).toBe('red');
      expect(container.firstChild).toBe(el);
      expect(el.querySelector('path')).toBe(pathEl);
      expect(pathEl.getAttributeNS(null, 'fill')).toBe('rgb(255, 0, 0)');
    }
  });
});

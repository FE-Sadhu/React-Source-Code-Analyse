/** @flow */

// This test harness mounts each test app as a separate root to test multi-root applications.

import {createElement} from 'react';
import {createRoot} from 'react-dom/client';
import {render, unmountComponentAtNode} from 'react-dom';
import DeeplyNestedComponents from './DeeplyNestedComponents';
import Iframe from './Iframe';
import EditableProps from './EditableProps';
import ElementTypes from './ElementTypes';
import Hydration from './Hydration';
import InspectableElements from './InspectableElements';
import ReactNativeWeb from './ReactNativeWeb';
import ToDoList from './ToDoList';
import Toggle from './Toggle';
import ErrorBoundaries from './ErrorBoundaries';
import PartiallyStrictApp from './PartiallyStrictApp';
import SuspenseTree from './SuspenseTree';
import {ignoreErrors, ignoreLogs, ignoreWarnings} from './console';

import './styles.css';

// DevTools intentionally tests compatibility with certain legacy APIs.
// Suppress their error messages in the local dev shell,
// because they might mask other more serious error messages.
ignoreErrors([
  'Warning: Legacy context API',
  'Warning: Unsafe lifecycle methods',
  'Warning: %s is deprecated in StrictMode.', // findDOMNode
  'Warning: ReactDOM.render is no longer supported in React 18',
]);
ignoreWarnings(['Warning: componentWillReceiveProps has been renamed']);
ignoreLogs([]);

<<<<<<< HEAD
const unmountFunctions = [];
=======
const unmountFunctions: Array<() => void | boolean> = [];
>>>>>>> remotes/upstream/main

function createContainer() {
  const container = document.createElement('div');

  ((document.body: any): HTMLBodyElement).appendChild(container);

  return container;
}

<<<<<<< HEAD
function mountApp(App) {
=======
function mountApp(App: () => React$Node) {
>>>>>>> remotes/upstream/main
  const container = createContainer();

  const root = createRoot(container);
  root.render(createElement(App));

  unmountFunctions.push(() => root.unmount());
}

<<<<<<< HEAD
=======
// $FlowFixMe[missing-local-annot]
>>>>>>> remotes/upstream/main
function mountStrictApp(App) {
  function StrictRoot() {
    return createElement(App);
  }

  const container = createContainer();

  const root = createRoot(container, {unstable_strictMode: true});
  root.render(createElement(StrictRoot));

  unmountFunctions.push(() => root.unmount());
}

<<<<<<< HEAD
function mountLegacyApp(App) {
=======
function mountLegacyApp(App: () => React$Node) {
>>>>>>> remotes/upstream/main
  function LegacyRender() {
    return createElement(App);
  }

  const container = createContainer();

  render(createElement(LegacyRender), container);

  unmountFunctions.push(() => unmountComponentAtNode(container));
}

function mountTestApp() {
  mountStrictApp(ToDoList);
  mountApp(InspectableElements);
  mountApp(Hydration);
  mountApp(ElementTypes);
  mountApp(EditableProps);
  mountApp(ReactNativeWeb);
  mountApp(Toggle);
  mountApp(ErrorBoundaries);
  mountApp(SuspenseTree);
  mountApp(DeeplyNestedComponents);
  mountApp(Iframe);
  mountLegacyApp(PartiallyStrictApp);
}

function unmountTestApp() {
  unmountFunctions.forEach(fn => fn());
}

mountTestApp();

window.parent.mountTestApp = mountTestApp;
window.parent.unmountTestApp = unmountTestApp;

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow
 */

import Agent from './agent';

import {attach} from './renderer';
import {attach as attachLegacy} from './legacy/renderer';
import {hasAssignedBackend} from './utils';

import type {DevToolsHook, ReactRenderer, RendererInterface} from './types';

// this is the backend that is compatible with all older React versions
function isMatchingRender(version: string): boolean {
  return !hasAssignedBackend(version);
}

export type InitBackend = typeof initBackend;

export function initBackend(
  hook: DevToolsHook,
  agent: Agent,
  global: Object,
): () => void {
  if (hook == null) {
    // DevTools didn't get injected into this page (maybe b'c of the contentType).
    return () => {};
  }
  const subs = [
    hook.sub(
      'renderer-attached',
      ({
        id,
        renderer,
        rendererInterface,
      }: {
        id: number,
        renderer: ReactRenderer,
        rendererInterface: RendererInterface,
        ...
      }) => {
        agent.setRendererInterface(id, rendererInterface);

        // Now that the Store and the renderer interface are connected,
        // it's time to flush the pending operation codes to the frontend.
        rendererInterface.flushInitialOperations();
      },
    ),

    hook.sub('unsupported-renderer-version', (id: number) => {
      agent.onUnsupportedRenderer(id);
    }),

    hook.sub('fastRefreshScheduled', agent.onFastRefreshScheduled),
    hook.sub('operations', agent.onHookOperations),
    hook.sub('traceUpdates', agent.onTraceUpdates),

    // TODO Add additional subscriptions required for profiling mode
  ];

  const attachRenderer = (id: number, renderer: ReactRenderer) => {
    // only attach if the renderer is compatible with the current version of the backend
    if (!isMatchingRender(renderer.reconcilerVersion || renderer.version)) {
      return;
    }
    let rendererInterface = hook.rendererInterfaces.get(id);

    // Inject any not-yet-injected renderers (if we didn't reload-and-profile)
    if (rendererInterface == null) {
      if (typeof renderer.findFiberByHostInstance === 'function') {
        // react-reconciler v16+
        rendererInterface = attach(hook, id, renderer, global);
      } else if (renderer.ComponentTree) {
        // react-dom v15
        rendererInterface = attachLegacy(hook, id, renderer, global);
      } else {
        // Older react-dom or other unsupported renderer version
      }

      if (rendererInterface != null) {
        hook.rendererInterfaces.set(id, rendererInterface);
      }
    }

    // Notify the DevTools frontend about new renderers.
    // This includes any that were attached early (via __REACT_DEVTOOLS_ATTACH__).
    if (rendererInterface != null) {
      hook.emit('renderer-attached', {
        id,
        renderer,
        rendererInterface,
      });
    } else {
      hook.emit('unsupported-renderer-version', id);
    }
  };

  // Connect renderers that have already injected themselves.
  hook.renderers.forEach((renderer, id) => {
    attachRenderer(id, renderer);
  });

  // Connect any new renderers that injected themselves.
  subs.push(
    hook.sub(
      'renderer',
      ({id, renderer}: {id: number, renderer: ReactRenderer, ...}) => {
        attachRenderer(id, renderer);
      },
    ),
  );

  hook.emit('react-devtools', agent);
  hook.reactDevtoolsAgent = agent;
  const onAgentShutdown = () => {
    subs.forEach(fn => fn());
    hook.rendererInterfaces.forEach(rendererInterface => {
      rendererInterface.cleanup();
    });
    hook.reactDevtoolsAgent = null;
  };
  agent.addListener('shutdown', onAgentShutdown);
  subs.push(() => {
    agent.removeListener('shutdown', onAgentShutdown);
  });

  return () => {
    subs.forEach(fn => fn());
  };
}

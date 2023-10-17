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
 * @flow
 */

<<<<<<< HEAD
=======
import type {ReactContext} from 'shared/ReactTypes';

>>>>>>> remotes/upstream/main
import type {Thenable} from 'shared/ReactTypes';

import {createContext} from 'react';
import typeof * as ParseHookNamesModule from 'react-devtools-shared/src/hooks/parseHookNames';

<<<<<<< HEAD
export type HookNamesModuleLoaderFunction = () => Thenable<ParseHookNamesModule>;
export type Context = HookNamesModuleLoaderFunction | null;

// TODO (Webpack 5) Hopefully we can remove this context entirely once the Webpack 5 upgrade is completed.
const HookNamesModuleLoaderContext = createContext<Context>(null);
=======
export type HookNamesModuleLoaderFunction =
  () => Thenable<ParseHookNamesModule>;
export type Context = HookNamesModuleLoaderFunction | null;

// TODO (Webpack 5) Hopefully we can remove this context entirely once the Webpack 5 upgrade is completed.
const HookNamesModuleLoaderContext: ReactContext<Context> =
  createContext<Context>(null);
>>>>>>> remotes/upstream/main
HookNamesModuleLoaderContext.displayName = 'HookNamesModuleLoaderContext';

export default HookNamesModuleLoaderContext;

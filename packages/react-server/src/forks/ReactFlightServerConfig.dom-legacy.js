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
export * from '../ReactFlightServerConfigStream';
export * from 'react-server-dom-webpack/src/ReactFlightServerWebpackBundlerConfig';
=======
import type {Request} from 'react-server/src/ReactFlightServer';

export * from '../ReactFlightServerConfigBundlerCustom';
export * from 'react-dom-bindings/src/server/ReactFlightServerConfigDOM';

export const supportsRequestStorage = false;
export const requestStorage: AsyncLocalStorage<Request> = (null: any);
>>>>>>> remotes/upstream/main

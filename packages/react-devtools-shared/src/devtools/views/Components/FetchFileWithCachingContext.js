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
import {createContext} from 'react';

export type FetchFileWithCaching = (url: string) => Promise<string>;
export type Context = FetchFileWithCaching | null;

<<<<<<< HEAD
const FetchFileWithCachingContext = createContext<Context>(null);
=======
const FetchFileWithCachingContext: ReactContext<Context> =
  createContext<Context>(null);
>>>>>>> remotes/upstream/main
FetchFileWithCachingContext.displayName = 'FetchFileWithCachingContext';

export default FetchFileWithCachingContext;

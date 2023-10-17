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
import {createContext} from 'react';

const TreeFocusedContext = createContext<boolean>(false);
=======
import type {ReactContext} from 'shared/ReactTypes';

import {createContext} from 'react';

const TreeFocusedContext: ReactContext<boolean> = createContext<boolean>(false);
>>>>>>> remotes/upstream/main

export default TreeFocusedContext;

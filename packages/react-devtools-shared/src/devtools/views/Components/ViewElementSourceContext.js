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

import type {
  CanViewElementSource,
  ViewElementSource,
} from 'react-devtools-shared/src/devtools/views/DevTools';

export type Context = {
  canViewElementSourceFunction: CanViewElementSource | null,
  viewElementSourceFunction: ViewElementSource | null,
};

<<<<<<< HEAD
const ViewElementSourceContext = createContext<Context>(((null: any): Context));
=======
const ViewElementSourceContext: ReactContext<Context> = createContext<Context>(
  ((null: any): Context),
);
>>>>>>> remotes/upstream/main
ViewElementSourceContext.displayName = 'ViewElementSourceContext';

export default ViewElementSourceContext;

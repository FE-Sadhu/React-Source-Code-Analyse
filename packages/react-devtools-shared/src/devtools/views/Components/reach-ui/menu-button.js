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

import * as React from 'react';
import {
  Menu,
  MenuList as ReachMenuList,
  MenuButton,
  MenuItem,
} from '@reach/menu-button';
import useThemeStyles from '../../useThemeStyles';

const MenuList = ({
  children,
  ...props
}: {
  children: React$Node,
  ...
}): React.Node => {
  const style = useThemeStyles();
  return (
<<<<<<< HEAD
    // $FlowFixMe unsafe spread
=======
    // $FlowFixMe[cannot-spread-inexact] unsafe spread
>>>>>>> remotes/upstream/main
    <ReachMenuList style={style} {...props}>
      {children}
    </ReachMenuList>
  );
};

export {MenuItem, MenuButton, MenuList, Menu};

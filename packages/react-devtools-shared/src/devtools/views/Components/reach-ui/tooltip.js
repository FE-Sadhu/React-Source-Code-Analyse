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
import ReachTooltip from '@reach/tooltip';
import tooltipStyles from './Tooltip.css';
import useThemeStyles from '../../useThemeStyles';

const Tooltip = ({
  children,
  className = '',
  ...props
}: {
  children: React$Node,
  className: string,
  ...
}): React.Node => {
  const style = useThemeStyles();
  return (
<<<<<<< HEAD
    // $FlowFixMe unsafe spread
=======
    // $FlowFixMe[cannot-spread-inexact] unsafe spread
>>>>>>> remotes/upstream/main
    <ReachTooltip
      className={`${tooltipStyles.Tooltip} ${className}`}
      style={style}
      {...props}>
      {children}
    </ReachTooltip>
  );
};

export default Tooltip;

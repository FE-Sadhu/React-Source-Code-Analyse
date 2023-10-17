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
import Button from '../Button';
import ButtonIcon from '../ButtonIcon';

import styles from './ExpandCollapseToggle.css';

type ExpandCollapseToggleProps = {
  disabled: boolean,
  isOpen: boolean,
  setIsOpen: Function,
};

export default function ExpandCollapseToggle({
  disabled,
  isOpen,
  setIsOpen,
<<<<<<< HEAD
}: ExpandCollapseToggleProps) {
=======
}: ExpandCollapseToggleProps): React.Node {
>>>>>>> remotes/upstream/main
  return (
    <Button
      className={styles.ExpandCollapseToggle}
      disabled={disabled}
      onClick={() => setIsOpen(prevIsOpen => !prevIsOpen)}
      title={`${isOpen ? 'Collapse' : 'Expand'} prop value`}>
      <ButtonIcon type={isOpen ? 'expanded' : 'collapsed'} />
    </Button>
  );
}

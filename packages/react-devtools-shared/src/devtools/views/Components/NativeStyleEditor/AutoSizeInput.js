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
import styles from './AutoSizeInput.css';

type Props = {
  className?: string,
  onFocus?: (event: FocusEvent) => void,
  placeholder?: string,
  testName?: ?string,
  value: any,
  ...
};

export default function AutoSizeInput({
  className,
  onFocus,
  placeholder = '',
  testName,
  value,
  ...rest
}: Props): React.Node {
<<<<<<< HEAD
=======
  // $FlowFixMe[missing-local-annot]
>>>>>>> remotes/upstream/main
  const onFocusWrapper = event => {
    const input = event.target;
    if (input !== null) {
      input.selectionStart = 0;
      input.selectionEnd = value.length;
    }

    if (typeof onFocus === 'function') {
      onFocus(event);
    }
  };

  const isEmpty = value === '' || value === '""';

  return (
<<<<<<< HEAD
    // $FlowFixMe unsafe rest spread
=======
    // $FlowFixMe[cannot-spread-inexact] unsafe rest spread
>>>>>>> remotes/upstream/main
    <input
      className={[styles.Input, className].join(' ')}
      data-testname={testName}
      onFocus={onFocusWrapper}
      placeholder={placeholder}
      style={{
        width: `calc(${isEmpty ? placeholder.length : value.length}ch + 1px)`,
      }}
      value={isEmpty ? '' : value}
      {...rest}
    />
  );
}

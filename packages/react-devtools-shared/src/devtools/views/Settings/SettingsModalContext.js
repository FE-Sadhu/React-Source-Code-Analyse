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
import * as React from 'react';
import {createContext, useMemo, useState} from 'react';

export type DisplayDensity = 'comfortable' | 'compact';
export type Theme = 'auto' | 'light' | 'dark';

type Context = {
  isModalShowing: boolean,
  setIsModalShowing: (value: boolean) => void,
  ...
};

<<<<<<< HEAD
const SettingsModalContext = createContext<Context>(((null: any): Context));
SettingsModalContext.displayName = 'SettingsModalContext';

function SettingsModalContextController({children}: {children: React$Node}) {
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);

  const value = useMemo(() => ({isModalShowing, setIsModalShowing}), [
    isModalShowing,
    setIsModalShowing,
  ]);
=======
const SettingsModalContext: ReactContext<Context> = createContext<Context>(
  ((null: any): Context),
);
SettingsModalContext.displayName = 'SettingsModalContext';

function SettingsModalContextController({
  children,
}: {
  children: React$Node,
}): React.Node {
  const [isModalShowing, setIsModalShowing] = useState<boolean>(false);

  const value = useMemo(
    () => ({isModalShowing, setIsModalShowing}),
    [isModalShowing, setIsModalShowing],
  );
>>>>>>> remotes/upstream/main

  return (
    <SettingsModalContext.Provider value={value}>
      {children}
    </SettingsModalContext.Provider>
  );
}

export {SettingsModalContext, SettingsModalContextController};

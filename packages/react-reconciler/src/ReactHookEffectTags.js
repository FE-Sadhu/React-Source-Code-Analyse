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

export type HookFlags = number;

<<<<<<< HEAD
export const NoFlags = /*   */ 0b00000;

// Represents whether effect should fire.
export const HasEffect = /* */ 0b00001;

// Represents the phase in which the effect (not the clean-up) fires.
export const Snapshot = /*  */ 0b00010;
export const Insertion = /* */ 0b00100;
export const Layout = /*    */ 0b01000;
export const Passive = /*   */ 0b10000;
=======
export const NoFlags = /*   */ 0b0000;

// Represents whether effect should fire.
export const HasEffect = /* */ 0b0001;

// Represents the phase in which the effect (not the clean-up) fires.
export const Insertion = /* */ 0b0010;
export const Layout = /*    */ 0b0100;
export const Passive = /*   */ 0b1000;
>>>>>>> remotes/upstream/main

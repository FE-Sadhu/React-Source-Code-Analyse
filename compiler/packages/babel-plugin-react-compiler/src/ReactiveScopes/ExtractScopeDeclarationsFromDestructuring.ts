/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  Destructure,
  Environment,
  IdentifierId,
  InstructionKind,
  Place,
  ReactiveFunction,
  ReactiveInstruction,
  ReactiveScopeBlock,
  ReactiveStatement,
  promoteTemporary,
} from "../HIR";
import { eachPatternOperand, mapPatternOperands } from "../HIR/visitors";
import {
  ReactiveFunctionTransform,
  Transformed,
  visitReactiveFunction,
} from "./visitors";

/*
 * Destructuring statements may sometimes define some variables which are declared by the scope,
 * and others that are only used locally within the scope, for example:
 *
 * ```
 * const {x, ...rest} = value;
 * return rest;
 * ```
 *
 * Here the scope structure turns into:
 *
 * ```
 * let c_0 = $[0] !== value;
 * let rest;
 * if (c_0) {
 *    // OOPS! we want to reassign `rest` here, but
 *    // `x` isn't declared anywhere!
 *    {x, ...rest} = value;
 *    $[0] = value;
 *    $[1] = rest;
 * } else {
 *    rest = $[1];
 * }
 * return rest;
 * ```
 *
 * Note that because `rest` is declared by the scope, we can't redeclare it in the
 * destructuring statement. But we have to declare `x`!
 *
 * This pass finds destructuring instructions that contain mixed values such as this,
 * and rewrites them to ensure that any scope variable assignments are extracted first
 * to a temporary and reassigned in a separate instruction. For example, the output
 * for the above would be along the lines of:
 *
 * ```
 * let c_0 = $[0] !== value;
 * let rest;
 * if (c_0) {
 *    const {x, ...t0} = value; <-- replace `rest` with a temporary
 *    rest = t0; // <-- and create a separate instruction to assign that to `rest`
 *    $[0] = value;
 *    $[1] = rest;
 * } else {
 *    rest = $[1];
 * }
 * return rest;
 * ```
 *
 */
export function extractScopeDeclarationsFromDestructuring(
  fn: ReactiveFunction
): void {
  const state = new State(fn.env);
  visitReactiveFunction(fn, new Visitor(), state);
}

class State {
  env: Environment;
  declared: Set<IdentifierId> = new Set();

  constructor(env: Environment) {
    this.env = env;
  }
}

class Visitor extends ReactiveFunctionTransform<State> {
  override visitScope(scope: ReactiveScopeBlock, state: State): void {
    for (const [, declaration] of scope.scope.declarations) {
      state.declared.add(declaration.identifier.id);
    }
    this.traverseScope(scope, state);
  }

  override transformInstruction(
    instruction: ReactiveInstruction,
    state: State
  ): Transformed<ReactiveStatement> {
    this.visitInstruction(instruction, state);

    if (instruction.value.kind === "Destructure") {
      const transformed = transformDestructuring(
        state,
        instruction,
        instruction.value
      );
      if (transformed) {
        return {
          kind: "replace-many",
          value: transformed.map((instruction) => ({
            kind: "instruction",
            instruction,
          })),
        };
      }
    }
    return { kind: "keep" };
  }
}

function transformDestructuring(
  state: State,
  instr: ReactiveInstruction,
  destructure: Destructure
): null | Array<ReactiveInstruction> {
  let reassigned: Set<IdentifierId> = new Set();
  let hasDeclaration = false;
  for (const place of eachPatternOperand(destructure.lvalue.pattern)) {
    const isDeclared = state.declared.has(place.identifier.id);
    if (isDeclared) {
      reassigned.add(place.identifier.id);
    }
    hasDeclaration ||= !isDeclared;
  }
  if (reassigned.size === 0 || !hasDeclaration) {
    return null;
  }
  /*
   * Else it's a mix, replace the reassigned items in the destructuring with temporary
   * variables and emit separate assignment statements for them
   */
  const instructions: Array<ReactiveInstruction> = [];
  const renamed: Map<Place, Place> = new Map();
  mapPatternOperands(destructure.lvalue.pattern, (place) => {
    if (!reassigned.has(place.identifier.id)) {
      return place;
    }
    const tempId = state.env.nextIdentifierId;
    const temporary = {
      ...place,
      identifier: {
        ...place.identifier,
        id: tempId,
        name: null, // overwritten below
      },
    };
    promoteTemporary(temporary.identifier);
    renamed.set(place, temporary);
    return temporary;
  });
  instructions.push(instr);
  for (const [original, temporary] of renamed) {
    instructions.push({
      id: instr.id,
      lvalue: null,
      value: {
        kind: "StoreLocal",
        lvalue: {
          kind: InstructionKind.Reassign,
          place: original,
        },
        value: temporary,
        type: null,
        loc: destructure.loc,
      },
      loc: instr.loc,
    });
  }
  return instructions;
}

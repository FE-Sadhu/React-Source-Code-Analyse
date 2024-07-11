/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type * as BabelCore from "@babel/core";
import { compileProgram, parsePluginOptions } from "../Entrypoint";
import {
  injectReanimatedFlag,
  pipelineUsesReanimatedPlugin,
} from "../Entrypoint/Reanimated";

/*
 * The React Forget Babel Plugin
 * @param {*} _babel
 * @returns
 */
export default function BabelPluginReactCompiler(
  _babel: typeof BabelCore
): BabelCore.PluginObj {
  return {
    name: "react-forget",
    visitor: {
      /*
       * Note: Babel does some "smart" merging of visitors across plugins, so even if A is inserted
       * prior to B, if A does not have a Program visitor and B does, B will run first. We always
       * want Forget to run true to source as possible.
       */
      Program(prog, pass): void {
        let opts = parsePluginOptions(pass.opts);
        const isDev =
          (typeof __DEV__ !== "undefined" && __DEV__ === true) ||
          process.env["NODE_ENV"] === "development";
        if (
          opts.enableReanimatedCheck === true &&
          pipelineUsesReanimatedPlugin(pass.file.opts.plugins)
        ) {
          opts = injectReanimatedFlag(opts);
        }
        if (isDev) {
          opts = {
            ...opts,
            environment: {
              ...opts.environment,
              enableResetCacheOnSourceFileChanges: true,
            },
          };
        }
        compileProgram(prog, {
          opts,
          filename: pass.filename ?? null,
          comments: pass.file.ast.comments ?? [],
          code: pass.file.code,
        });
      },
    },
  };
}

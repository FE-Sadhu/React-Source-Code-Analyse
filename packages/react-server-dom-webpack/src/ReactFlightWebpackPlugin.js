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
import {join} from 'path';
import {pathToFileURL} from 'url';

import asyncLib from 'neo-async';
=======
import type {ImportManifestEntry} from './shared/ReactFlightImportMetadata';

import {join} from 'path';
import {pathToFileURL} from 'url';
import asyncLib from 'neo-async';
import * as acorn from 'acorn-loose';
>>>>>>> remotes/upstream/main

import ModuleDependency from 'webpack/lib/dependencies/ModuleDependency';
import NullDependency from 'webpack/lib/dependencies/NullDependency';
import Template from 'webpack/lib/Template';
import {
  sources,
  WebpackError,
  Compilation,
  AsyncDependenciesBlock,
} from 'webpack';

import isArray from 'shared/isArray';

class ClientReferenceDependency extends ModuleDependency {
  constructor(request: mixed) {
    super(request);
  }

  get type(): string {
    return 'client-reference';
  }
}

// This is the module that will be used to anchor all client references to.
// I.e. it will have all the client files as async deps from this point on.
// We use the Flight client implementation because you can't get to these
// without the client runtime so it's the first time in the loading sequence
// you might want them.
<<<<<<< HEAD
const clientImportName = 'react-server-dom-webpack';
const clientFileName = require.resolve('../');
=======
const clientImportName = 'react-server-dom-webpack/client';
const clientFileName = require.resolve('../client.browser.js');
>>>>>>> remotes/upstream/main

type ClientReferenceSearchPath = {
  directory: string,
  recursive?: boolean,
  include: RegExp,
  exclude?: RegExp,
};

type ClientReferencePath = string | ClientReferenceSearchPath;

type Options = {
  isServer: boolean,
  clientReferences?: ClientReferencePath | $ReadOnlyArray<ClientReferencePath>,
  chunkName?: string,
<<<<<<< HEAD
  manifestFilename?: string,
=======
  clientManifestFilename?: string,
  ssrManifestFilename?: string,
>>>>>>> remotes/upstream/main
};

const PLUGIN_NAME = 'React Server Plugin';

export default class ReactFlightWebpackPlugin {
  clientReferences: $ReadOnlyArray<ClientReferencePath>;
  chunkName: string;
<<<<<<< HEAD
  manifestFilename: string;
=======
  clientManifestFilename: string;
  ssrManifestFilename: string;
>>>>>>> remotes/upstream/main

  constructor(options: Options) {
    if (!options || typeof options.isServer !== 'boolean') {
      throw new Error(
        PLUGIN_NAME + ': You must specify the isServer option as a boolean.',
      );
    }
    if (options.isServer) {
      throw new Error('TODO: Implement the server compiler.');
    }
    if (!options.clientReferences) {
      this.clientReferences = [
        {
          directory: '.',
          recursive: true,
<<<<<<< HEAD
          include: /\.client\.(js|ts|jsx|tsx)$/,
=======
          include: /\.(js|ts|jsx|tsx)$/,
>>>>>>> remotes/upstream/main
        },
      ];
    } else if (
      typeof options.clientReferences === 'string' ||
      !isArray(options.clientReferences)
    ) {
      this.clientReferences = [(options.clientReferences: $FlowFixMe)];
    } else {
<<<<<<< HEAD
=======
      // $FlowFixMe[incompatible-type] found when upgrading Flow
>>>>>>> remotes/upstream/main
      this.clientReferences = options.clientReferences;
    }
    if (typeof options.chunkName === 'string') {
      this.chunkName = options.chunkName;
      if (!/\[(index|request)\]/.test(this.chunkName)) {
        this.chunkName += '[index]';
      }
    } else {
      this.chunkName = 'client[index]';
    }
<<<<<<< HEAD
    this.manifestFilename =
      options.manifestFilename || 'react-client-manifest.json';
=======
    this.clientManifestFilename =
      options.clientManifestFilename || 'react-client-manifest.json';
    this.ssrManifestFilename =
      options.ssrManifestFilename || 'react-ssr-manifest.json';
>>>>>>> remotes/upstream/main
  }

  apply(compiler: any) {
    const _this = this;
    let resolvedClientReferences;
    let clientFileNameFound = false;

    // Find all client files on the file system
    compiler.hooks.beforeCompile.tapAsync(
      PLUGIN_NAME,
      ({contextModuleFactory}, callback) => {
        const contextResolver = compiler.resolverFactory.get('context', {});
<<<<<<< HEAD
=======
        const normalResolver = compiler.resolverFactory.get('normal');
>>>>>>> remotes/upstream/main

        _this.resolveAllClientFiles(
          compiler.context,
          contextResolver,
<<<<<<< HEAD
          compiler.inputFileSystem,
          contextModuleFactory,
          function(err, resolvedClientRefs) {
=======
          normalResolver,
          compiler.inputFileSystem,
          contextModuleFactory,
          function (err, resolvedClientRefs) {
>>>>>>> remotes/upstream/main
            if (err) {
              callback(err);
              return;
            }

            resolvedClientReferences = resolvedClientRefs;
            callback();
          },
        );
      },
    );

    compiler.hooks.thisCompilation.tap(
      PLUGIN_NAME,
      (compilation, {normalModuleFactory}) => {
        compilation.dependencyFactories.set(
          ClientReferenceDependency,
          normalModuleFactory,
        );
        compilation.dependencyTemplates.set(
          ClientReferenceDependency,
          new NullDependency.Template(),
        );

<<<<<<< HEAD
=======
        // $FlowFixMe[missing-local-annot]
>>>>>>> remotes/upstream/main
        const handler = parser => {
          // We need to add all client references as dependency of something in the graph so
          // Webpack knows which entries need to know about the relevant chunks and include the
          // map in their runtime. The things that actually resolves the dependency is the Flight
          // client runtime. So we add them as a dependency of the Flight client runtime.
          // Anything that imports the runtime will be made aware of these chunks.
          parser.hooks.program.tap(PLUGIN_NAME, () => {
            const module = parser.state.module;

            if (module.resource !== clientFileName) {
              return;
            }

            clientFileNameFound = true;

            if (resolvedClientReferences) {
<<<<<<< HEAD
              for (let i = 0; i < resolvedClientReferences.length; i++) {
=======
              // $FlowFixMe[incompatible-use] found when upgrading Flow
              for (let i = 0; i < resolvedClientReferences.length; i++) {
                // $FlowFixMe[incompatible-use] found when upgrading Flow
>>>>>>> remotes/upstream/main
                const dep = resolvedClientReferences[i];

                const chunkName = _this.chunkName
                  .replace(/\[index\]/g, '' + i)
                  .replace(/\[request\]/g, Template.toPath(dep.userRequest));

                const block = new AsyncDependenciesBlock(
                  {
                    name: chunkName,
                  },
                  null,
                  dep.request,
                );

                block.addDependency(dep);
                module.addBlock(block);
              }
            }
          });
        };

        normalModuleFactory.hooks.parser
          .for('javascript/auto')
          .tap('HarmonyModulesPlugin', handler);

        normalModuleFactory.hooks.parser
          .for('javascript/esm')
          .tap('HarmonyModulesPlugin', handler);

        normalModuleFactory.hooks.parser
          .for('javascript/dynamic')
          .tap('HarmonyModulesPlugin', handler);
      },
    );

    compiler.hooks.make.tap(PLUGIN_NAME, compilation => {
      compilation.hooks.processAssets.tap(
        {
          name: PLUGIN_NAME,
          stage: Compilation.PROCESS_ASSETS_STAGE_REPORT,
        },
<<<<<<< HEAD
        function() {
          if (clientFileNameFound === false) {
            compilation.warnings.push(
              new WebpackError(
                `Client runtime at ${clientImportName} was not found. React Server Components module map file ${_this.manifestFilename} was not created.`,
=======
        function () {
          if (clientFileNameFound === false) {
            compilation.warnings.push(
              new WebpackError(
                `Client runtime at ${clientImportName} was not found. React Server Components module map file ${_this.clientManifestFilename} was not created.`,
>>>>>>> remotes/upstream/main
              ),
            );
            return;
          }

<<<<<<< HEAD
          const json = {};
          compilation.chunkGroups.forEach(function(chunkGroup) {
            const chunkIds = chunkGroup.chunks.map(function(c) {
              return c.id;
            });

            function recordModule(id, module) {
              // TODO: Hook into deps instead of the target module.
              // That way we know by the type of dep whether to include.
              // It also resolves conflicts when the same module is in multiple chunks.

              if (!/\.client\.(js|ts)x?$/.test(module.resource)) {
                return;
              }

              const moduleProvidedExports = compilation.moduleGraph
                .getExportsInfo(module)
                .getProvidedExports();

              const moduleExports = {};
              ['', '*']
                .concat(
                  Array.isArray(moduleProvidedExports)
                    ? moduleProvidedExports
                    : [],
                )
                .forEach(function(name) {
                  moduleExports[name] = {
                    id,
                    chunks: chunkIds,
                    name: name,
                  };
                });
              const href = pathToFileURL(module.resource).href;

              if (href !== undefined) {
                json[href] = moduleExports;
              }
            }

            chunkGroup.chunks.forEach(function(chunk) {
              const chunkModules = compilation.chunkGraph.getChunkModulesIterable(
                chunk,
              );

              Array.from(chunkModules).forEach(function(module) {
=======
          const configuredCrossOriginLoading =
            compilation.outputOptions.crossOriginLoading;
          const crossOriginMode =
            typeof configuredCrossOriginLoading === 'string'
              ? configuredCrossOriginLoading === 'use-credentials'
                ? configuredCrossOriginLoading
                : 'anonymous'
              : null;

          const resolvedClientFiles = new Set(
            (resolvedClientReferences || []).map(ref => ref.request),
          );

          const clientManifest: {
            [string]: ImportManifestEntry,
          } = {};
          type SSRModuleMap = {
            [string]: {
              [string]: {specifier: string, name: string},
            },
          };
          const moduleMap: SSRModuleMap = {};
          const ssrBundleConfig: {
            moduleLoading: {
              prefix: string,
              crossOrigin: string | null,
            },
            moduleMap: SSRModuleMap,
          } = {
            moduleLoading: {
              prefix: compilation.outputOptions.publicPath || '',
              crossOrigin: crossOriginMode,
            },
            moduleMap,
          };

          // We figure out which files are always loaded by any initial chunk (entrypoint).
          // We use this to filter out chunks that Flight will never need to load
          const emptySet: Set<string> = new Set();
          const runtimeChunkFiles: Set<string> = emptySet;
          compilation.entrypoints.forEach(entrypoint => {
            const runtimeChunk = entrypoint.getRuntimeChunk();
            if (runtimeChunk) {
              runtimeChunk.files.forEach(runtimeFile => {
                runtimeChunkFiles.add(runtimeFile);
              });
            }
          });

          compilation.chunkGroups.forEach(function (chunkGroup) {
            const chunks: Array<string> = [];
            chunkGroup.chunks.forEach(function (c) {
              // eslint-disable-next-line no-for-of-loops/no-for-of-loops
              for (const file of c.files) {
                if (!file.endsWith('.js')) return;
                if (file.endsWith('.hot-update.js')) return;
                chunks.push(c.id, file);
                break;
              }
            });

            // $FlowFixMe[missing-local-annot]
            function recordModule(id: $FlowFixMe, module) {
              // TODO: Hook into deps instead of the target module.
              // That way we know by the type of dep whether to include.
              // It also resolves conflicts when the same module is in multiple chunks.
              if (!resolvedClientFiles.has(module.resource)) {
                return;
              }

              const href = pathToFileURL(module.resource).href;

              if (href !== undefined) {
                const ssrExports: {
                  [string]: {specifier: string, name: string},
                } = {};

                clientManifest[href] = {
                  id,
                  chunks,
                  name: '*',
                };
                ssrExports['*'] = {
                  specifier: href,
                  name: '*',
                };

                // TODO: If this module ends up split into multiple modules, then
                // we should encode each the chunks needed for the specific export.
                // When the module isn't split, it doesn't matter and we can just
                // encode the id of the whole module. This code doesn't currently
                // deal with module splitting so is likely broken from ESM anyway.
                /*
                clientManifest[href + '#'] = {
                  id,
                  chunks,
                  name: '',
                };
                ssrExports[''] = {
                  specifier: href,
                  name: '',
                };

                const moduleProvidedExports = compilation.moduleGraph
                  .getExportsInfo(module)
                  .getProvidedExports();

                if (Array.isArray(moduleProvidedExports)) {
                  moduleProvidedExports.forEach(function (name) {
                    clientManifest[href + '#' + name] = {
                      id,
                      chunks,
                      name: name,
                    };
                    ssrExports[name] = {
                      specifier: href,
                      name: name,
                    };
                  });
                }
                */

                moduleMap[id] = ssrExports;
              }
            }

            chunkGroup.chunks.forEach(function (chunk) {
              const chunkModules =
                compilation.chunkGraph.getChunkModulesIterable(chunk);

              Array.from(chunkModules).forEach(function (module) {
>>>>>>> remotes/upstream/main
                const moduleId = compilation.chunkGraph.getModuleId(module);

                recordModule(moduleId, module);
                // If this is a concatenation, register each child to the parent ID.
                if (module.modules) {
                  module.modules.forEach(concatenatedMod => {
                    recordModule(moduleId, concatenatedMod);
                  });
                }
              });
            });
          });

<<<<<<< HEAD
          const output = JSON.stringify(json, null, 2);
          compilation.emitAsset(
            _this.manifestFilename,
            new sources.RawSource(output, false),
=======
          const clientOutput = JSON.stringify(clientManifest, null, 2);
          compilation.emitAsset(
            _this.clientManifestFilename,
            new sources.RawSource(clientOutput, false),
          );
          const ssrOutput = JSON.stringify(ssrBundleConfig, null, 2);
          compilation.emitAsset(
            _this.ssrManifestFilename,
            new sources.RawSource(ssrOutput, false),
>>>>>>> remotes/upstream/main
          );
        },
      );
    });
  }

  // This attempts to replicate the dynamic file path resolution used for other wildcard
  // resolution in Webpack is using.
  resolveAllClientFiles(
    context: string,
    contextResolver: any,
<<<<<<< HEAD
=======
    normalResolver: any,
>>>>>>> remotes/upstream/main
    fs: any,
    contextModuleFactory: any,
    callback: (
      err: null | Error,
      result?: $ReadOnlyArray<ClientReferenceDependency>,
    ) => void,
  ) {
<<<<<<< HEAD
=======
    function hasUseClientDirective(source: string): boolean {
      if (source.indexOf('use client') === -1) {
        return false;
      }
      let body;
      try {
        body = acorn.parse(source, {
          ecmaVersion: '2024',
          sourceType: 'module',
        }).body;
      } catch (x) {
        return false;
      }
      for (let i = 0; i < body.length; i++) {
        const node = body[i];
        if (node.type !== 'ExpressionStatement' || !node.directive) {
          break;
        }
        if (node.directive === 'use client') {
          return true;
        }
      }
      return false;
    }

>>>>>>> remotes/upstream/main
    asyncLib.map(
      this.clientReferences,
      (
        clientReferencePath: string | ClientReferenceSearchPath,
        cb: (
          err: null | Error,
          result?: $ReadOnlyArray<ClientReferenceDependency>,
        ) => void,
      ): void => {
        if (typeof clientReferencePath === 'string') {
          cb(null, [new ClientReferenceDependency(clientReferencePath)]);
          return;
        }
<<<<<<< HEAD
        const clientReferenceSearch: ClientReferenceSearchPath = clientReferencePath;
=======
        const clientReferenceSearch: ClientReferenceSearchPath =
          clientReferencePath;
>>>>>>> remotes/upstream/main
        contextResolver.resolve(
          {},
          context,
          clientReferencePath.directory,
          {},
          (err, resolvedDirectory) => {
            if (err) return cb(err);
            const options = {
              resource: resolvedDirectory,
              resourceQuery: '',
              recursive:
                clientReferenceSearch.recursive === undefined
                  ? true
                  : clientReferenceSearch.recursive,
              regExp: clientReferenceSearch.include,
              include: undefined,
              exclude: clientReferenceSearch.exclude,
            };
            contextModuleFactory.resolveDependencies(
              fs,
              options,
              (err2: null | Error, deps: Array<any /*ModuleDependency*/>) => {
                if (err2) return cb(err2);
<<<<<<< HEAD
=======

>>>>>>> remotes/upstream/main
                const clientRefDeps = deps.map(dep => {
                  // use userRequest instead of request. request always end with undefined which is wrong
                  const request = join(resolvedDirectory, dep.userRequest);
                  const clientRefDep = new ClientReferenceDependency(request);
                  clientRefDep.userRequest = dep.userRequest;
                  return clientRefDep;
                });
<<<<<<< HEAD
                cb(null, clientRefDeps);
=======

                asyncLib.filter(
                  clientRefDeps,
                  (
                    clientRefDep: ClientReferenceDependency,
                    filterCb: (err: null | Error, truthValue: boolean) => void,
                  ) => {
                    normalResolver.resolve(
                      {},
                      context,
                      clientRefDep.request,
                      {},
                      (err3: null | Error, resolvedPath: mixed) => {
                        if (err3 || typeof resolvedPath !== 'string') {
                          return filterCb(null, false);
                        }
                        fs.readFile(
                          resolvedPath,
                          'utf-8',
                          (err4: null | Error, content: string) => {
                            if (err4 || typeof content !== 'string') {
                              return filterCb(null, false);
                            }
                            const useClient = hasUseClientDirective(content);
                            filterCb(null, useClient);
                          },
                        );
                      },
                    );
                  },
                  cb,
                );
>>>>>>> remotes/upstream/main
              },
            );
          },
        );
      },
      (
        err: null | Error,
        result: $ReadOnlyArray<$ReadOnlyArray<ClientReferenceDependency>>,
      ): void => {
        if (err) return callback(err);
<<<<<<< HEAD
        const flat = [];
        for (let i = 0; i < result.length; i++) {
=======
        const flat: Array<any> = [];
        for (let i = 0; i < result.length; i++) {
          // $FlowFixMe[method-unbinding]
>>>>>>> remotes/upstream/main
          flat.push.apply(flat, result[i]);
        }
        callback(null, flat);
      },
    );
  }
}

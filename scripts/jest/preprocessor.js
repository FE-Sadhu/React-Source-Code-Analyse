'use strict';

const path = require('path');

const babel = require('@babel/core');
const coffee = require('coffee-script');
<<<<<<< HEAD

const tsPreprocessor = require('./typescript/preprocessor');
const createCacheKeyFunction = require('fbjs-scripts/jest/createCacheKeyFunction');
const {getDevToolsPlugins} = require('./devtools/preprocessor.js');
=======
const hermesParser = require('hermes-parser');

const tsPreprocessor = require('./typescript/preprocessor');
const createCacheKeyFunction = require('fbjs-scripts/jest/createCacheKeyFunction');
>>>>>>> remotes/upstream/main

const pathToBabel = path.join(
  require.resolve('@babel/core'),
  '../..',
  'package.json'
);
const pathToBabelPluginReplaceConsoleCalls = require.resolve(
  '../babel/transform-replace-console-calls'
);
<<<<<<< HEAD
const pathToBabelPluginAsyncToGenerator = require.resolve(
  '@babel/plugin-transform-async-to-generator'
);
=======
>>>>>>> remotes/upstream/main
const pathToTransformInfiniteLoops = require.resolve(
  '../babel/transform-prevent-infinite-loops'
);
const pathToTransformTestGatePragma = require.resolve(
  '../babel/transform-test-gate-pragma'
);
<<<<<<< HEAD
=======
const pathToTransformReactVersionPragma = require.resolve(
  '../babel/transform-react-version-pragma'
);
>>>>>>> remotes/upstream/main
const pathToBabelrc = path.join(__dirname, '..', '..', 'babel.config.js');
const pathToErrorCodes = require.resolve('../error-codes/codes.json');

const babelOptions = {
  plugins: [
    // For Node environment only. For builds, Rollup takes care of ESM.
    require.resolve('@babel/plugin-transform-modules-commonjs'),

    // Keep stacks detailed in tests.
    // Don't put this in .babelrc so that we don't embed filenames
    // into ReactART builds that include JSX.
    // TODO: I have not verified that this actually works.
    require.resolve('@babel/plugin-transform-react-jsx-source'),

    pathToTransformInfiniteLoops,
    pathToTransformTestGatePragma,

    // This optimization is important for extremely performance-sensitive (e.g. React source).
    // It's okay to disable it for tests.
    [
      require.resolve('@babel/plugin-transform-block-scoping'),
      {throwIfClosureRequired: false},
    ],
  ],
  retainLines: true,
};

module.exports = {
<<<<<<< HEAD
  process: function(src, filePath) {
    if (filePath.match(/\.css$/)) {
      // Don't try to parse CSS modules; they aren't needed for tests anyway.
      return '';
    }
    if (filePath.match(/\.coffee$/)) {
      return coffee.compile(src, {bare: true});
    }
    if (filePath.match(/\.ts$/) && !filePath.match(/\.d\.ts$/)) {
      return tsPreprocessor.compile(src, filePath);
    }
    if (filePath.match(/\.json$/)) {
      return src;
=======
  process: function (src, filePath) {
    if (filePath.match(/\.css$/)) {
      // Don't try to parse CSS modules; they aren't needed for tests anyway.
      return {code: ''};
    }
    if (filePath.match(/\.coffee$/)) {
      return {code: coffee.compile(src, {bare: true})};
    }
    if (filePath.match(/\.ts$/) && !filePath.match(/\.d\.ts$/)) {
      return {code: tsPreprocessor.compile(src, filePath)};
    }
    if (filePath.match(/\.json$/)) {
      return {code: src};
>>>>>>> remotes/upstream/main
    }
    if (!filePath.match(/\/third_party\//)) {
      // for test files, we also apply the async-await transform, but we want to
      // make sure we don't accidentally apply that transform to product code.
      const isTestFile = !!filePath.match(/\/__tests__\//);
      const isInDevToolsPackages = !!filePath.match(
        /\/packages\/react-devtools.*\//
      );
<<<<<<< HEAD
      const testOnlyPlugins = [pathToBabelPluginAsyncToGenerator];
=======
      const testOnlyPlugins = [];
>>>>>>> remotes/upstream/main
      const sourceOnlyPlugins = [];
      if (process.env.NODE_ENV === 'development' && !isInDevToolsPackages) {
        sourceOnlyPlugins.push(pathToBabelPluginReplaceConsoleCalls);
      }
      const plugins = (isTestFile ? testOnlyPlugins : sourceOnlyPlugins).concat(
        babelOptions.plugins
      );
      if (isTestFile && isInDevToolsPackages) {
<<<<<<< HEAD
        plugins.push(...getDevToolsPlugins(filePath));
      }
      return babel.transform(
        src,
        Object.assign(
          {filename: path.relative(process.cwd(), filePath)},
          babelOptions,
          {
            plugins,
            sourceMaps: process.env.JEST_ENABLE_SOURCE_MAPS
              ? process.env.JEST_ENABLE_SOURCE_MAPS
              : false,
          }
        )
      );
    }
    return src;
  },

  getCacheKey: createCacheKeyFunction([
    __filename,
    pathToBabel,
    pathToBabelrc,
    pathToTransformInfiniteLoops,
    pathToTransformTestGatePragma,
    pathToErrorCodes,
  ]),
=======
        plugins.push(pathToTransformReactVersionPragma);
      }
      let sourceAst = hermesParser.parse(src, {babel: true});
      return {
        code: babel.transformFromAstSync(
          sourceAst,
          src,
          Object.assign(
            {filename: path.relative(process.cwd(), filePath)},
            babelOptions,
            {
              plugins,
              sourceMaps: process.env.JEST_ENABLE_SOURCE_MAPS
                ? process.env.JEST_ENABLE_SOURCE_MAPS
                : false,
            }
          )
        ).code,
      };
    }
    return {code: src};
  },

  getCacheKey: createCacheKeyFunction(
    [
      __filename,
      pathToBabel,
      pathToBabelrc,
      pathToTransformInfiniteLoops,
      pathToTransformTestGatePragma,
      pathToTransformReactVersionPragma,
      pathToErrorCodes,
    ],
    [
      (process.env.REACT_VERSION != null).toString(),
      (process.env.NODE_ENV === 'development').toString(),
    ]
  ),
>>>>>>> remotes/upstream/main
};

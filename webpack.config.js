const path = require('path');

const { endsWith, pickBy } = require('lodash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const CaseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const pixrem = require('pixrem');
const webpack = require('webpack');
const AntdScssThemePlugin = require('antd-scss-theme-plugin');

/**
 * Get all environment variables whose name starts with the ENV_PREFIX (case insensitive).
 *
 * @returns {Object} Filtered process.env.
 */
function getAppEnvironment() {
  const prefix = (process.env.ENV_PREFIX || '').toLowerCase();
  return pickBy(process.env, (value, key) => key.toLowerCase().startsWith(prefix));
}

module.exports = (env, argv = {}) => {
  const mode = argv.mode || 'development';

  // eslint-disable-next-line no-console
  console.log(`Building for ${mode}`);

  const appEnv = getAppEnvironment();

  // Served from the root by webpack-dev-server in development.
  const publicPath = '/';

  // Point sourcemap entries to original disk location (format as URL on Windows).
  const devtoolModuleFilenameTemplate = info => path
    .relative('./src', info.absoluteResourcePath)
    .replace(/\\/g, '/');

  const output = mode === 'production' ? {
    path: path.join(__dirname, './.dist/'),
    filename: 'js/[name].[contenthash].min.js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath,
    devtoolModuleFilenameTemplate,
  } : {
    path: path.join(__dirname, './.dev/'),
    filename: 'js/bundle.min.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath,
    devtoolModuleFilenameTemplate,
  };

  const extractCssPlugin = new MiniCssExtractPlugin({
    filename: 'css/[name].[contenthash].min.css',
  });

  const htmlPlugin = new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './src/index.html.ejs',
  });

  const antdScssThemePlugin = new AntdScssThemePlugin('./src/style/theme.scss');

  /**
   * Get hash template of css class names in css modules if enabled.
   *
   * @param {boolean} enableModules - Should enable css modules.
   */
  function getLocalIdentName(enableModules) {
    if (!enableModules) {
      return undefined;
    }

    // Only set the hash in production.
    // Add the actual name to the hash in development to make it easier to debug.
    return mode === 'production' ? '[hash:base64:8]' : '[local]--[hash:base64:8]';
  }

  /**
   * Make a css loader using style-loader in dev and extracting to a stylesheet in production.
   *
   * @param {Object} params - Params.
   * @param {boolean} params.enableModules - Use CSS modules.
   * @returns {Object[]} Loader for css files.
   */
  function makeCssLoader({ enableModules = false } = {}) {
    return [
      {
        loader: mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: !!enableModules,
          localIdentName: getLocalIdentName(enableModules),
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: [
            pixrem(),
          ],
        },
      },
    ];
  }

  /**
   * Make a less loader for antd.
   *
   * @param {Object} params - Params.
   * @param {boolean} params.enableModules - Use CSS modules.
   * @returns {Object[]} Loader for less files.
   */
  function makeLessLoader({ enableModules = false } = {}) {
    return [
      ...makeCssLoader(enableModules),
      AntdScssThemePlugin.themify({
        loader: 'less-loader',
        options: { javascriptEnabled: true },
      }),
    ];
  }

  /**
   * Make a scss loader using style-loader in dev and extracts to a stylesheet in product.
   *
   * @param {Object} params - Params.
   * @param {boolean} params.enableModules - Use CSS modules.
   * @returns {Object[]} Loader for css files.
   */
  function makeSassLoader({ enableModules = false } = {}) {
    return [
      ...makeCssLoader({ enableModules }),
      {
        loader: 'resolve-url-loader',
        options: {
          sourceMap: true,
        },
      },
      AntdScssThemePlugin.themify({
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          includePaths: [
            './src/',
            './node_modules/',
          ],
        },
      }),
    ];
  }

  return {
    mode,

    devtool: 'source-map',

    // App entry point.
    entry: [
      mode === 'development' && require.resolve('react-dev-utils/webpackHotDevClient'),
      './src/index.jsx',
    ].filter(Boolean),

    // Bundle output.
    output,

    module: {
      rules: [
        /**
         * JS files.
         */

        // Babel.
        {
          test: /\.jsx?$/i,
          exclude: /(node_modules)/i,
          loader: 'babel-loader',
        },
        // Eslint.
        {
          // Make sure that they are linted BEFORE they are transformed by babel.
          enforce: 'pre',
          test: /\.jsx?$/i,
          // Do not lint files in node_modules.
          exclude: /(node_modules)/i,
          loader: 'eslint-loader',
          options: {
            // Use root .eslintrc to get the config.
            configFile: '.eslintrc.js',
            // Do not stop the build on a lint error.
            emitWarning: true,
          },
        },

        /**
         * Sass, less and css.
         */

        // CSS.
        {
          test: file => !endsWith(file, '.module.css') && endsWith(file, '.css'),
          use: makeCssLoader(),
        },
        // CSS modules.
        {
          test: /\.module\.css$/i,
          use: makeCssLoader({ enableModules: true }),
        },

        // Less.
        {
          test: /\.less$/,
          use: makeLessLoader(),
        },

        // SCSS.
        {
          test: file => (
            !endsWith(file, '.module.scss')
            && !endsWith(file, '.variables.scss')
            && endsWith(file, '.scss')
          ),
          use: makeSassLoader(),
        },
        // SCSS modules.
        {
          test: /\.module\.scss$/i,
          use: makeSassLoader({ enableModules: true }),
        },

        // SCSS variables
        {
          test: /\.variables\.scss$/i,
          loader: 'sass-extract-loader',
          options: {
            plugins: ['sass-extract-js'],
          },
        },

        /**
         * Asset files.
         */
        {
          test: /\.(jpg|jpeg|bmp|png|gif|eot|otf|ttf|woff|woff2|ico)$/i,
          loader: 'file-loader',
          options: {
            outputPath: 'assets/',
            name: '[name].[hash:8].[ext]',
          },
        },

        /** Svg (specific loader to have the actual <svg> tag in the DOM). */
        {
          test: /\.svg$/i,
          exclude: /node_modules/i,
          loader: 'svg-react-loader',
        },
      ],
    },

    resolve: {
      // Resolve absolute imports using these paths (in this order).
      modules: [
        './src/',
        './node_modules/',
      ],

      extensions: [
        '.json',
        '.js',
        '.jsx',
      ],

      plugins: [
        // Prevent importing files outside of src/ (or node_modules/) except package.json.
        new ModuleScopePlugin('./src/', ['./package.json']),
      ],
    },

    plugins: [
      // Extract CSS to an external stylesheet. Better performance in production (allows caching).
      // In development we use style-loader to allow HMR with scss files.
      mode === 'production' && extractCssPlugin,

      // Generate index.html linking to the generated bundles (js and css).
      htmlPlugin,

      // In production, variables are resolved at runtime by Nginx.
      // Replace variables for other environments at build time.
      // This means that you need to restart webpack when editing the environment.
      mode !== 'production' && new HtmlReplaceWebpackPlugin(Object.keys(appEnv).map(key => ({
        pattern: `$${key}`,
        replacement: appEnv[key],
      }))),

      // Define specific environment variables in the bundle.
      new webpack.DefinePlugin({
        // process.env.NODE_ENV is required by many packages.
        'process.env.NODE_ENV': JSON.stringify(mode),
        'process.env.ENV_PREFIX': JSON.stringify(process.env.ENV_PREFIX),
        'process.env.npm_package_version': JSON.stringify(process.env.npm_package_version),
      }),

      // HMR plugin.
      mode === 'development' && new webpack.HotModuleReplacementPlugin(),

      // Throw error when a required path does not match the case of the actual path.
      new CaseSensitivePathsWebpackPlugin(),

      // Trigger a new build when a node module package is installed.
      mode === 'development' && new WatchMissingNodeModulesPlugin(path.resolve('./node_modules/')),

      // Lint SCSS files.
      new StyleLintPlugin(),

      // Ant SASS theme configuration
      antdScssThemePlugin,

    ].filter(Boolean),

    // Some libraries import Node modules but don't use them in the browser.
    // Tell Webpack to provide empty mocks for them so importing them works.
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },

    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          cache: true,
          parallel: true,
          sourceMap: true, // set to true if you want JS source maps
        }),
        new OptimizeCssAssetsWebpackPlugin({
          cssProcessorOptions: {
            map: {
              inline: false,
              annotation: true,
            },
          },
        }),
      ],
    },

    // Dev server.
    devServer: mode === 'development' ?
      {
        publicPath,

        contentBase: './.dev',
        watchContentBase: true,
        watchOptions: {
          ignored: /node_modules/,
        },

        // Only show errors.
        stats: 'minimal',

        // Enable HMR.
        hot: true,

        // Serve index.html on 404.
        historyApiFallback: {
        // Paths with dots should still use the history fallback.
        // See https://github.com/facebookincubator/create-react-app/issues/387.
          disableDotRule: true,
        },

        // Use 8080 port as default.
        // Allow users to override via environment.
        port: +(process.env[`${process.env.ENV_PREFIX}WDS_PORT`] || 8080),

        /**
         * Add middlewares (probably). I copied that from create-react-app.
         *
         * @param {Object} app - App.
         */
        before(app) {
        // This lets us open files from the runtime error overlay.
          app.use(errorOverlayMiddleware());
          // This service worker file is effectively a 'no-op' that will reset any
          // previous service worker registered for the same host:port combination.
          // We do this in development to avoid hitting the production cache if
          // it used the same host and port.
          // https://github.com/facebookincubator/create-react-app/issues/2272#issuecomment-302832432
          app.use(noopServiceWorkerMiddleware());
        },
      }
      : undefined,
  };
};

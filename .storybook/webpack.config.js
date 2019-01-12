const path = require('path');

const { endsWith } = require('lodash');
const pixrem = require('pixrem');

function makeCssLoader({ enableModules = false } = {}) {
  return [
    {
      loader: 'style-loader',
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        modules: !!enableModules,
        localIdentName: enableModules ? '[local]--[hash:base64:8]' : undefined,
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

function makeSassLoader({ enableModules = false } = {}) {
  return [
    ...makeCssLoader({ enableModules }),
    {
      loader: 'resolve-url-loader',
      options: {
        sourceMap: true,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true,
        includePaths: [
          path.join(__dirname, '../src/'),
          path.join(__dirname, '../node_modules/'),
        ],
      },
    },
  ];
}

module.exports = (baseConfig, env, defaultConfig) => {
  // Default config does not implicitly resolve .jsx files.
  defaultConfig.resolve.extensions.push('.jsx');

  defaultConfig.devServer = { stats: 'minimal' };

  // Default config only transforms .js files.
  defaultConfig.module.rules[0].test = /\.jsx?$/i;

  defaultConfig.module.rules = [
    // JS/JSX.
    defaultConfig.module.rules[0],
    // Raw loader.
    defaultConfig.module.rules[1],
    // Files (mp3 etc.).
    defaultConfig.module.rules[4],

    /**
     * Asset files.
     */
    {
      test: /\.(jpg|jpeg|bmp|png|gif|eot|otf|ttf|woff|woff2|ico)$/i,
      loader: 'file-loader',
      options: {
        name: 'static/media/[name].[hash:8].[ext]',
      },
    },

    /** Svg (specific loader to have the actual <svg> tag in the DOM). */
    {
      test: /\.svg$/i,
      loader: 'svg-react-loader',
    },

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
  ];

  return defaultConfig;
};

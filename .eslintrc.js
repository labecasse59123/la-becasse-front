module.exports = {
  // Tell eslint not to seek a eslintrc file in parent folders.
  root: true,

  env: {
    es6: true,
    // Define jest globals in .spec.js and .test.js files.
    jest: true,
    // Define browser globals (window, document, etc.).
    browser: true,
  },

  plugins: ['jsdoc'],

  extends: 'airbnb',

  parser: 'babel-eslint',

  rules: {
    // This is not working with defaultProps.
    // https://github.com/yannickcr/eslint-plugin-react/issues/1846
    'react/button-has-type': 0,

    // This rule just makes the code more verbose and less readable.
    'react/destructuring-assignment': 0,
    // Does not work well with inline text.
    'react/jsx-one-expression-per-line': 0,

    'no-underscore-dangle': 0,

    // On linebreak, enforce operator on the new line, except for the '?' of a ternary expression.
    'operator-linebreak': [
      'error',
      'before',
      { overrides: { '?': 'after' } },
    ],

    // Prevent multiple empty lines. Allow 1 at EOF, 0 at BOF.
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
        maxBOF: 0,
      },
    ],

    // Allow ++ operator.
    'no-plusplus': 0,

    // Enforce single quotes except for strings with single quotes in body.
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],

    // Allow assigning in argument if object.
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],

    // Allow named export without default export.
    'import/prefer-default-export': 0,

    // JSDoc specific rules.
    // Set most rules as warnings instead of errors.
    'jsdoc/check-param-names': 1,
    'jsdoc/check-tag-names': 1,
    'jsdoc/check-types': 1,
    'jsdoc/newline-after-description': 1,
    'jsdoc/no-undefined-types': 1,
    'jsdoc/require-description-complete-sentence': 1,
    'jsdoc/require-hyphen-before-param-description': 1,
    'jsdoc/require-param': 1,
    'jsdoc/require-param-description': 1,
    'jsdoc/require-param-name': 1,
    'jsdoc/require-param-type': 1,
    'jsdoc/require-returns-description': 1,
    'jsdoc/require-returns-type': 1,
    'jsdoc/valid-types': 1,

    // Disable these rules.
    'jsdoc/require-description': 0,
    'jsdoc/require-example': 0,

    'require-jsdoc': [
      1,
      {
        require: {
          FunctionDeclaration: true,
          MethodDefinition: true,
          ClassDeclaration: false,
          ArrowFunctionExpression: false,
          FunctionExpression: true,
        },
      },
    ],
  },

  settings: {
    'import/resolver': {
      node: {
        extensions: [
          '.js',
          '.jsx',
        ],

        paths: [
          './src/',
        ],
      }
    },

    jsdoc: {
      additionalTagNames: {
        customTags: ['async'],
      },
    },
  },

  overrides: [
    {
      files: ['*.stories.{js,jsx}'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          { devDependencies: true },
        ],

        // Storybook webpack babel only checks js files.
        'react/jsx-filename-extension': 0,
      },
    },
  ],
};

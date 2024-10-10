module.exports = [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        browser: true,
        es2021: true,
        'cypress/globals': true
      }
    },
    plugins: {
      cypress: require('eslint-plugin-cypress')
    },
    rules: {
      indent: [
        'error',
        2
      ],
      'eol-last': [
        'error',
        'always'
      ],
      'linebreak-style': [
        'error',
        'unix'
      ],
      quotes: [
        'error',
        'single'
      ]
    }
  },
  {
    files: ['cypress/*.js'],
    ignores: ['frontend/**'],
  }
];

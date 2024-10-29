import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress/flat';


export default [
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  {
    rules: {
      'cypress/unsafe-to-chain-command': 'off',
      'cypress/no-force': 'error',
      'cypress/no-pause': 'error',
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-trailing-spaces': 'error'
    }
  }
];

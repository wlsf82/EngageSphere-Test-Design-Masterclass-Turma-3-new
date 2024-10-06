import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginCypress from 'eslint-plugin-cypress/flat'


export default [
  {languageOptions: { globals: {...globals.browser, ...globals.node} }},
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  {
    rules: {
      'cypress/no-force': 'error',
      'cypress/no-pause': 'error',
      'cypress/assertion-before-screenshot': 'error',
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'no-trailing-spaces': 'error'
    }
  }
]
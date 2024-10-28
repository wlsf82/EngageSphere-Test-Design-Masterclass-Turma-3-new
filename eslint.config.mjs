import globals from 'globals';
import prettier from 'eslint-plugin-prettier';
import cypress from 'eslint-plugin-cypress';

export default [
  { languageOptions: { globals: globals.browser } },
  {
    ignores: ['frontend', 'backend'],
  },
  {
    plugins: {
      prettier,
      cypress,
    },
    rules: {
      ...prettier.configs.recommended.rules,
    },
  },
];

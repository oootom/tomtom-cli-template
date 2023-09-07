module.exports = {
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
};

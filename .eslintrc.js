module.exports = {
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'unicorn'],
  extends: ['eslint:recommended', 'plugin:unicorn/recommended', 'next/core-web-vitals', 'prettier'],
  rules: {
    'unicorn/prefer-module': 'off',
    'unicorn/filename-case': [
      'error',
      { cases: { camelCase: true, pascalCase: true }, ignore: [/^README\.md$/, /^next-env\.d\.ts$/] },
    ],
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      extends: [
        'plugin:unicorn/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'next/core-web-vitals',
        'prettier',
      ],
      rules: {
        quotes: ['error', 'single', { avoidEscape: true }],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        '@typescript-eslint/consistent-type-imports': 'error', // https://typescript-eslint.io/rules/consistent-type-imports/
        'unicorn/filename-case': [
          'error',
          { cases: { camelCase: true, pascalCase: true }, ignore: [/^next-env\.d\.ts$/] },
        ],
        'unicorn/no-null': 'off',
      },
    },
    {
      files: ['bin/**/*.{ts,tsx}'],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './bin/tsconfig.json',
      },
      rules: {
        'unicorn/no-process-exit': 'off',
      },
    },
  ],
};

import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.astro/**',
      'src/pages/**/*.astro',
      'src/layouts/**/*.astro',
    ],
  },
  ...eslintPluginAstro.configs.recommended,
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    files: ['lambda/**/*.js'],
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['**/*.astro'],
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];

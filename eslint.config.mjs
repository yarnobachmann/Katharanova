import js from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['.next/**', 'node_modules/**', 'assets-folder-update/**', 'payload-types.ts', 'tsconfig.tsbuildinfo']
  },
  {
    languageOptions: {
      globals: {
        React: 'readonly',
        console: 'readonly',
        process: 'readonly',
        window: 'readonly',
        document: 'readonly',
        IntersectionObserver: 'readonly',
        HTMLDivElement: 'readonly',
        ReactNode: 'readonly'
      }
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'no-console': 'off'
    }
  }
)

import sveltePlugin from 'eslint-plugin-svelte';
import prettierPlugin from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';
import svelteParser from 'svelte-eslint-parser';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import svelteConfig from './svelte.config.js';
import globals from 'globals';

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	...sveltePlugin.configs['flat/recommended'],
	prettierPlugin,
	importPlugin.flatConfigs.recommended,
	{
		ignores: [
			'.DS_Store',
			'node_modules',
			'build/',
			'dist/',
			'.svelte-kit/',
			'*.js',
			'/package',
			'.env',
			'.env.*',
			'!.env.example',
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock'
		]
	},
	{
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				sourceType: 'module',
				ecmaVersion: 2020,
				extraFileExtensions: ['.svelte']
			},
			globals: {
				...globals.browser,
				...globals.node
			}
		},
		rules: {
			'prettier/prettier': ['error', { endOfLine: 'auto' }],
			'import/order': [
				'error',
				{
					alphabetize: {
						order: 'asc',
						caseInsensitive: true
					},
					groups: [['external', 'builtin'], ['internal'], ['parent'], ['index', 'sibling']],
					'newlines-between': 'always'
				}
			],
			'import/no-duplicates': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true
				}
			],
			'@typescript-eslint/only-throw-error': 'off',
			'import/no-unresolved': 'off'
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: import.meta.dirname
				}
			}
		}
	},
	{
		languageOptions: {
			parser: svelteParser,
			parserOptions: {
				parser: tseslint.parser,
				svelteConfig,
				sourceType: 'module',
				ecmaVersion: 2020,
				extraFileExtensions: ['.svelte'],
				svelteFeatures: {
					experimentalGenerics: true
				}
			}
		},
		files: ['**/*.svelte', '*.svelte', '**/*svelte.ts', '*.svelte.ts']
	},
	{
		files: ['*.svelte', '*.ts'],
		rules: {
			'no-undef': 'off'
		}
	}
);

module.exports = {
	env: {
		es6: true,
		jest: true,
		node: true,
	},
	extends: ['eslint:recommended', 'prettier'],
	parser: '@babel/eslint-parser',
	parserOptions: { requireConfigFile: false },
	plugins: ['jest'],
	rules: {
		'comma-dangle': ['error', 'always-multiline'],
		indent: ['error', 'tab'],
		'max-len': ['error', 120],
		'no-console': 'warn',
		'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
		'prefer-const': 'error',
		semi: 'error',
		'object-curly-spacing': ['error', 'always'],
	},
};
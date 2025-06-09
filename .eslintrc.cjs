module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'plugin:prettier/recommended', // integrates prettier rules
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		// your custom rules here, for example:
		'vue/html-indent': ['error', 2],
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: 3,
				multiline: {
					max: 1,
					allowFirstLine: false,
				},
			},
		],
		// example turning off no-console warnings:
		'no-console': 'warn',
	},
};

import vue from 'eslint-plugin-vue';

export default [
	{
		files: ['*.js', '*.ts', '*.vue'],
		languageOptions: {
			parser: 'vue-eslint-parser',
			parserOptions: {
				parser: '@babel/eslint-parser', // or your preferred parser for JS inside <script>
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
			globals: {
				window: 'readonly',
				document: 'readonly',
				// add any globals you need here
			},
		},
		plugins: {
			vue,
		},
		rules: {
			'no-console': 'warn',
			// Vue rules
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
		},
		extends: [
			'eslint:recommended',
			'plugin:vue/vue3-recommended',
			'plugin:prettier/recommended',
		],
		settings: {},
	},
];

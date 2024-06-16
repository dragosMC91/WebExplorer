import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
export default [
    {
        files: ['**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        rules: {
            'prettier/prettier': ['error'],
            'no-unused-vars': 'warn',
            'no-console': 'off',
        },
    },
    eslintPluginPrettierRecommended,
];

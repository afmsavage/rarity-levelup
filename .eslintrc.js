module.exports = {
    env: {
        browser: false,
        commonjs: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    globals: {
        console: 'readonly',
        setTimeout: 'readonly',
    },
    rules: {
        indent: ['warn', 4],
        // 'function-paren-newline': ['warn', { minItems: 3 }],
    },
}

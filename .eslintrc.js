module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
        es6: true,
    },
    parser: '@babel/eslint-parser',
    extends: [
        'airbnb-base',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
    },
};

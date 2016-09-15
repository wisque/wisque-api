module.exports = {
    extends: "airbnb",
    parser: 'babel-eslint',
    env: {
        node: true
    },
    settings: {
        'import/resolver': {
            node: {
                moduleDirectory: ['node_modules', './']
            }
        }
    },
    rules: {
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'max-len': ['error', 120],
        'no-restricted-syntax': ['error', 'TryStatement', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
    }
};
module.exports = {
    extends: "airbnb",
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
        'no-restricted-syntax': ['error', 'ForInStatement', 'LabeledStatement', 'WithStatement'],
        'no-param-reassign': 'off',
        'generator-star-spacing': 'off',
        'import/prefer-default-export': 'off',
        'no-use-before-define': 'off',
        'no-underscore-dangle': 'off',
    }
};
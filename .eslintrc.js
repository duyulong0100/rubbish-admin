module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "one-var": [1, { "initialized": "always" }],
    "space-before-function-paren": [1, "never"],
    "semi": [0, "never"],
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

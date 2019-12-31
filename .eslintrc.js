module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/strongly-recommended',
    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint"
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'vue/max-attributes-per-line': [
    //   2,
    //   {
    //     'singleline': 5,
    //     'multiline': {
    //       'max': 1,
    //       'allowFirstLine': false
    //     }
    //   }
    // ],
    'vue/attribute-hyphenation': 0,
    'vue/max-attributes-per-line': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/html-self-closing': 0,
    'vue/multiline-html-element-content-newline': 0,
    'comma-dangle': 0
  }
}

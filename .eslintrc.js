module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:@intlify/vue-i18n/recommended',
    '@vue/eslint-config-typescript',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@intlify/vue-i18n/valid-message-syntax': 'error',
    '@intlify/vue-i18n/key-format-style': ['error', 'camelCase'],
    "@intlify/vue-i18n/no-duplicate-keys-in-locale": 'error',
    "@intlify/vue-i18n/no-missing-keys-in-other-locales": 'error',
    '@intlify/vue-i18n/no-unused-keys': [
      'error',
      {
        extensions: ['.js', '.ts', '.vue']
      }
    ],
  },
  settings: {
    'vue-i18n': {
      localeDir: './src/i18n/*.{json,json5,yaml,yml}',
      messageSyntaxVersion: '^9.6.5',
    },
  }
}

module.exports = {
  extends: [
    "next",
    "turbo",
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    indent: ["error", 2, { SwitchCase: 1 }],
    quotes: ["error", "double"],
    "@typescript-eslint/no-unused-vars": ["error"],
    "no-console": "off",
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};

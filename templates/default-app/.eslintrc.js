module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-studio-206`
  extends: ["studio-206"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
  // These parserOptions fix the following issue: https://github.com/vercel/next.js/issues/40687
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};

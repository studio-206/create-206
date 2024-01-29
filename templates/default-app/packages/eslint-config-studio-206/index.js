module.exports = {
  extends: ["next", "@studio206/eslint-config"]
  // These parserOptions fix the following issue: https://github.com/vercel/next.js/issues/40687
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
};

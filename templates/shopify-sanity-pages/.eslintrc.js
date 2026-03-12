module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-studio-206`
  extends: ["studio-206"],
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};

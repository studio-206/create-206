# Studio 206 starter

This is an official starter from Studio 206.

## Using this example

Run the following command:

```sh
npx create-206-app@latest
```

The environment variables are set in the `.env` file in the root of the project. You can copy the `.env.example` file to `.env` and fill in the variables for your local environment.

This is the **Sanity Pages Template** Example

## What's inside?

This repo includes the following packages/apps:

### Apps and Packages

```
.
├── package.json
├── apps/
│   ├── web
│   └── cms
└── packages/
    ├── eslint-config-studio-206 // (Our eslint config)
    └── tsconfig
```

- `eslint-config-studio-206`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

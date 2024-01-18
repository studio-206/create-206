# Create 206 App.

This is a custom fork from Next.js `create-next-app`. We've fined tuned it to building applications with our preferred application stack at https://studio206.dev.

You can see the templates we use in [./templates](https://github.com/studio-206/create-206/tree/main/templates)

- `default`
  - Standard Bare Bones Next.js App.
  - Choose between App / Pages router.
- `with-sanity` (coming soon)
  - Choose between App/Pages router
  - Generic Sanity Setup
- `with-sanity-shopify` (coming soon)
  - Choose between App/Pages router
  - Generic Sanity Setup
  - Shopify Integration

## CLI Options

```bash
  npx create-206-app --help
```

## Running locally

1. Clone the repo:

```bash
git clone git@github.com:studio-206/create-206.git
```

2. Install deps:

```bash
pnpm i
```

3. To install locally, you can run in the directory root.

```bash
npm link
```

- Now you can run `npx create-206-app` - this is the bin script defined in `package.json`
- Confirm this is installed globally by running `npm ls -g`, you _should_ see `create-206-app` in the list.
- Run `npm/yarn/pnpm run dev` to watch for changes.

## Editing templates

When editing a template you may want to test the changes locally. To do this, you can run the following command:

```bash
npx create-206-app --branch <branch-with-changes>
```

This downloads and runs the template from the specified branch, rather than main.

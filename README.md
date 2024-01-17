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

## Contributing

### Running locally

1. Clone the repo:
   ```
   git clone git@github.com:studio-206/create-206.git
   ```
2. Install deps:
   ```
   pnpm i
   ```
3. To install locally, you can run in the directory root.
   ```
   npm link
   ```
   - Now you can run `npx create-206-app` - this is the bin script defined in `package.json`
   - Confirm this is installed globally by running `npm ls -g`, you _should_ see `create-206-app` in the list.
   - Run `npm/yarn/pnpm run dev` to watch for changes.

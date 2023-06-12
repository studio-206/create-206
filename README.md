# Create Studio 206 App

The easiest way to get started with the Studio 206 stack is by using `create-206-app`. This CLI tool enables you to quickly start building a new Studio 206 application, with everything set up for you. You can create a new app using the default Next.js template, or by using one of the [Studio 206 examples](https://github.com/studio206/create-206/tree/main/examples). To get started, use the following command:

### Interactive

You can create a new project interactively by running:

```bash
npx create-206-app@latest
# or
yarn create 206-app
# or
pnpm create 206-app
```

You will be asked for the name of your project, and then whether you want to
create a TypeScript project:

```bash
✔ Would you like to use TypeScript with this project? … No / Yes
```

Select **Yes** to install the necessary types/dependencies and create a new TS project.

### Non-interactive

You can also pass command line arguments to set up a new project
non-interactively. See `create-206-app --help`:

```bash
create-206-app <project-directory> [options]

Options:
  -V, --version                      output the version number
  --ts, --typescript

    Initialize as a TypeScript project. (default)

  --js, --javascript

    Initialize as a JavaScript project.

  --use-npm

    Explicitly tell the CLI to bootstrap the app using npm

  --use-pnpm

    Explicitly tell the CLI to bootstrap the app using pnpm

  --use-yarn

    Explicitly tell the CLI to bootstrap the app using Yarn

  -e, --example [name]|[github-url]

    An example to bootstrap the app with. You can use an example name
    from the official Next.js repo or a GitHub URL. The URL can use
    any branch and/or subdirectory

  --example-path <path-to-example>

    In a rare case, your GitHub URL might contain a branch name with
    a slash (e.g. bug/fix-1) and the path to the example (e.g. foo/bar).
    In this case, you must specify the path to the example separately:
    --example-path foo/bar
```

### Why use Create Studio 206 app?

`create-206-app` allows you to create a new Studio 206 app within seconds. It is officially maintained by the creators of Next.js, and includes a number of benefits:

- **Interactive Experience**: Running `npx create-206-app@latest` (with no arguments) launches an interactive experience that guides you through setting up a project.
- **Zero Dependencies**: Initializing a project is as quick as one second. Create Studio 206 app has zero dependencies.
- **Offline Support**: Create Studio 206 app will automatically detect if you're offline and bootstrap your project using your local package cache.
- **Support for Examples**: Create Studio 206 app can bootstrap your application using an example from the Next.js examples collection (e.g. `npx create-206-app --example api-routes`).

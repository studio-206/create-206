#!/usr/bin/env node

import { createApp, DownloadError } from "./create-app";
import { getPkgManager } from "./helpers/get-pkg-manager";
import { isFolderEmpty } from "./helpers/is-folder-empty";
import { validateNpmName } from "./helpers/validate-pkg";
import packageJson from "./package.json";
import chalk from "chalk";

import Commander from "commander";
import Conf from "conf";
import fs from "fs";
import path from "path";
import prompts from "prompts";
import checkForUpdate from "update-check";

let projectPath: string = "";

const handleSigTerm = () => process.exit(0);

process.on("SIGINT", handleSigTerm);
process.on("SIGTERM", handleSigTerm);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onPromptState = (state: any) => {
  if (state.aborted) {
    // If we don't re-enable the terminal cursor before exiting
    // the program, the cursor will remain hidden
    process.stdout.write("\x1B[?25h");
    process.stdout.write("\n");
    process.exit(1);
  }
};

const program = new Commander.Command(packageJson.name)
  .version(packageJson.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action(name => {
    projectPath = name;
  })
  .option(
    "-t, --template [name]|[github-url]",
    `

  An template to bootstrap the app with. You can use an template name
  from the Create 206 repo or a GitHub URL. The URL can use
  any branch and/or subdirectory
`,
  )
  .option(
    "--template-path <path-to-template>",
    `

  In a rare case, your GitHub URL might contain a branch name with
  a slash (e.g. bug/fix-1) and the path to the template (e.g. foo/bar).
  In this case, you must specify the path to the template separately:
  --template-path foo/bar
`,
  )
  .option(
    "--reset-preferences",
    `

  Explicitly tell the CLI to reset any stored preferences
`,
  )
  .option(
    "--branch <branch>",
    `Specify a branch other than the repo's main branch to download a 
    template from. This is useful for downloading testing a template 
    that is not yet merged into the main branch.`,
  )
  .allowUnknownOption()
  .parse(process.argv);

const packageManager = !!program.useNpm
  ? "npm"
  : !!program.usePnpm
    ? "pnpm"
    : !!program.useYarn
      ? "yarn"
      : getPkgManager();

async function run(): Promise<void> {
  const conf = new Conf({ projectName: "create-next-app" });

  if (program.resetPreferences) {
    conf.clear();
    console.log("Preferences reset successfully");
    return;
  }

  if (typeof projectPath === "string") {
    projectPath = projectPath.trim();
  }

  if (!projectPath) {
    const res = await prompts({
      onState: onPromptState,
      type: "text",
      name: "path",
      message: "What is your project named?",
      initial: "my-app",
      validate: name => {
        const validation = validateNpmName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }
        return "Invalid project name: " + validation.problems![0];
      },
    });

    if (typeof res.path === "string") {
      projectPath = res.path.trim();
    }
  }

  if (!projectPath) {
    console.log(
      "\nPlease specify the project directory:\n" +
        `  ${chalk.cyan(program.name())} ${chalk.green("<project-directory>")}\n` +
        "For example:\n" +
        `  ${chalk.cyan(program.name())} ${chalk.green("my-next-app")}\n\n` +
        `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`,
    );
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const { valid, problems } = validateNpmName(projectName);
  if (!valid) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${projectName}"`,
      )} because of npm naming restrictions:`,
    );

    problems!.forEach(p => console.error(`    ${chalk.red.bold("*")} ${p}`));
    process.exit(1);
  }

  if (program.example === true) {
    console.error("Please provide an example name or url, otherwise remove the example option.");
    process.exit(1);
  }

  /**
   * Verify the project dir is empty or doesn't exist
   */
  const root = path.resolve(resolvedProjectPath);
  const appName = path.basename(root);
  const folderExists = fs.existsSync(root);

  if (folderExists && !isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  let template = typeof program.template === "string" && program.template.trim();
  const preferences = (conf.get("preferences") || {}) as Record<string, boolean | string>;
  /**
   * If the user does not provide the necessary flags, prompt them for which
   * template to use.
   */
  if (!template) {
    const { template: selectedTemplate } = await prompts({
      type: "select",
      name: "template",
      message: "Select a template",
      choices: [
        {
          title: "Default",
          value: "default",
        },
      ],
    });

    template = selectedTemplate;
  }

  const customBranch = program.branch || null;

  try {
    await createApp({
      appPath: resolvedProjectPath,
      example: template ? template : undefined,
      options: {
        customBranch: customBranch,
      },
    });
  } catch (reason) {
    if (!(reason instanceof DownloadError)) {
      throw reason;
    }

    throw reason;
  }
  conf.set("preferences", preferences);
}

const update = checkForUpdate(packageJson).catch(() => null);

async function notifyUpdate(): Promise<void> {
  try {
    const res = await update;
    if (res?.latest) {
      const updateMessage =
        packageManager === "yarn"
          ? "yarn global add create-next-app"
          : packageManager === "pnpm"
            ? "pnpm add -g create-next-app"
            : "npm i -g create-next-app";

      console.log(
        chalk.yellow.bold("A new version of `create-next-app` is available!") +
          "\n" +
          "You can update by running: " +
          chalk.cyan(updateMessage) +
          "\n",
      );
    }
    process.exit();
  } catch {
    // ignore error
  }
}

run()
  .then(notifyUpdate)
  .catch(async reason => {
    console.log();
    console.log("Aborting installation.");
    if (reason.command) {
      console.log(`  ${chalk.cyan(reason.command)} has failed.`);
    } else {
      console.log(chalk.red("Unexpected error. Please report it as a bug:") + "\n", reason);
    }
    console.log();

    await notifyUpdate();

    process.exit(1);
  });

import retry from "async-retry";
import chalk from "chalk";
import fs from "fs";
import path from "path";

import {
  downloadAndExtractExample,
  downloadAndExtractRepo,
  existsInRepo,
  getRepoInfo,
  hasRepo,
  RepoInfo,
} from "./helpers/examples";
import { tryGitInit } from "./helpers/git";
import { install } from "./helpers/install";
import { isFolderEmpty } from "./helpers/is-folder-empty";
import { getOnline } from "./helpers/is-online";
import { isWriteable } from "./helpers/is-writeable";

export class DownloadError extends Error {}

type CreateAppOptions = {
  customBranch: string;
};

export async function createApp({
  appPath,
  example,
  examplePath,
  options: { customBranch },
}: {
  appPath: string;
  example?: string;
  examplePath?: string;
  options: CreateAppOptions;
}): Promise<void> {
  let repoInfo: RepoInfo | undefined;
  const packageManager = "yarn";

  if (example) {
    let repoUrl: URL | undefined;

    try {
      repoUrl = new URL(example);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code !== "ERR_INVALID_URL") {
        console.error(error);
        process.exit(1);
      }
    }

    if (repoUrl) {
      if (repoUrl.origin !== "https://github.com") {
        console.error(
          `Invalid URL: ${chalk.red(
            `"${example}"`,
          )}. Only GitHub repositories are supported. Please use a GitHub URL and try again.`,
        );
        process.exit(1);
      }

      repoInfo = await getRepoInfo(repoUrl, examplePath);

      if (!repoInfo) {
        console.error(
          `Found invalid GitHub URL: ${chalk.red(
            `"${example}"`,
          )}. Please fix the URL and try again.`,
        );
        process.exit(1);
      }

      const found = await hasRepo(repoInfo);

      if (!found) {
        console.error(
          `Could not locate the repository for ${chalk.red(
            `"${example}"`,
          )}. Please check that the repository exists and try again.`,
        );
        process.exit(1);
      }
    } else if (example !== "__internal-testing-retry") {
      const found = await existsInRepo(example, customBranch);

      if (!found) {
        console.error(
          `Could not locate a template named ${chalk.red(
            `"${example}"`,
          )}. It could be due to the following:\n`,
          `1. Your spelling of template ${chalk.red(`"${example}"`)} might be incorrect.\n`,
          "2. You might not be connected to the internet or you are behind a proxy.",
        );
        process.exit(1);
      }
    }
  }

  const root = path.resolve(appPath);

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      "The application path is not writable, please check folder permissions and try again.",
    );
    console.error("It is likely you do not have write permissions for this folder.");
    process.exit(1);
  }

  const appName = path.basename(root);

  fs.mkdirSync(root, { recursive: true });

  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  const useYarn = packageManager === "yarn";
  const isOnline = !useYarn || (await getOnline());
  const originalDirectory = process.cwd();

  console.log(`Creating a new Studio 206 app in ${chalk.green(root)}.`);
  console.log();

  process.chdir(root);

  const packageJsonPath = path.join(root, "package.json");
  let hasPackageJson = false;

  if (example) {
    /**
     * If an example repository is provided, clone it.
     */
    try {
      if (repoInfo) {
        const repoInfo2 = repoInfo;
        console.log(
          `Downloading files from repo ${chalk.cyan(example)}. This might take a moment.`,
        );
        console.log();
        await retry(() => downloadAndExtractRepo(root, repoInfo2), {
          retries: 3,
        });
      } else {
        console.log(
          `Downloading files for example ${chalk.cyan(example)}. This might take a moment.`,
        );
        console.log();
        await retry(() => downloadAndExtractExample(root, example, customBranch), {
          retries: 3,
        });
      }
    } catch (reason) {
      // TODO:
      // eslint-disable-next-line no-inner-declarations
      function isErrorLike(err: unknown): err is { message: string } {
        return (
          typeof err === "object" &&
          err !== null &&
          typeof (err as { message?: unknown }).message === "string"
        );
      }
      console.error(reason);
      throw new DownloadError(isErrorLike(reason) ? reason.message : reason + "");
    }

    hasPackageJson = fs.existsSync(packageJsonPath);
    if (hasPackageJson) {
      console.log("Installing packages. This might take a couple of minutes.");
      console.log();

      await install(root, null, { packageManager, isOnline });
      console.log();
    }
  } else {
    console.error("You need to specify an example to create the app from.");
    process.exit(1);
  }

  if (tryGitInit(root)) {
    console.log("Initialized a git repository.");
    console.log();
  }

  let cdpath: string;
  if (path.join(originalDirectory, appName) === appPath) {
    cdpath = appName;
  } else {
    cdpath = appPath;
  }

  console.log(`${chalk.green("Success!")} Created ${appName} at ${appPath}`);

  if (hasPackageJson) {
    console.log("Inside that directory, you can run several commands:");
    console.log();
    console.log(chalk.cyan(`  ${packageManager} ${useYarn ? "" : "run "}dev`));
    console.log("    Starts the development server.");
    console.log();
    console.log(chalk.cyan(`  ${packageManager} ${useYarn ? "" : "run "}build`));
    console.log("    Builds the app for production.");
    console.log();
    console.log(chalk.cyan(`  ${packageManager} start`));
    console.log("    Runs the built app in production mode.");
    console.log();
    console.log("We suggest that you begin by typing:");
    console.log();
    console.log(chalk.cyan("  cd"), cdpath);
    console.log(`  ${chalk.cyan(`${packageManager} ${useYarn ? "" : "run "}dev`)}`);
  }
  console.log();
}

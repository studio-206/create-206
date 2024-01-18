/* eslint-disable import/no-extraneous-dependencies */
import { createWriteStream, promises as fs } from "fs";
import got from "got";
import { tmpdir } from "os";
import { join } from "path";
import { Stream } from "stream";
import tar from "tar";
import { promisify } from "util";

const pipeline = promisify(Stream.pipeline);

export type RepoInfo = {
  username: string;
  name: string;
  branch: string;
  filePath: string;
};

export async function isUrlOk(url: string): Promise<boolean> {
  const res = await got.head(url).catch(e => e);
  return res.statusCode === 200;
}

export async function getRepoInfo(url: URL, examplePath?: string): Promise<RepoInfo | undefined> {
  const [, username, name, t, _branch, ...file] = url.pathname.split("/");
  const filePath = examplePath ? examplePath.replace(/^\//, "") : file.join("/");

  if (
    // Support repos whose entire purpose is to be a NextJS example, e.g.
    // https://github.com/:username/:my-cool-nextjs-example-repo-name.
    t === undefined ||
    // Support GitHub URL that ends with a trailing slash, e.g.
    // https://github.com/:username/:my-cool-nextjs-example-repo-name/
    // In this case "t" will be an empty string while the next part "_branch" will be undefined
    (t === "" && _branch === undefined)
  ) {
    const infoResponse = await got(`https://api.github.com/repos/${username}/${name}`).catch(
      e => e,
    );
    if (infoResponse.statusCode !== 200) {
      return;
    }
    const info = JSON.parse(infoResponse.body);
    return { username, name, branch: info["default_branch"], filePath };
  }

  // If examplePath is available, the branch name takes the entire path
  const branch = examplePath
    ? `${_branch}/${file.join("/")}`.replace(new RegExp(`/${filePath}|/$`), "")
    : _branch;

  if (username && name && branch && t === "tree") {
    return { username, name, branch, filePath };
  }
}

export function hasRepo({ username, name, branch, filePath }: RepoInfo): Promise<boolean> {
  const contentsUrl = `https://api.github.com/repos/${username}/${name}/contents`;
  const packagePath = `${filePath ? `/${filePath}` : ""}/package.json`;

  return isUrlOk(contentsUrl + packagePath + `?ref=${branch}`);
}

export function existsInRepo(nameOrUrl: string, branch: string): Promise<boolean> {
  const branchPath = branch ? `?ref=${branch}` : "";

  try {
    const url = new URL(nameOrUrl);
    return isUrlOk(url.href);
  } catch {
    return isUrlOk(
      `https://api.github.com/repos/studio-206/create-206/contents/templates/${encodeURIComponent(
        nameOrUrl,
      )}${branchPath}`,
    );
  }
}

async function downloadTar(url: string) {
  const tempFile = join(tmpdir(), `next.js-cna-example.temp-${Date.now()}`);
  await pipeline(got.stream(url), createWriteStream(tempFile));
  return tempFile;
}

export async function downloadAndExtractRepo(
  root: string,
  { username, name, branch, filePath }: RepoInfo,
) {
  const tempFile = await downloadTar(
    `https://codeload.github.com/${username}/${name}/tar.gz/${branch}`,
  );

  await tar.x({
    file: tempFile,
    cwd: root,
    strip: filePath ? filePath.split("/").length + 1 : 1,
    filter: p =>
      p.startsWith(`${name}-${branch.replace(/\//g, "-")}${filePath ? `/${filePath}/` : "/"}`),
  });

  await fs.unlink(tempFile);
}

export async function downloadAndExtractExample(root: string, name: string, branch: string) {
  if (name === "__internal-testing-retry") {
    throw new Error("This is an internal example for testing the CLI.");
  }

  const tempFile = await downloadTar(
    `https://codeload.github.com/studio-206/create-206/tar.gz/${branch}`,
  );

  await tar.x({
    file: tempFile,
    cwd: root,
    strip: 2 + name.split("/").length,
    filter: p => p.includes(`create-206-${branch.replace("/", "-")}/templates/${name}`),
  });

  await fs.unlink(tempFile);
}

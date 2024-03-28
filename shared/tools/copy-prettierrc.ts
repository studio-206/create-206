/**
 * This will take the `/shared/src/.pretterrc` file and replace it:
 *
 * - `./templates/default-app/.prettierrc`
 * - `./templates/default-pages/.prettierrc`
 * - `./templates/sanity-pages/.prettierrc`
 */

import fs from "fs-extra";
import { templateSlugs } from "./constants";

const outpath = (slug: string) => `./templates/${slug}/.prettierrc`;

templateSlugs.forEach(slug => {
  fs.copySync("./shared/src/.prettierrc", outpath(slug));
  console.log("Updating .prettierrc for", slug);
});

/**
 * This will take the `/shared/eslint-config-studio-206` directory and replace it:
 *
 * - `./templates/default-app/packages/eslint-config-studio-206`
 * - `./templates/default-pages/packages/eslint-config-studio-206`
 * - `./templates/sanity-pages/packages/eslint-config-studio-206`
 */

import fs from "fs-extra";

const templateSlugs = ["default-app", "default-pages", "sanity-pages"];

const makeDir = (slug: string) => `./templates/${slug}/packages/eslint-config-studio-206`;

templateSlugs.forEach(slug => {
  fs.copySync("./shared/eslint-config-studio-206", makeDir(slug));
  console.log("Updating eslint-config for", slug);
});

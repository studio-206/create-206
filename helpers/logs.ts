import chalk from "chalk";

export const logBranch = (branch: string) =>
  console.log("\nUsing branch", chalk.bold.rgb(247, 107, 100)(branch), "\n");

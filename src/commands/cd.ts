import fs from "fs";
import { error, warn } from "../utils/clihelp";
import { Command } from "../types/command";

export const cd: Command = {
  command: "cd",
  description: "Changes the current working directory.",
  arguments: "<directoryPath>",
  callback(args) {
    if (args.length > 0) {
      let targetDir = args[0];
      if (fs.existsSync(targetDir) && fs.lstatSync(targetDir).isDirectory()) {
        process.chdir(targetDir);
      } else {
        return error(`cd: '${targetDir}' does not exist or is not a valid directory.`);
      }
    } else {
      return warn("Usage: cd <path>");
    }
  },
};

import fs from "fs";
import { output } from "../utils/clihelp";
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
        return output({
          message: `cd: '${targetDir}' does not exist or is not a valid directory.`,
          messageType: "error",
          usePrefix: true,
        });
      }
    } else {
      return output({
        message: "Usage: cd <path>",
        messageType: "warning",
        usePrefix: false,
      });
    }
  },
};

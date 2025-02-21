import fs from "fs";
import { output } from "../utils/clihelp";
import { Command } from "../types/command";

export const cd: Command = {
  command: "cd",
  description: "Changes the current working directory.",
  arguments: [{ argument: "dir", required: true, description: "The directory you want to change to." }],
  callback(args) {
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
  },
};

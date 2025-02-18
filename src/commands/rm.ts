import fs from "fs";
import { error, warn } from "../utils/clihelp";
import { Command } from "../types/types";

export const rm: Command = {
  command: "rm",
  description: "Removes an item at the given path.",
  callback(args) {
    if (args.length > 0) {
      for (const targetPath of args) {
        if (fs.existsSync(targetPath)) {
          try {
            fs.rmSync(targetPath);
          } catch (err: any) {
            return error(`rm: '${targetPath}' does not exist or is not a file.`);
          }
        } else {
          return error(`rm: '${targetPath}' does not exist or is not a file.`);
        }
      }
    } else {
      return warn("Usage: rm <filePath>");
    }
  },
};

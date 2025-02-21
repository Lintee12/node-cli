import fs from "fs";
import { Command } from "../types/command";
import { output } from "../utils/clihelp";

export const rm: Command = {
  command: "rm",
  description: "Removes an item at the given path.",
  arguments: [{ argument: "file...", required: true, description: "All paths of the files you wish to delete." }],
  documentation: "Can take a list of file paths.",
  callback(args) {
    for (const targetPath of args) {
      if (fs.existsSync(targetPath)) {
        try {
          fs.rmSync(targetPath);
        } catch (err: any) {
          return output({
            message: `rm: '${targetPath}' does not exist or is not a file.`,
            messageType: "error",
          });
        }
      } else {
        return output({
          message: `rm: '${targetPath}' does not exist or is not a file.`,
          messageType: "error",
        });
      }
    }
  },
};

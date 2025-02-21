import path from "path";
import fs from "fs";
import { Command } from "../types/command";
import { output } from "../utils/clihelp";

export const mk: Command = {
  command: "mk",
  description: "Creates a new item at the provided path.",
  arguments: [{ argument: "file...", required: true, description: "All paths of the files you wish to create." }],
  callback(args) {
    for (const targetPath of args) {
      if (fs.existsSync(targetPath)) {
        return output({
          message: `mk: '${targetPath}' already exists.`,
          messageType: "error",
        });
      } else {
        const dirPath = path.dirname(targetPath);
        if (!fs.existsSync(dirPath)) {
          try {
            fs.mkdirSync(dirPath, { recursive: true });
          } catch (err: any) {
            return output({
              message: `mk: Failed to create directories.`,
              messageType: "error",
            });
          }
        }

        try {
          fs.writeFileSync(targetPath, "");
        } catch (err: any) {
          return output({
            message: `mk: Failed to create file.`,
            messageType: "error",
          });
        }
      }
    }
  },
};

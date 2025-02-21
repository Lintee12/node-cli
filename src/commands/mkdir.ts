import fs from "fs";
import { Command } from "../types/command";
import { output } from "../utils/clihelp";

export const mkdir: Command = {
  command: "mkdir",
  description: "Creates a new directory based on the given path.",
  arguments: "<dir...>",
  documentation: "Can take a list of file paths.",
  callback(args) {
    if (args.length > 0) {
      for (const targetPath of args) {
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath, { recursive: true });
        } else {
          return output({
            message: `mkdir: '${targetPath}' already exists.`,
            messageType: "error",
            usePrefix: true,
          });
        }
      }
    } else {
      return output({
        message: "Usage: mkdir <path>",
        messageType: "warning",
        usePrefix: false,
      });
    }
  },
};

import fs from "fs";
import { error, warn } from "../utils/clihelp";
import { Command } from "../types/types";

export const mkdir: Command = {
  command: "mkdir",
  description: "Creates a new directory based on the given path.",
  callback(args) {
    if (args.length > 0) {
      for (const targetPath of args) {
        if (!fs.existsSync(targetPath)) {
          fs.mkdirSync(targetPath, { recursive: true });
        } else {
          return error(`mkdir: '${targetPath}' already exists.`);
        }
      }
    } else {
      return warn("Usage: mkdir <path>");
    }
  },
};

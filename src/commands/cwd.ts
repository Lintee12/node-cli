import { Command } from "../types/command";

export const cwd: Command = {
  command: "cwd",
  description: "Displays the current working directory path.",
  callback(args) {
    return process.cwd();
  },
};

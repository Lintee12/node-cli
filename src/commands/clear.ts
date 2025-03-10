import { Command } from "../types/command";

export const clear: Command = {
  command: "clear",
  description: "Clears the terminal window.",
  callback(args) {
    return console.clear();
  },
};

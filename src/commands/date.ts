import { Command } from "../types/command";

export const date: Command = {
  command: "date",
  description: "Displays the current date.",
  callback(args) {
    return new Date().toDateString();
  },
};

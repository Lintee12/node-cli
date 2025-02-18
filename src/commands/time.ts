import { Command } from "../types/types";

export const time: Command = {
  command: "time",
  description: "Displays the current time.",
  callback(args) {
    return new Date().toTimeString();
  },
};

import { Command } from "../types/command";

export const random: Command = {
  command: "random",
  description: "Generates a random number between 0 and 1",
  callback(args) {
    return Math.random();
  },
};

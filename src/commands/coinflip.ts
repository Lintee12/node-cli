import { Command } from "../types/command";

export const coinflip: Command = {
  command: "coinflip",
  description: "Returns either Heads or Tails.",
  callback(args) {
    return Math.random() < 0.5 ? "Heads" : "Tails";
  },
};

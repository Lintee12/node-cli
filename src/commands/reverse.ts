import { Command } from "../types/command";

export const reverse: Command = {
  command: "reverse",
  description: "Reverses the provided input string.",
  arguments: [{ argument: "string...", required: false, description: "The string or strings you want to reverse." }],
  callback(args) {
    return args.join(" ").replace("reverse", "").trimStart().split("").reverse().join("");
  },
};

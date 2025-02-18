import { Command } from "../types/types";

export const reverse: Command = {
  command: "reverse",
  description: "Reverses the provided input string.",
  callback(args) {
    return args.join(" ").replace("reverse", "").trimStart().split("").reverse().join("");
  },
};

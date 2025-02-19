import { Command } from "../types/command";

export const reverse: Command = {
  command: "reverse",
  description: "Reverses the provided input string.",
  arguments: "<string...>",
  callback(args) {
    return args
      .join(" ")
      .replace("reverse", "")
      .trimStart()
      .split("")
      .reverse()
      .join("");
  },
};

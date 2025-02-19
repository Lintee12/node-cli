import { Command } from "../types/command";

export const echo: Command = {
  command: "echo",
  description: "Echoes the provided input back to the console.",
  arguments: "<string>",
  callback(args) {
    return args.join(" ").replace("echo", "").trimStart();
  },
};

import { Command } from "../types/types";

export const echo: Command = {
  command: "echo",
  description: "Echoes the provided input back to the console.",
  callback(args) {
    return args.join(" ").replace("echo", "").trimStart();
  },
};

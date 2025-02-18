import { Command } from "../types/types";
import { rl } from "../utils/readline";

export const exit: Command = {
  command: "exit",
  description: "Quits the application.",
  callback(args) {
    rl.close();
    process.exit();
  },
};

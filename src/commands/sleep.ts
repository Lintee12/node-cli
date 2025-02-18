import { Command } from "../types/types";
import { error, warn } from "../utils/clihelp";

export const sleep: Command = {
  command: "sleep",
  description: "Pauses for the specified number of milliseconds.",
  callback: async (args) => {
    if (args.length > 0) {
      const ms = parseInt(args[0], 10);
      if (isNaN(ms)) {
        return error(`sleep: '${args[0]}' is not a valid number.`);
      } else {
        await new Promise((resolve) => setTimeout(resolve, ms));
      }
    } else {
      return warn("Usage: sleep <number>");
    }
  },
};

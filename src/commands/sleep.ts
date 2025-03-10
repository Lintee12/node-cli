import { Command } from "../types/command";
import { output } from "../utils/clihelp";

export const sleep: Command = {
  command: "sleep",
  description: "Pauses for the specified number of milliseconds.",
  arguments: [{ argument: "ms", required: true, description: "The amount of milliseconds you want the program to sleep for." }],
  documentation: "Sleeps the program for the provided number of <ms>.",
  callback: async (args) => {
    const ms = parseInt(args[0], 10);
    if (isNaN(ms)) {
      return output({
        message: `sleep: '${args[0]}' is not a valid number.`,
        messageType: "error",
      });
    } else {
      await new Promise((resolve) => setTimeout(resolve, ms));
    }
  },
};

import { Command } from "../types/command";
import { warn } from "../utils/clihelp";

export const sort: Command = {
  command: "sort",
  description: "Sorts the provided list of strings alphabetically.",
  arguments: "<string...>",
  callback(args) {
    if (args.length > 0) {
      const words = args.length === 1 && typeof args[0] === "string" ? args[0].split(" ") : args;
      const sortedArgs = words.sort();
      return sortedArgs.join(" ");
    } else {
      return warn("Usage: sort <string[]>");
    }
  },
};

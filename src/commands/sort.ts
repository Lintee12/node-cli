import { Command } from "../types/command";
import { output } from "../utils/clihelp";

export const sort: Command = {
  command: "sort",
  description: "Sorts the provided list of strings alphabetically.",
  arguments: [{ argument: "string...", required: false, description: "The strings you want to sort." }],
  callback(args) {
    const words = args.length === 1 && typeof args[0] === "string" ? args[0].split(" ") : args;
    const sortedArgs = words.sort();
    return sortedArgs.join(" ");
  },
};

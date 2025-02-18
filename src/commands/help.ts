import { Command } from "../types/types";
import buildSpace from "../utils/clihelp";
import { commands } from "../utils/commands";

export const help: Command = {
  command: "help",
  description: "Displays a list of all commands.",
  callback(args) {
    let longestCommand = commands.reduce(
      (longest, command) => (command.command.length > longest.length ? command.command : longest),
      ""
    );
    let help = "";
    commands.forEach((command, index) => {
      help +=
        command.command +
        buildSpace(longestCommand.length - command.command.length + 4) +
        command.description +
        `${index !== commands.length - 1 ? "\n" : ""}`;
    });
    return help;
  },
};

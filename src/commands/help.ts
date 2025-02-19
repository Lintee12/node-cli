import { Command } from "../types/command";
import buildSpace, { error, getCommandByName, isValidCommand, parseArguments } from "../utils/clihelp";
import { commands } from "../utils/commands";

export const help: Command = {
  command: "help",
  description: "Displays a list of all commands.",
  arguments: "<command>",
  callback(args) {
    if (args.length > 0) {
      if (isValidCommand(args[0])) {
        const command = getCommandByName(args[0]);
        return `Command: ${command?.command}\nFlags: ${`[${command?.flags?.join(" ")}]` || "None"}\nArguments: ${
          command?.arguments || "None"
        }\nDescription: ${command?.description}`;
      } else {
        return error(`help: '${args[0]}' is not a valid command.`);
      }
    } else {
      let longestCommandPrefix = commands.reduce((longest, command) => {
        const commandWithFlagsLength = command.command.length + `${command.flags ? `[${command.flags.join(" ")}]` : ""}`.length;
        return commandWithFlagsLength > longest ? commandWithFlagsLength : longest;
      }, 0);

      const sortedCommands = [...commands].sort((a, b) => a.command.localeCompare(b.command));

      let help = "";
      sortedCommands.forEach((command, index) => {
        let commandString = command.command;
        commandString += `${buildSpace(1)}${command.flags ? `[${command.flags.join(" ")}]` : ""}`;

        const spaceToAdd = longestCommandPrefix - commandString.length + 4;

        help += commandString + buildSpace(spaceToAdd) + command.description;

        help += `${index !== sortedCommands.length - 1 ? "\n" : ""}`;
      });

      return help;
    }
  },
};

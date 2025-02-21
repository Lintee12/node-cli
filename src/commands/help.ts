import colors from "ansi-colors";
import { Command } from "../types/command";
import buildSpace, { getCommandByName, isValidCommand, output } from "../utils/clihelp";
import { commands } from "../utils/commands";

export const help: Command = {
  command: "help",
  description: "Displays a list of all commands, or detailed information about a specific command.",
  arguments: "<cmd> [-info]",
  documentation:
    "Use 'help' to get a list of all installed commands.\nUse 'help <commandName>' to get more information on a specific command.\nUse 'help -info' to get more info about the command line.",
  callback(args) {
    if (args.length > 0) {
      const commandName = args[0];

      if (!isValidCommand(commandName)) {
        return output({
          message: `help: '${commandName}' is not a valid command.`,
          messageType: "error",
        });
      }

      const command = getCommandByName(commandName);
      const argumentsInfo = command?.arguments || "";
      const description = command?.description || "No Description for this command...";
      const documentation = command?.documentation || "No Documentation for this command...";

      return `${colors.blueBright(`${command?.command} ${argumentsInfo}`)}\n\n${colors.bold(
        "Description:"
      )}\n${description}\n\n${colors.bold("Documentation:")}\n${documentation}`;
    }

    let longestCommandPrefix = commands.reduce((longest, command) => {
      const commandWithArgumentsLength = command.command.length + (command.arguments ? `<${command.arguments}>`.length : 0);
      return Math.max(longest, commandWithArgumentsLength);
    }, 0);

    const sortedCommands = [...commands].sort((a, b) => a.command.localeCompare(b.command));

    let helpText = "";

    sortedCommands.forEach((command, index) => {
      let commandString = `${command.command} ${command.arguments ? `${command.arguments}` : ""}`;
      const spaceToAdd = longestCommandPrefix - commandString.length + 4;

      helpText += `${commandString}${buildSpace(spaceToAdd)}${command.description}`;
      helpText += index !== sortedCommands.length - 1 ? "\n" : "";
    });

    return helpText;
  },
};

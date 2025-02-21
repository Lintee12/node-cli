import colors from "ansi-colors";
import { Command } from "../types/command";
import buildSpace, { generateCommandTemplate, getCommandByName, isValidCommand, output } from "../utils/clihelp";
import { commands } from "../utils/commands";

export const help: Command = {
  command: "help",
  description: "Displays a list of all commands, or detailed information about a specific command.",
  arguments: [{ argument: "cmd", required: false, description: "The name of the command you want more information on." }],
  flags: [{ flag: "-info", description: "Use to get more info about the command line." }],
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
      const description = command?.description || "No Description for this command...";
      const documentation = command?.documentation || "No Documentation for this command.";

      const argumentsInfo = command?.arguments
        ? command.arguments
            .map((arg) => {
              return `${colors.bold(arg.argument)}: ${arg.description || "No description"} (Required: ${arg.required})`;
            })
            .join("\n")
        : "No arguments for this command.";

      const flagsInfo = command?.flags
        ? command.flags
            .map((flag) => {
              return `${colors.bold(flag.flag)}: ${flag.description || "No description"}`;
            })
            .join("\n")
        : "No flags for this command.";

      if (command) {
        return `${colors.blueBright(generateCommandTemplate(command))}\n\n${colors.bold(
          "Description:"
        )}\n${description}\n\n${colors.bold("Arguments:")}\n${argumentsInfo}\n\n${colors.bold(
          "Flags:"
        )}\n${flagsInfo}\n\n${colors.bold("Documentation:")}\n${documentation}`;
      } else {
        return output({ message: `generating help for '${commandName}'`, usePrefix: true, messageType: "error" });
      }
    }

    let longestCommandPrefix = commands.reduce((longest, command) => {
      const commandWithArgumentsLength = command.command.length + (command.arguments ? `<${command.arguments}>`.length : 0);
      return Math.max(longest, commandWithArgumentsLength);
    }, 0);

    const sortedCommands = [...commands].sort((a, b) => a.command.localeCompare(b.command));

    let helpText = "";

    sortedCommands.forEach((command, index) => {
      let commandString = `${generateCommandTemplate(command)}`;
      const spaceToAdd = longestCommandPrefix - commandString.length;

      helpText += `${commandString}${buildSpace(spaceToAdd)}${command.description}`;
      helpText += index !== sortedCommands.length - 1 ? "\n" : "";
    });

    return helpText;
  },
};

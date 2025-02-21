import path from "node:path";
import { output } from "../utils/clihelp";
import fs from "node:fs";
import { addCommand } from "../utils/commands";
import { Command } from "../types/command";
import os from "os";

export const install: Command = {
  command: "install",
  description: "Installs a command from a js file.",
  arguments: [{ argument: "file", required: true, description: "The path to the file that contains the command module" }],
  callback: async (args) => {
    const fullFilePath = path.resolve(`${args[0]}`);

    if (!fs.existsSync(fullFilePath)) {
      return output({
        message: `install: '${args[0]}' does not exist or is not a file.`,
        messageType: "error",
      });
    }

    try {
      const importedModule = await import(`${os.platform().includes("win") ? "file://" : ""}${fullFilePath}`);
      const newCommand = importedModule.default || importedModule;

      if (newCommand.command && newCommand.description && typeof newCommand.callback === "function") {
        addCommand({
          command: newCommand.command,
          description: newCommand.description,
          callback: newCommand.callback,
        });

        return output({
          message: `Command '${newCommand.command}' installed successfully!`,
          messageType: "success",
        });
      } else {
        return output({
          message:
            "install: The file must export an object with 'command: string', 'description: string', and 'callback: (args?: string[]) => string | void'.",
          messageType: "error",
        });
      }
    } catch (e: any) {
      return output({
        message: `Error loading the file. ${e}`,
        messageType: "error",
      });
    }
  },
};

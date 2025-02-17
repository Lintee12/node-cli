import path from "node:path";
import { error, success, warn } from "../utils/clihelp";
import fs from "node:fs";
import { addCommand } from "../utils/commands";

export async function install(args?: string[]) {
  if (!args || args.length === 0) {
    return warn("Usage: install <filePath>");
  }

  const fullFilePath = path.resolve(args[0]);

  if (!fs.existsSync(fullFilePath)) {
    return error(`install: '${args[0]}' does not exist or is not a file.`);
  }

  try {
    const importedModule = await import(`file://${fullFilePath}`);
    const newCommand = importedModule.default || importedModule;

    if (newCommand.command && newCommand.description && typeof newCommand.callback === "function") {
      addCommand({
        command: newCommand.command,
        description: newCommand.description,
        callback: newCommand.callback,
      });
      return success(`Command '${newCommand.command}' installed successfully!`);
    } else {
      return error(
        "install: The file must export an object with 'command: string', 'description: string', and 'callback: (args?: string[]) => string | void'."
      );
    }
  } catch (e: any) {
    return error(`Error loading the file.`);
  }
}

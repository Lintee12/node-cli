import fs from "node:fs";
import readline from "readline";
import handleInput from "../utils/handleInput";
import { Command } from "../types/command";
import { output } from "../utils/clihelp";

export const exec: Command = {
  command: "exec",
  description: "Executes a list of commands line by line form the provided file.",
  arguments: "<file>",
  argumentsRequired: true,
  callback: async (args) => {
    let targetPath = args[0];
    if (fs.existsSync(targetPath)) {
      const fileStream = fs.createReadStream(targetPath);

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      const lines: string[] = [];

      try {
        rl.on("line", (line) => {
          if (!line.startsWith("#")) {
            lines.push(line);
          }
        });

        await new Promise<void>((resolve, reject) => {
          rl.on("close", () => {
            resolve();
          });

          rl.on("error", (err) => {
            reject();
            return output({
              message: `rm: failed to read '${targetPath}': ${err.message}`,
              messageType: "error",
              usePrefix: true,
            });
          });
        });

        for (const line of lines) {
          await handleInput(line);
        }

        return;
      } catch (err: any) {
        return output({
          message: `exec: failed to process the file: ${err.message}`,
          messageType: "error",
          usePrefix: true,
        });
      }
    } else {
      return output({
        message: `exec: '${targetPath}' does not exist or is not a file.`,
        messageType: "error",
        usePrefix: true,
      });
    }
  },
};

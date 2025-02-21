import { Command } from "../types/command";
import { output } from "../utils/clihelp";
import fs from "fs";
import readline from "readline";

export const cat: Command = {
  command: "cat",
  arguments: "<file>",
  argumentsRequired: true,
  description: "Outputs the contents of a file to the screen.",
  documentation: "Used to quickly read the contents of files containing text.",
  callback: async (args) => {
    const targetPath = args[0];
    if (fs.existsSync(targetPath)) {
      const fileStream = fs.createReadStream(targetPath);

      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      });

      const lines: string[] = [];

      try {
        rl.on("line", (line) => {
          lines.push(line);
        });

        await new Promise<void>((resolve, reject) => {
          rl.on("close", () => {
            resolve();
          });

          rl.on("error", (err) => {
            reject();
            return output({
              message: `cat: failed to read '${targetPath}': ${err.message}`,
              messageType: "error",
              usePrefix: true,
            });
          });
        });

        return lines.join("\n");
      } catch (err: any) {
        return output({
          message: `cat: failed to process the file: ${err.message}`,
          messageType: "error",
          usePrefix: true,
        });
      }
    } else {
      return output({
        message: `cat: '${targetPath}' does not exist or is not a file.`,
        messageType: "error",
        usePrefix: true,
      });
    }
  },
};

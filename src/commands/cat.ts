import { Command } from "../types/command";
import { error, warn } from "../utils/clihelp";
import fs from "fs";
import readline from "readline";

export const cat: Command = {
  command: "cat",
  arguments: "<filePath>",
  description: "Outputs the contents of a file to the screen.",
  callback: async (args) => {
    if (args.length > 0) {
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
              return error(
                `cat: failed to read '${targetPath}': ${err.message}`
              );
            });
          });

          return lines.join("\n");
        } catch (err: any) {
          return error(`cat: failed to process the file: ${err.message}`);
        }
      } else {
        return error(`cat: '${targetPath}' does not exist or is not a file.`);
      }
    } else {
      return warn("Usage: cat <filePath>");
    }
  },
};

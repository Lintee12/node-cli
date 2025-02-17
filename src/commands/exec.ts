import fs from "node:fs";
import readline from "readline";
import { error, warn } from "../utils/clihelp";
import handleInput from "../utils/handleInput";

export default async function exec(args?: string[]) {
  if (args) {
    if (args.length > 0) {
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
              reject(error(`rm: failed to read '${targetPath}': ${err.message}`));
            });
          });

          for (const line of lines) {
            await handleInput(line);
          }

          return;
        } catch (err: any) {
          return error(`exec: failed to process the file: ${err.message}`);
        }
      } else {
        return error(`exec: '${targetPath}' does not exist or is not a file.`);
      }
    } else {
      return warn("Usage: exec <filePath>");
    }
  }
}

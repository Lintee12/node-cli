import fs from "fs";
import { error, parseArguments, warn } from "../utils/clihelp";
import { Command } from "../types/command";

export const rmdir: Command = {
  command: "rmdir",
  description: "Removes a directory based on the given path.",
  arguments: "<directoryPath...>",
  flags: ["-r"],
  callback(args) {
    const { parsed, flags } = parseArguments(args);
    if (parsed.length > 0) {
      for (const targetPath of parsed) {
        if (fs.existsSync(targetPath) && fs.lstatSync(targetPath).isDirectory()) {
          if (flags.includes("-r")) {
            //recursive
            try {
              fs.rmSync(targetPath, { recursive: true, force: true });
            } catch (err: any) {
              return error(`rmdir: '${targetPath}' failed.`);
            }
          } else {
            //single dir
            const files = fs.readdirSync(targetPath);
            if (files.length > 0) {
              return error(`rmdir: '${targetPath}' is not empty. Empty the directory or use -r.`);
            } else {
              try {
                fs.rmdirSync(targetPath);
              } catch (err: any) {
                return error(`rmdir: '${targetPath}' failed.`);
              }
            }
          }
        } else {
          return error(`rmdir: '${targetPath}' does not exist or is not a directory.`);
        }
      }
    } else {
      return warn("Usage: rmdir <path> <flags>");
    }
  },
};

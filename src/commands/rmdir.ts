import fs from "fs";
import { output, parseArguments } from "../utils/clihelp";
import { Command } from "../types/command";

export const rmdir: Command = {
  command: "rmdir",
  description: "Removes a directory based on the given path.",
  documentation: "-to recursively delete all child items in a folder use the -r flag.",
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
              return output({
                message: `rmdir: '${targetPath}' failed.`,
                messageType: "error",
              });
            }
          } else {
            //single dir
            const files = fs.readdirSync(targetPath);
            if (files.length > 0) {
              return output({
                message: `rmdir: '${targetPath}' is not empty. Empty the directory or use -r.`,
                messageType: "error",
              });
            } else {
              try {
                fs.rmdirSync(targetPath);
              } catch (err: any) {
                return output({
                  message: `rmdir: '${targetPath}' failed.`,
                  messageType: "error",
                });
              }
            }
          }
        } else {
          return output({
            message: `rmdir: '${targetPath}' does not exist or is not a directory.`,
            messageType: "error",
          });
        }
      }
    } else {
      return output({
        message: `Usage: rmdir <path> <flags>`,
        messageType: "warning",
        usePrefix: false,
      });
    }
  },
};

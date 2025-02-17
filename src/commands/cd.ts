import fs from "fs";
import { error, warn } from "../utils/clihelp";

export function cd(args?: string[]) {
  if (args) {
    if (args.length > 0) {
      let targetDir = args.join(" ");
      if (fs.existsSync(targetDir) && fs.lstatSync(targetDir).isDirectory()) {
        process.chdir(targetDir);
      } else {
        return error(`cd: '${targetDir}' does not exist or is not a valid directory.`);
      }
    } else {
      return warn("Usage: cd <path>");
    }
  }
}

import fs from "fs";
import { error, warn } from "../utils/clihelp";

export function rm(args?: string[]) {
  if (args) {
    if (args.length > 0) {
      const targetPath = args.join(" ");
      if (fs.existsSync(targetPath)) {
        try {
          fs.rmSync(targetPath);
        } catch (err: any) {
          return error(`rm: '${targetPath}' does not exist or is not a file.`);
        }
      } else {
        return error(`rm: '${targetPath}' does not exist or is not a file.`);
      }
    } else {
      return warn("Usage: rm <filePath>");
    }
  }
}

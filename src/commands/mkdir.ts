import fs from "fs";
import { error, warn } from "../utils/clihelp";

export function mkdir(args?: string[]) {
  if (args) {
    if (args.length > 0) {
      const targetPath = args?.join(" ");
      if (!fs.existsSync(targetPath)) {
        fs.mkdirSync(targetPath, { recursive: true });
      } else {
        return error(`mkdir: '${targetPath}' already exists.`);
      }
    } else {
      return warn("Usage: mkdir <path>");
    }
  }
}

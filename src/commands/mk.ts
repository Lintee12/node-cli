import path from "path";
import fs from "fs";
import { error, warn } from "../utils/clihelp";

export function mk(args?: string[]) {
  if (args) {
    if (args.length > 0) {
      for (const targetPath of args) {
        if (fs.existsSync(targetPath)) {
          return error(`mk: '${targetPath}' already exists.`);
        } else {
          const dirPath = path.dirname(targetPath);
          if (!fs.existsSync(dirPath)) {
            try {
              fs.mkdirSync(dirPath, { recursive: true });
            } catch (err: any) {
              return error(`mk: Failed to create directories.`);
            }
          }

          try {
            fs.writeFileSync(targetPath, "");
          } catch (err: any) {
            return error(`mk: Failed to create file.`);
          }
        }
      }
    } else {
      return warn("Usage: mk <filePath>");
    }
  }
}

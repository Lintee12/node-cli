import fs from "node:fs";
import { Command } from "../types/types";

export const dir: Command = {
  command: "dir",
  description: "Displays files and folders in the current directory.",
  callback: async () => {
    const files = fs.readdirSync(process.cwd(), { encoding: "utf-8" });
    let result = "";
    files.forEach((file, index) => {
      result += file + `${index !== files.length - 1 ? "\n" : ""}`;
    });
    return result;
  },
};

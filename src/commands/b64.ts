import { Command } from "../types/types";
import { warn } from "../utils/clihelp";

export const b64: Command = {
  command: "b64",
  description: "Converts the provided input string to base64.",
  callback(args) {
    if (args.length > 0) {
      return btoa(args.join(" ").replace("b64", "").trimStart());
    } else {
      return warn("Usage: b64 <string>");
    }
  },
};

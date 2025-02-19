import { Command } from "../types/command";
import { output } from "../utils/clihelp";

export const b64: Command = {
  command: "b64",
  description: "Converts the provided input string to base64.",
  arguments: "<string>",
  callback(args) {
    if (args.length > 0) {
      return btoa(args.join(" ").replace("b64", "").trimStart());
    } else {
      return output({
        message: "Usage: b64 <string>",
        messageType: "warning",
        usePrefix: false,
      });
    }
  },
};

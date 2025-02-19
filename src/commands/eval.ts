import { Command } from "../types/command";
import { error } from "../utils/clihelp";

export const doEval: Command = {
  command: "eval",
  description: "Executes the provided input string as javascript.",
  arguments: "<string>",
  callback(args) {
    const formatted = args.join(" ").replace("eval", "").trimStart();
    try {
      const result = eval(formatted);
      return result !== undefined ? result : "";
    } catch (e: any) {
      return error(e.toString());
    }
  },
};

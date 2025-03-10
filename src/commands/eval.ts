import { Command } from "../types/command";
import { output } from "../utils/clihelp";

export const doEval: Command = {
  command: "eval",
  description: "Executes the provided input string as javascript.",
  arguments: [{ argument: "js", required: false, description: "The javascript code you would like to run." }],
  callback(args) {
    const formatted = args.join(" ").replace("eval", "").trimStart();
    try {
      const result = eval(formatted);
      return result !== undefined ? result : "";
    } catch (e: any) {
      return output({
        message: e.toString(),
        messageType: "error",
        usePrefix: true,
      });
    }
  },
};

import { error } from "../utils/clihelp";

export function doEval(args?: string[]) {
  if (args) {
    const formatted = args.join(" ").replace("eval", "").trimStart();
    try {
      const result = eval(formatted);
      return result !== undefined ? result : "";
    } catch (e: any) {
      return error(e.toString());
    }
  }
}

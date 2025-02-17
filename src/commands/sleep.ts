import { error, warn } from "../utils/clihelp";

export async function sleep(args: any) {
  if (args) {
    if (args.length > 0) {
      const ms = parseInt(args[0], 10);
      if (isNaN(ms)) {
        return error(`sleep: '${args[0]}' is not a valid number.`);
      } else {
        await new Promise((resolve) => setTimeout(resolve, ms));
      }
    } else {
      return warn("Usage: sleep <number>");
    }
  }
}

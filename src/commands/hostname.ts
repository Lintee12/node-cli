import { Command } from "../types/command";
import os from "os";

export const hostname: Command = {
  command: "hostname",
  description: "Returns the users hostname.",
  callback(args) {
    return os.hostname();
  },
};

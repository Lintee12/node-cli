import { Command } from "../types/command";
import os from "os";

export const username: Command = {
  command: "whoami",
  description: "Returns the current users name.",
  callback(args) {
    return os.userInfo().username;
  },
};

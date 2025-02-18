import { Command } from "../types/types";
import os from "os";

export const username: Command = {
  command: "username",
  description: "Returns the users name",
  callback(args) {
    return os.userInfo().username;
  },
};

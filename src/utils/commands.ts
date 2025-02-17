import { Command } from "../types/types";
import { rl } from "./readline";
import { randomUUID } from "node:crypto";
import os from "os";
import { sleep } from "../commands/sleep";
import { joke } from "../commands/joke";
import { help } from "../commands/help";
import { doEval } from "../commands/eval";
import { doPing } from "../commands/ping";
import { sort } from "../commands/sort";
import { system } from "../commands/system";
import { dir } from "../commands/dir";
import { cd } from "../commands/cd";
import { rmdir } from "../commands/rmdir";
import { mkdir } from "../commands/mkdir";
import { mk } from "../commands/mk";
import { rm } from "../commands/rm";

export const commands: Command[] = [
  {
    command: "help",
    description: "Displays a list of all commands.",
    callback: help,
  },
  {
    command: "exit",
    description: "Quits the application.",
    callback: () => {
      rl.close();
      process.exit();
    },
  },
  {
    command: "clear",
    description: "Clears the terminal window.",
    callback: () => console.clear(),
  },
  {
    command: "date",
    description: "Displays the current date.",
    callback: () => new Date().toDateString(),
  },
  {
    command: "time",
    description: "Displays the current time.",
    callback: () => new Date().toTimeString(),
  },
  {
    command: "echo",
    description: "Echoes the provided input back to the console.",
    callback: (args) => {
      if (args) {
        return args.join(" ").replace("echo", "").trimStart();
      }
    },
  },
  {
    command: "sleep",
    description: "Pauses for the specified number of milliseconds.",
    callback: async (args) => await sleep(args),
  },
  {
    command: "hostname",
    description: "Returns the users hostname.",
    callback: () => os.hostname(),
  },
  {
    command: "username",
    description: "Returns the users name",
    callback: () => os.userInfo().username,
  },
  {
    command: "eval",
    description: "Executes the provided input string as javascript.",
    callback: (args) => doEval(args),
  },
  {
    command: "uuid",
    description: "Generates a random UUID.",
    callback: () => randomUUID(),
  },
  {
    command: "ping",
    description: "Pings a domain name or ip address using an ICMP request.",
    callback: async (args) => doPing(args),
  },
  {
    command: "reverse",
    description: "Reverses the provided input string.",
    callback: (args) => {
      if (args) {
        return args.join(" ").replace("reverse", "").trimStart().split("").reverse().join("");
      }
    },
  },
  {
    command: "random",
    description: "Generates a random number between 0 and 1",
    callback: () => Math.random(),
  },
  {
    command: "sort",
    description: "Sorts the provided list of strings alphabetically.",
    callback: (args) => sort(args),
  },
  { command: "joke", description: "Fetches a random joke from 'https://official-joke-api.appspot.com'.", callback: joke },
  {
    command: "b64",
    description: "Converts the provided input string to base64.",
    callback: (args) => {
      if (args) {
        if (args.length > 0) {
          return btoa(args.join(" ").replace("b64", "").trimStart());
        }
      }
    },
  },
  {
    command: "coinflip",
    description: "Returns either Heads or Tails.",
    callback: () => (Math.random() < 0.5 ? "Heads" : "Tails"),
  },
  {
    command: "system",
    description: "Gets information about the current system.",
    callback: () => system(),
  },
  {
    command: "cwd",
    description: "Displays the current working directory path.",
    callback: () => process.cwd(),
  },
  {
    command: "dir",
    description: "Displays files and folders in the current directory.",
    callback: async () => await dir(),
  },
  {
    command: "cd",
    description: "Changes the current working directory.",
    callback: (args) => cd(args),
  },
  {
    command: "mkdir",
    description: "Creates a new directory based on the given path.",
    callback: (args) => mkdir(args),
  },
  {
    command: "rmdir",
    description: "Removes a directory based on the given path. Flags: (-r, recursively removes a directory and its children)",
    callback: (args) => rmdir(args),
  },
  {
    command: "mk",
    description: "Creates a new item at the provided path.",
    callback: (args) => mk(args),
  },
  {
    command: "rm",
    description: "Removes an item at the given path.",
    callback: (args) => rm(args),
  },
];

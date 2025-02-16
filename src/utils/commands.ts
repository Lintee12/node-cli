import { Command } from "../types/types";
import buildSpace, { error, parseArguments, success, warn } from "./clihelp";
import { rl } from "./readline";
import { randomUUID } from "node:crypto";
import ping from "ping";
import os from "os";
import fs from "node:fs";
import path from "node:path";

async function sleep(args: any) {
  if (args) {
    if (args.length > 0) {
      const ms = parseInt(args[0], 10);
      if (isNaN(ms)) {
        error(`sleep: '${args[0]}' is not a valid number.`);
      } else {
        await new Promise((resolve) => setTimeout(resolve, ms));
      }
    } else {
      warn("Usage: sleep <number>");
    }
  }
}

async function joke() {
  const response = await fetch("https://official-joke-api.appspot.com/random_joke");
  const joke: any = await response.json();
  console.log(`setup: ${joke.setup}\npunchline: ${joke.punchline}`);
}

export const commands: Command[] = [
  {
    command: "help",
    description: "Displays a list of all commands.",
    callback: () => {
      let longestCommand = commands.reduce(
        (longest, command) => (command.command.length > longest.length ? command.command : longest),
        ""
      );
      commands.forEach((command) => {
        console.log(command.command + buildSpace(longestCommand.length - command.command.length + 4) + command.description);
      });
    },
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
    callback: () => {
      console.clear();
    },
  },
  {
    command: "date",
    description: "Displays the current date.",
    callback: () => {
      console.log(new Date().toDateString());
    },
  },
  {
    command: "time",
    description: "Displays the current time.",
    callback: () => {
      console.log(new Date().toTimeString());
    },
  },
  {
    command: "echo",
    description: "Echoes the provided input back to the console.",
    callback: (args) => {
      if (args) {
        console.log(args.join(" ").replace("echo", "").trimStart());
      }
    },
  },
  {
    command: "sleep",
    description: "Pauses for the specified number of milliseconds.",
    callback: (args) => sleep(args),
  },
  {
    command: "eval",
    description: "Executes the provided input string as javascript.",
    callback: (args) => {
      if (args) {
        const formatted = args.join(" ").replace("eval", "").trimStart();
        try {
          const result = eval(formatted);
          console.log(result !== undefined ? result : "");
        } catch (e: any) {
          error(e.toString());
        }
      }
    },
  },
  {
    command: "uuid",
    description: "Generates a random UUID.",
    callback: () => {
      console.log(randomUUID());
    },
  },
  {
    command: "ping",
    description: "Pings a domain name or ip address using an ICMP request.",
    callback: async (args) => {
      if (args) {
        if (args.length > 0) {
          const host = args[0];
          //console.log(`pinging '${host}'`);
          let result;
          const isAlive = await new Promise((resolve, reject) => {
            result = ping.sys.probe(host, (isAlive) => {
              resolve(isAlive);
            });
          });

          if (isAlive) {
            success("Success");
          } else {
            warn(`Failed`);
          }
        } else {
          warn("Usage: ping <host>");
        }
      }
    },
  },
  {
    command: "reverse",
    description: "Reverses the provided input string.",
    callback: (args) => {
      if (args) {
        console.log(args.join(" ").replace("reverse", "").trimStart().split("").reverse().join(""));
      }
    },
  },
  {
    command: "random",
    description: "Generates a random number between 0 and 1",
    callback: () => {
      console.log(Math.random());
    },
  },
  {
    command: "sort",
    description: "Sorts the provided list of strings alphabetically.",
    callback: (args) => {
      if (args) {
        if (args.length > 0) {
          const sortedArgs = args.sort();
          console.log(sortedArgs.join(" "));
        } else {
          warn("Usage: sort <string[]>");
        }
      }
    },
  },
  { command: "joke", description: "Fetches a random joke from 'https://official-joke-api.appspot.com'.", callback: joke },
  {
    command: "b64",
    description: "Converts the provided input string to base64.",
    callback: (args) => {
      if (args) {
        if (args.length > 0) {
          console.log(btoa(args.join(" ").replace("b64", "").trimStart()));
        }
      }
    },
  },
  {
    command: "coinflip",
    description: "Returns either Heads or Tails.",
    callback: () => {
      console.log(Math.random() < 0.5 ? "Heads" : "Tails");
    },
  },
  {
    command: "system",
    description: "Gets information about the current system.",
    callback: () => {
      const systemInfo = {
        platform: os.platform(),
        release: os.release(),
        architecture: os.arch(),
        totalMemory: `${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)} GB`,
        freeMemory: `${(os.freemem() / (1024 * 1024 * 1024)).toFixed(2)} GB`,
        cpus: os.cpus().length,
        uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
        hostname: os.hostname(),
        userInfo: os.userInfo().username,
      };
      console.log(`Platform: ${systemInfo.platform}`);
      console.log(`Release: ${systemInfo.release}`);
      console.log(`Architecture: ${systemInfo.architecture}`);
      console.log(`Total Memory: ${systemInfo.totalMemory}`);
      console.log(`Free Memory: ${systemInfo.freeMemory}`);
      console.log(`CPU Cores: ${systemInfo.cpus}`);
      console.log(`Uptime: ${systemInfo.uptime}`);
      console.log(`Hostname: ${systemInfo.hostname}`);
      console.log(`User: ${systemInfo.userInfo}`);
    },
  },
  {
    command: "cwd",
    description: "Displays the current working directory path.",
    callback: () => {
      console.log(process.cwd());
    },
  },
  {
    command: "dir",
    description: "Displays files and folders in the current directory.",
    callback: async () => {
      const files = fs.readdirSync(process.cwd(), { encoding: "utf-8" });
      files.forEach((file) => {
        console.log(file);
      });
    },
  },
  {
    command: "cd",
    description: "Changes the current working directory.",
    callback: (args) => {
      if (args) {
        if (args.length > 0) {
          let targetDir = args.join(" ");
          if (fs.existsSync(targetDir) && fs.lstatSync(targetDir).isDirectory()) {
            process.chdir(targetDir);
          } else {
            error(`cd: '${targetDir}' does not exist or is not a valid directory.`);
          }
        } else {
          warn("Usage: cd <path>");
        }
      }
    },
  },
  {
    command: "mkdir",
    description: "Creates a new directory based on the given path.",
    callback: (args) => {
      if (args) {
        if (args.length > 0) {
          const targetPath = args?.join(" ");
          if (!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath, { recursive: true });
          } else {
            error(`mkdir: '${targetPath}' already exists.`);
          }
        } else {
          warn("Usage: mkdir <path>");
        }
      }
    },
  },
  {
    command: "rmdir",
    description: "Removes a directory based on the given path. Flags: (-r, recursively removes a directory and its children)",
    callback: (args) => {
      if (args) {
        const { parsed, flags } = parseArguments(args);
        if (parsed.length > 0) {
          const targetPath = parsed.join(" ");
          if (fs.existsSync(targetPath) && fs.lstatSync(targetPath).isDirectory()) {
            if (flags.includes("-r")) {
              //recursive
              try {
                fs.rmSync(targetPath, { recursive: true, force: true });
              } catch (err: any) {
                error(`rmdir: '${targetPath}' failed.`);
              }
            } else {
              //single dir
              const files = fs.readdirSync(targetPath);
              if (files.length > 0) {
                error(`rmdir: '${targetPath}' is not empty. Empty the directory or use -r.`);
              } else {
                try {
                  fs.rmdirSync(targetPath);
                } catch (err: any) {
                  error(`rmdir: '${targetPath}' failed.`);
                }
              }
            }
          } else {
            error(`rmdir: '${targetPath}' does not exist or is not a directory.`);
          }
        } else {
          warn("Usage: rmdir <path> <flags>");
        }
      }
    },
  },
  {
    command: "mk",
    description: "Creates a new item at the provided path.",
    callback: (args) => {
      if (args) {
        if (args.length > 0) {
          const targetPath = args.join(" ");
          if (fs.existsSync(targetPath)) {
            error(`mk: '${targetPath}' already exists.`);
          } else {
            const dirPath = path.dirname(targetPath);
            if (!fs.existsSync(dirPath)) {
              try {
                fs.mkdirSync(dirPath, { recursive: true });
              } catch (err: any) {
                error(`mk: Failed to create directories.`);
                return;
              }
            }

            try {
              fs.writeFileSync(targetPath, "");
            } catch (err: any) {
              error(`mk: Failed to create file.`);
            }
          }
        } else {
          warn("Usage: mk <filePath>");
        }
      }
    },
  },
  {
    command: "rm",
    description: "Removes an item at the given path.",
    callback: (args) => {
      if (args) {
        if (args.length > 0) {
          const targetPath = args.join(" ");
          if (fs.existsSync(targetPath)) {
            try {
              fs.rmSync(targetPath);
            } catch (err: any) {
              error(`rm: '${targetPath}' does not exist or is not a file.`);
            }
          } else {
            error(`rm: '${targetPath}' does not exist or is not a file.`);
          }
        } else {
          warn("Usage: rm <filePath>");
        }
      }
    },
  },
];

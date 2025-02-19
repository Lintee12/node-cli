import { commands } from "./commands";

export default function buildSpace(length: number): string {
  return " ".repeat(length);
}

export function parseArguments(args: string[]) {
  let parsed: string[] = [];
  let flags: string[] = [];

  args.forEach((arg) => {
    if (arg.startsWith("-")) {
      flags.push(arg);
    } else {
      parsed.push(arg);
    }
  });

  return { parsed, flags };
}

export function isValidCommand(testCommand: string): boolean {
  return !!commands.find((c) => c.command === testCommand.toLowerCase());
}

export function getCommandByName(commandName: string) {
  return commands.find((c) => c.command === commandName.toLowerCase());
}

export function error(message: string) {
  return `\x1b[31m${message}\x1b[0m`;
}

export function warn(message: string) {
  return `\x1b[33m${message}\x1b[0m`;
}

export function success(message: string) {
  return `\x1b[32m${message}\x1b[0m`;
}

console.error = (message: any) => {
  process.stderr.write(error(message) + "\n");
};

console.warn = (message: any) => {
  process.stderr.write(warn(message) + "\n");
};

console.success = (message: any) => {
  process.stdout.write(success(message) + "\n");
};

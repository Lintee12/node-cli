import { Command } from "../types/command";
import { messageType } from "../types/message";
import { commands } from "./commands";

import colors from "ansi-colors";

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

export function output({
  message,
  messageType,
  usePrefix = true,
}: {
  message: any;
  messageType?: messageType;
  usePrefix?: boolean;
}) {
  if (messageType === "error") {
    return colors.red(`${usePrefix ? "error: " : ""}${message}`);
  } else if (messageType === "success") {
    return colors.green(`${usePrefix ? "success: " : ""}${message}`);
  } else if (messageType === "warning") {
    return colors.yellow(`${usePrefix ? "warning: " : ""}${message}`);
  } else {
    return message;
  }
}

export function generateCommandTemplate(cmd: Command) {
  return `${cmd.command} ${
    cmd.arguments
      ? cmd.arguments
          .map((arg) => {
            return `<${arg.argument}>`;
          })
          .join(" ")
      : ""
  } ${
    cmd.flags
      ? `[${cmd.flags
          .map((flag) => {
            return `${flag.flag}`;
          })
          .join(" ")}]`
      : ""
  }`;
}

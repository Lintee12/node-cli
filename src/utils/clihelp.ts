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

export function error(message: string) {
  console.error(`\x1b[31m${message}\x1b[0m`);
}

export function warn(message: string) {
  console.warn(`\x1b[33m${message}\x1b[0m`);
}

export function success(message: string) {
  console.log(`\x1b[32m${message}\x1b[0m`);
}

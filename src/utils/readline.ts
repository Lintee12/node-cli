import { cwd } from "node:process";
import readline from "node:readline";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

export default function getInput(): Promise<string> {
  return new Promise((resolve) => {
    rl.question(`[${cwd().split("/").at(-1)}]$ `, (input) => {
      resolve(input);
    });
  });
}

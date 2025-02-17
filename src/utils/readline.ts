import path from "node:path";
import { cwd } from "node:process";
import readline from "node:readline";

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

process.stdin.setRawMode(true);

let dataListenerAttached = false;

export default function getInput(): Promise<string> {
  return new Promise((resolve) => {
    if (!dataListenerAttached) {
      process.stdin.on("data", (key: any) => {
        if (key === "\u0003") {
          rl.close();
          process.exit();
        }
      });
      dataListenerAttached = true;
    }

    rl.question(`[${path.basename(cwd())}]$ `, (input) => {
      resolve(input);
    });
  });
}

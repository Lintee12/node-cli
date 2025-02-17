import { rl } from "../utils/readline";

export function exit() {
  rl.close();
  process.exit();
}

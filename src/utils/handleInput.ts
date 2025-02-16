import { error } from "./clihelp";
import { commands } from "./commands";

export default async function handleInput(input: string) {
  const originalInput = input.trim();
  let tokens = originalInput.split(" ");
  tokens = tokens.filter((token) => token !== "");

  const command = tokens[0];

  if (command === undefined) return;

  const cmd = commands.find((c) => c.command === command.toLowerCase());

  if (cmd) {
    if (command === "echo" || command === "reverse" || command === "eval" || command === "b64") {
      await cmd.callback([originalInput]);
    } else {
      await cmd.callback(tokens.slice(1));
    }
  } else {
    error(`error: '${command}' is not a valid command.`);
  }
}

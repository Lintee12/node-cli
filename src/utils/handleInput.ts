import { error } from "./clihelp";
import { commands } from "./commands";

export default async function handleInput(input: string) {
  const originalInput = input.trim();
  const pipeline = originalInput
    .split("|")
    .map((cmd) => cmd.trim())
    .filter((cmd) => cmd !== "");

  if (pipeline.length === 0) {
    return;
  }

  let currentResult: string | void = undefined;

  for (let i = 0; i < pipeline.length; i++) {
    let tokens = pipeline[i].split(" ").filter((token) => token !== "");
    const command = tokens[0];

    if (command === undefined) return;

    const cmd = commands.find((c) => c.command === command.toLowerCase());

    if (cmd) {
      const args = currentResult !== undefined ? [currentResult, ...tokens.slice(1)] : tokens.slice(1);
      currentResult = await cmd.callback(args);

      if (currentResult === undefined && i < pipeline.length - 1) {
        currentResult = "";
      }

      if (i === pipeline.length - 1 && currentResult !== undefined) {
        console.log(currentResult);
      }
    } else {
      console.error(error(`error: '${command}' is not a valid command.`));
      break;
    }
  }
}

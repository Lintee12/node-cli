import { error } from "./clihelp";
import { commands } from "./commands";

export default async function handleInput(input: string) {
  const originalInput = input.trim();

  //separate commands into a list by the '|' character
  const pipeline = originalInput
    .split("|")
    .map((cmd) => cmd.trim())
    .filter((cmd) => cmd !== "");

  if (pipeline.length === 0) return;

  let currentResult: string | void = undefined;

  const tokenRegex = /"([^"]*)"|'([^']*)'|`([^`]*)`|\S+/g;

  for (let i = 0; i < pipeline.length; i++) {
    let tokens = [];
    let match;
    while ((match = tokenRegex.exec(pipeline[i]))) {
      const quotedContent = match[1] || match[2] || match[3];
      tokens.push(quotedContent || match[0]);
    }

    const command = tokens[0];

    if (command === undefined) return;

    const cmd = commands.find((c) => c.command === command.toLowerCase());

    if (cmd) {
      const args = currentResult !== undefined ? [currentResult, ...tokens.slice(1)] : tokens.slice(1);
      console.log(args);
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

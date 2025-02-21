import { output } from "./clihelp";
import { commands } from "./commands";

function parseTokens(command: string): string[] {
  //parse command into an array of "tokens"
  const tokenRegex = /"([^"]*)"|'([^']*)'|`([^`]*)`|\S+/g; // strings in quotes are a single token
  const tokens: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(command))) {
    const quotedContent = match[1] || match[2] || match[3];
    tokens.push(quotedContent || match[0]);
  }

  return tokens;
}

export default async function handleInput(input: string) {
  const originalInput = input.trim();

  const commandSections = originalInput.split(";").map((section) => section.trim());

  //run for each section
  for (const section of commandSections) {
    //split commands by '|' and remove unnecessary spaces
    const pipeline = section
      .split("|")
      .map((cmd) => cmd.trim())
      .filter((cmd) => cmd !== "");

    if (pipeline.length === 0) return;

    let currentResult: string | void = undefined;

    for (let i = 0; i < pipeline.length; i++) {
      const commandLine = pipeline[i];
      const tokens = parseTokens(commandLine);

      //get command from the first token
      const command = tokens[0];
      if (command === undefined) return;

      //try to find the matching command
      const cmd = commands.find((c) => c.command === command.toLowerCase());

      if (cmd) {
        //set arguments to the output of the last command if possible
        const args = currentResult !== undefined ? [currentResult, ...tokens.slice(1)] : tokens.slice(1);
        if (cmd.argumentsRequired && cmd.arguments && args.length === 0) {
          console.log(
            output({
              message: `Usage: ${cmd.command} ${cmd.arguments}`,
              messageType: "warning",
              usePrefix: false,
            })
          );
        } else {
          currentResult = await cmd.callback(args);
        }

        //reset result for next command
        if (currentResult === undefined && i < pipeline.length - 1) {
          currentResult = "";
        }

        //if last command in the pipeline print the output
        if (i === pipeline.length - 1 && currentResult !== undefined) {
          console.log(currentResult);
        }
      } else {
        console.log(
          output({
            message: `'${command}' is not a valid command.`,
            messageType: "error",
          })
        );
        break;
      }
    }
  }
}

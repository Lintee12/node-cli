#!/usr/bin/env node

import handleInput from "./utils/handleInput";
import getInput from "./utils/readline";

process.emitWarning = () => {};

export async function main() {
  const input = await getInput();
  await handleInput(input);
  main();
}
main();

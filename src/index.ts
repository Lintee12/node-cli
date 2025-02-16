#!/usr/bin/env node

import handleInput from "./utils/handleInput";
import getInput from "./utils/readline";

async function main() {
  const input = await getInput();
  await handleInput(input);
  main();
}
main();

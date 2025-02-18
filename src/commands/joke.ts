import { Command } from "../types/types";

export const joke: Command = {
  command: "joke",
  description: "Fetches a random joke from 'https://official-joke-api.appspot.com'.",
  callback: async (args) => {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const joke: any = await response.json();
    return `setup: ${joke.setup}\npunchline: ${joke.punchline}`;
  },
};

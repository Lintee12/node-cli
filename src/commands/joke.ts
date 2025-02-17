export async function joke() {
  const response = await fetch("https://official-joke-api.appspot.com/random_joke");
  const joke: any = await response.json();
  return `setup: ${joke.setup}\npunchline: ${joke.punchline}`;
}

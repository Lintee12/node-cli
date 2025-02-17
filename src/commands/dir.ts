import fs from "node:fs";

export async function dir() {
  const files = fs.readdirSync(process.cwd(), { encoding: "utf-8" });
  let result = "";
  files.forEach((file, index) => {
    result += file + `${index !== files.length - 1 ? "\n" : ""}`;
  });
  return result;
}

import { randomUUID } from "node:crypto";
import { Command } from "../types/command";

export const uuid: Command = {
  command: "uuid",
  description: "Generates a random UUID.",
  callback: () => randomUUID(),
};

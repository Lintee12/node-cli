import { Argument } from "./argument";
import { Flag } from "./flag";

export interface Command {
  command: string;
  description: string;
  documentation?: string;
  arguments?: Argument[];
  flags?: Flag[];
  callback: (args: string[]) => any | Promise<any>;
}

export interface Command {
  command: string;
  description: string;
  documentation?: string;
  arguments?: string;
  flags?: string[];
  callback: (args: string[]) => any | Promise<any>;
}

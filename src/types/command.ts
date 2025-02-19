export interface Command {
  command: string;
  description: string;
  arguments?: string;
  flags?: string[];
  callback: (args: string[]) => any | Promise<any>;
}

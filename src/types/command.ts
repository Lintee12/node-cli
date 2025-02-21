export interface Command {
  command: string;
  description: string;
  documentation?: string; //advanced help
  arguments?: string;
  callback: (args: string[]) => any | Promise<any>;
}

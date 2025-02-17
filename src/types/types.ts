export interface Command {
  command: string;
  description: string;
  callback: (args?: string[]) => string | void;
}

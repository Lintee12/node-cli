export interface Command {
  command: string;
  description: string;
  callback: (args?: string[]) => void;
}

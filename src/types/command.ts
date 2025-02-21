export interface Command {
  command: string;
  description: string;
  documentation?: string; //advanced help
  arguments?: string;
  argumentsRequired?: boolean; // set true if any arguments are required for the command to run
  callback: (args: string[]) => any | Promise<any>;
}

//arguments format: <args> [flags]
//example1: {cmdName}
//example2: {cmdName} <args>
//example3: {cmdName} <arg1> <arg2> [flags]
//example4: {cmdName} <arg1> <arg2> [flags]
//example4: {cmdName} <args...> [flags]
//example command: 'test Hello -test -test1' - arguments would be <string> [-test -test1]

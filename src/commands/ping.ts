import { Command } from "../types/command";
import ping from "ping";
import { output } from "../utils/clihelp";
import colors from "ansi-colors";

export const doPing: Command = {
  command: "ping",
  description: "Pings a domain name or ip address using an ICMP request.",
  arguments: "<host>",
  argumentsRequired: true,
  documentation: `If the ping is successful the output will be '${colors.green(
    "Success"
  )}'. If the ping fails the output will be '${colors.red("Failed")}'.`,
  callback: async (args) => {
    const host = args[0];
    let result;
    const isAlive = await new Promise((resolve, reject) => {
      result = ping.sys.probe(host, (isAlive) => {
        resolve(isAlive);
      });
    });

    if (isAlive) {
      return output({
        message: "Success",
        messageType: "success",
        usePrefix: false,
      });
    } else {
      return output({
        message: "Failed",
        messageType: "error",
        usePrefix: false,
      });
    }
  },
};

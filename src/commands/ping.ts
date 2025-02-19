import { Command } from "../types/command";
import ping from "ping";
import { output } from "../utils/clihelp";

export const doPing: Command = {
  command: "ping",
  description: "Pings a domain name or ip address using an ICMP request.",
  callback: async (args) => {
    if (args.length > 0) {
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
    } else {
      return output({
        message: "Usage: ping <host>",
        messageType: "warning",
        usePrefix: false,
      });
    }
  },
};

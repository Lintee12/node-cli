import { Command } from "../types/command";
import { success, warn } from "../utils/clihelp";
import ping from "ping";

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
        return success("Success");
      } else {
        return warn(`Failed`);
      }
    } else {
      return warn("Usage: ping <host>");
    }
  },
};

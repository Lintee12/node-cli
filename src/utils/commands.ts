import { b64 } from "../commands/b64";
import { cd } from "../commands/cd";
import { clear } from "../commands/clear";
import { coinflip } from "../commands/coinflip";
import { cwd } from "../commands/cwd";
import { date } from "../commands/date";
import { dir } from "../commands/dir";
import { echo } from "../commands/echo";
import { doEval } from "../commands/eval";
import { exec } from "../commands/exec";
import { exit } from "../commands/exit";
import { help } from "../commands/help";
import { hostname } from "../commands/hostname";
import { install } from "../commands/install";
import { joke } from "../commands/joke";
import { mk } from "../commands/mk";
import { mkdir } from "../commands/mkdir";
import { doPing } from "../commands/ping";
import { random } from "../commands/random";
import { reverse } from "../commands/reverse";
import { rm } from "../commands/rm";
import { rmdir } from "../commands/rmdir";
import { sleep } from "../commands/sleep";
import { sort } from "../commands/sort";
import { system } from "../commands/system";
import { time } from "../commands/time";
import { username } from "../commands/whoami";
import { uuid } from "../commands/uuid";
import { Command } from "../types/command";
import { cat } from "../commands/cat";

export const commands: Command[] = [];

export function addCommand(command: Command) {
  commands.push(command);
}

/* addCommand(b64); */
addCommand(cd);
addCommand(clear);
/* addCommand(coinflip); */
addCommand(cwd);
addCommand(date);
addCommand(dir);
addCommand(echo);
addCommand(doEval);
addCommand(exec);
addCommand(exit);
addCommand(help);
addCommand(hostname);
addCommand(install);
/* addCommand(joke); */
addCommand(mk);
addCommand(mkdir);
addCommand(doPing);
addCommand(random);
addCommand(reverse);
addCommand(rm);
addCommand(rmdir);
addCommand(sleep);
addCommand(sort);
addCommand(system);
addCommand(time);
addCommand(username);
/* addCommand(uuid); */
addCommand(cat);

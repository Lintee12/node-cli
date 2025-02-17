import os from "os";

export function system() {
  const systemInfo = {
    platform: os.platform(),
    release: os.release(),
    architecture: os.arch(),
    totalMemory: `${(os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)} GB`,
    freeMemory: `${(os.freemem() / (1024 * 1024 * 1024)).toFixed(2)} GB`,
    cpus: os.cpus().length,
    uptime: `${(os.uptime() / 3600).toFixed(2)} hours`,
    hostname: os.hostname(),
    userInfo: os.userInfo().username,
  };
  return `Platform: ${systemInfo.platform}\nRelease: ${systemInfo.release}\nArchitecture: ${systemInfo.architecture}\nTotal Memory: ${systemInfo.totalMemory}\nFree Memory: ${systemInfo.freeMemory}\nCPU Cores: ${systemInfo.cpus}\nUptime: ${systemInfo.uptime}\nHostname: ${systemInfo.hostname}\nUser: ${systemInfo.userInfo}`;
}

import { configure, getLogger } from "log4js";
export const logger = setupLogConfig();

function createLogsDir() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("fs").mkdirSync("./logs");
  } catch (e) {
    if (e.code !== "EEXIST") {
      logger.error("☹ Could not set up log directory, error was: ", e);
      process.exit(1);
    }
  }
}

function setupLogConfig() {
  createLogsDir();
  configure("./log4js.json");
  return getLogger("app");
}
process.on("SIGTERM", () => {
  logger.log("Goodbye!!!");
});

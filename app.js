require("dotenv").config({ path: "config/.env" });
require("express-async-errors");
const express = require("express");
const logger = require("./src/utils/logger");
const db = require("./src/startup/db");
const { getNewlyToken, initializeWebSocket } = require("./src/services/pumpfun.service");
const { catchUnhandledError } = require("./src/startup/uncaughtException");
const { scheduleJobs } = require("./src/jobs/scheduler");
const { addConfigValue } = require("./src/startup/seeder");

const app = express();

async function main() {
  catchUnhandledError();
  await db();
  await addConfigValue();
  initializeWebSocket();
  scheduleJobs();

  const { PORT } = process.env;

  app.listen(PORT, async () => {
    logger.info(`listening on ${PORT}`);
  });
}

main();
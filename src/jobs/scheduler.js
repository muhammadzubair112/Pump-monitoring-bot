const cron = require("node-cron");
const { updateEligibleCriteria } = require("../services/token.service");
const { updateSolToUsd } = require("../services/config.service");

exports.scheduleJobs = () => {
  cron.schedule("*/2 * * * *", async () => {
    try {
      console.log("Scheduled task running...");
      await updateEligibleCriteria();
    } catch (error) {
      console.error("Error in scheduled task:", error);
    }
  });

  cron.schedule("*/5 * * * *", async () => {
    try {
      await updateSolToUsd();
    } catch (error) {
      console.error("Error in scheduled task:", error);
    }
  });
  
};

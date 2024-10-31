const mongoose = require("mongoose");
const logger = require("../utils/logger");

const { DB_URL } = process.env;

module.exports = async function db() {
  if (!DB_URL) {
    logger.error("MongoDB connection string (DB_URL) is not defined.");
    process.exit(1);
  }

  try {
    await mongoose.connect(DB_URL);
    logger.info("Connected to MongoDB...");
  } catch (error) {
    logger.error("Error while connecting to the database:", error.stack || error);
    process.exit(1);
  }
};

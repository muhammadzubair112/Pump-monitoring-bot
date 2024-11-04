require("winston-mongodb");
const { createLogger, format, transports } = require("winston");
// const myFormat = format.printf(({ timestamp, level, message, meta }) => {
// return `${timestamp};${level};${message};${meta? JSON.stringify(meta) : ''}`;
// });

let myFormat = format.printf((info) => {
  return `${info.timestamp}: ${info.level.toUpperCase()}: ${info.message}`;
});

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    format.splat(),
    format.errors({ stack: true }),
    myFormat
    // format.json(),
    // format.metadata()
  ),
  transports: [
    new transports.Console(),
    new transports.MongoDB({
      db: process.env.DB_URL,
    }),
  ],
});

module.exports = logger;

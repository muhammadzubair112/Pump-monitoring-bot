const WebSocket = require("ws");
const { createToken, getTokens, updateMarketCap } = require("./token.service");
const logger = require("../utils/logger");

const { PUMPFUN_API } = process.env;
let ws = null;

exports.initializeWebSocket = () => {
  if (!ws) {
    ws = new WebSocket(PUMPFUN_API);

    ws.on("open", async function open() {
      logger.info("WebSocket connection opened.");
      let payload = {
        method: "subscribeNewToken",
      };
      ws.send(JSON.stringify(payload));

    setInterval(async () => {
        const tokens = await getTokens();
        const keys = tokens.map((token) => token.mint);
        if (keys.length > 0) {
          ws.send(
            JSON.stringify({
              method: "subscribeTokenTrade",
              keys,
            })
          );
        }
      }, 1000); 
    });

    ws.on("message", async function message(data) {
      const parsedData = JSON.parse(data);
      if (parsedData.message) return;
    
      if (parsedData.txType === "create") {
          await createToken(parsedData);
        } else {
          await updateMarketCap(parsedData);
        }
    });

    ws.on("close", () => {
      logger.info("WebSocket connection closed. Attempting to reconnect...");
      ws = null;
      setTimeout(exports.initializeWebSocket, 5000);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  } else {
    logger.info("WebSocket is already initialized.");
  }
};
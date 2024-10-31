const Token = require("../models/Token");
const { getConfigValue } = require("./config.service");

exports.createToken = async (tokenDetails) => {
  const solToUsd = await getConfigValue();
  const marketCapInUsd = solToUsd * tokenDetails.marketCapSol;
  tokenDetails.marketCapUsd = marketCapInUsd;

  const token = await Token.create(tokenDetails);
  return token;
};

exports.getTokens = async () => {
  const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
  return await Token.find({ createdAt: { $lt: fifteenMinutesAgo } }).select(
    "mint"
  );
};

exports.updateMarketCap = async (tokenDetails) => {
  const token = await Token.findOne({ mint: tokenDetails.mint });

  if (!token) return;
  const solToUsd = await getConfigValue();

  const marketCapInUsd = solToUsd * tokenDetails.marketCapSol;
  token.marketCapSol = tokenDetails.marketCapSol;
  token.marketCapUsd = marketCapInUsd;

  await token.save();
};

exports.updateEligibleCriteria = async () => {
  const tokens = await Token.find();

  for (let i = 0; i < tokens.length; i++) {
    if (Number(tokens[i].marketCapUsd) >= 12000) {
      tokens[i].isEligible = true;
      await tokens[i].save();
    }
  }
};

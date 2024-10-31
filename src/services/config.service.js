const Config = require("../models/config");
const { fetchSOLPrice } = require("../utils/crypto-compare");

exports.updateSolToUsd = async () => {
  const usdPrice = await fetchSOLPrice();
  const config = await Config.find();
  config[0].solToUsd = usdPrice;
  await config[0].save();
};

exports.createConfigValue = async (solToUsd) => {
  const config = await Config.find();
  if (config.length === 0) {
    await Config.create({ solToUsd });
  }
};

exports.getConfigValue = async () => {
  const config = await Config.find();
  return config[0].solToUsd;
};

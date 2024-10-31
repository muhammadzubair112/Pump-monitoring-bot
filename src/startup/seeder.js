const { createConfigValue } = require("../services/config.service");
const { fetchSOLPrice } = require("../utils/crypto-compare")

exports.addConfigValue = async () => {
    const price = await fetchSOLPrice();
    await createConfigValue(price);
};

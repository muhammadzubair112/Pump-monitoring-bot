const EligibleToken = require("../models/EligibleToken");

exports.addEligibleToken = async (details) => {
  const data = {
    signature: details.signature,
    mint: details.mint,
    traderPublicKey: details.traderPublicKey,
    txType: details.txType,
    initialBuy: details.initialBuy,
    bondingCurveKey: details.bondingCurveKey,
    vTokensInBondingCurve: details.vTokensInBondingCurve,
    vSolInBondingCurve: details.vSolInBondingCurve,
    marketCapSol: details.marketCapSol,
    name: details.name,
    marketCapUsd: details.marketCapUsd,
    symbol: details.symbol,
    uri: details.uri,
  };

  const eligibleToken = await EligibleToken.findOne({
    signature: data.signature,
  });

  if (!eligibleToken) {
    return await EligibleToken.create(data);
  } else {
      eligibleToken.marketCapSol = details.marketCapSol;
      eligibleToken.marketCapUsd = details.marketCapUsd;
      await eligibleToken.save();
  }

};

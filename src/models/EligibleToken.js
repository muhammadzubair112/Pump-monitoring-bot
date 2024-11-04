const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  signature: {
    type: String,
    required: true,
  },
  mint: {
    type: String,
    required: true,
  },
  traderPublicKey: {
    type: String,
    required: true,
  },
  txType: {
    type: String,
    required: true,
  },
  initialBuy: {
    type: Number,
  },
  bondingCurveKey: {
    type: String,
  },
  vTokensInBondingCurve: {
    type: Number,
  },
  vSolInBondingCurve: {
    type: Number,
  },
  marketCapSol: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  marketCapUsd: {
    type: String,
  },
  symbol: {
    type: String,
    required: true,
  },
  uri: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const EligibleToken = mongoose.model('EligibleToken', tokenSchema);

module.exports = EligibleToken;

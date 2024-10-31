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
  isEligible: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: { expires: '10m' }
  }
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;

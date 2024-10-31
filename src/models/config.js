const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  solToUsd: {
    type: Number,
    required: true,
  },
});

const Config = mongoose.model('Config', configSchema);

module.exports = Config;

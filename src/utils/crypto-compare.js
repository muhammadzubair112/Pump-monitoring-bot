const axios = require('axios');

exports.fetchSOLPrice = async () => {
  try {
    const response = await axios.get('https://min-api.cryptocompare.com/data/price?fsym=SOL&tsyms=USD');
    return response.data.USD;
  } catch (error) {
    console.error('Error fetching the SOL price:', error);
  }
};
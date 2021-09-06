require("dotenv").config();
const ethers = require("ethers");
const endpoint = process.env.FTMPROVIDER;

const provider = new ethers.providers.JsonRpcProvider(endpoint, 250);

const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
const wallet = Wallet.connect(provider);

const getGasPrice = async () => {
  let gasPrice = await provider.getGasPrice();
  console.log(ethers.utils.formatUnits(gasPrice, "gwei"));
};

const getNonce = async () => {
  let nonce = await wallet.getTransactionCount();
  console.log(nonce);
};

const pause = async () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
};

module.exports = {
  getGasPrice: getGasPrice,
  getNonce: getNonce,
  pause: pause,
};

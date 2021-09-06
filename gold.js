require("dotenv").config();
const ethers = require("ethers");
const { NonceManager } = require("@ethersproject/experimental");
const contracts = require("./contracts");
const goldContractAddress = contracts.gold;
const rarityAbi = require("./abis/rarity.json");

const endpoint = process.env.FTMPROVIDER; // eslint-disable-line no-undef
const provider = new ethers.providers.JsonRpcProvider(endpoint, 250);
const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY); // eslint-disable-line no-undef
const wallet = Wallet.connect(provider);
const nonceManager = new NonceManager(wallet);
const contract = new ethers.Contract(goldContractAddress, rarityAbi, provider);
const writeContract = contract.connect(nonceManager);
const summonerIds = require("./summoners");

const claimable = async (id) => {
  let amount = contract.claimable(id);
  return amount;
};

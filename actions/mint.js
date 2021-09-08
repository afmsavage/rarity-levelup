require("dotenv").config();
const ethers = require("ethers");
const { NonceManager } = require("@ethersproject/experimental");
const contracts = require("./contracts");
const rarityContractAddress = contracts.rarity;
const rarityAbi = require("../abis/rarity.json");

const endpoint = process.env.FTMPROVIDER; // eslint-disable-line no-undef
const provider = new ethers.providers.JsonRpcProvider(endpoint, 250);
const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY); // eslint-disable-line no-undef
const wallet = Wallet.connect(provider);
const nonceManager = new NonceManager(wallet);
const contract = new ethers.Contract(
  rarityContractAddress,
  rarityAbi,
  provider
);
const writeContract = contract.connect(nonceManager);
const summonerIds = require("./summoners");

const mint = async () => {
  let response = contract.summon();
  let receipt = newSummoner.wait();
  let id = "";
};

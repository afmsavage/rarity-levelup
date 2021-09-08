require("dotenv").config();
const ethers = require("ethers");
const contracts = require("../config/contracts");
const rarityContractAddress = contracts.rarity;
const rarityAbi = require("../abis/rarity.json");
const { provider, nonceManager } = require("../config/wallet");

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

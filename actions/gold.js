require("dotenv").config();
const ethers = require("ethers");
const contracts = require("../config/contracts");
const goldContractAddress = contracts.gold;
const rarityAbi = require("../abis/rarity_gold.json");
const { provider, nonceManager } = require("../config/wallet");

const contract = new ethers.Contract(goldContractAddress, rarityAbi, provider);
const writeContract = contract.connect(nonceManager);
const summonerIds = require("./summoners");

const claimable = async (id) => {
  let amount = contract.claimable(id);
  return amount;
};

const claim = async () => {
  for (let id of summonerIds) {
    try {
      let response = await writeContract.claim(id);
      let receipt = await response.wait();
      console.log(receipt);
      console.log(`We claimed gold for summoner: ${id}`);
    } catch (err) {
      console.error(err);
    }
  }
};

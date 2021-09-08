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

const checkLevel = async (id) => {
  let level = contract.level(id);
  return level;
};

const checkXp = async (id) => {
  let xp = await contract.xp(id);
  return xp;
};

const checkLevelXp = async (id) => {
  let level = checkLevel(id);
  let xpRequired = await contract.xp_required(level);
  return xpRequired;
};

const levelUp = async () => {
  summonerIds.forEach(async (id) => {
    let summonerXp = await checkXp(id);
    let neededXp = await checkLevelXp(id);
    // console.log(summonerXp);
    // console.log(neededXp);
    if (summonerXp.gte(neededXp)) {
      try {
        let response = await writeContract.level_up(id);
        /*let receipt = */ response.wait();
        //console.log(receipt);
        console.log(`Leveled up summoner: ${id}`);
      } catch (err) {
        console.error(err);
      }
    } else {
      console.log(`Did not need to level summoner: ${id}`);
    }
  });
};

module.exports = levelUp;

// levelUp().catch((err) => {
//   console.error(err);
// });

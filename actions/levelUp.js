require("dotenv").config();
const ethers = require("ethers");
const contracts = require("../config/contracts");
const rarityContractAddress = contracts.rarity;
const rarityAbi = require("../abis/rarity.json");
const { provider, nonceManager } = require("../config/wallet");
const { log, error } = require("./utils");

const contract = new ethers.Contract(
  rarityContractAddress,
  rarityAbi,
  provider
);
const writeContract = contract.connect(nonceManager);
const { pause } = require("./utils");

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

const levelUp = async (summonerId) => {
    let summonerXp = await checkXp(summonerId);
    let neededXp = await checkLevelXp(summonerId);
    if (summonerXp.gte(neededXp)) {
      try {
        let response = await writeContract.level_up(summonerId);
        /* let receipt = */ await response.wait();
        // log("levelUp", summonerId, receipt);
        log("levelUp", summonerId, `Level up succesfull!`);
        pause();
      } catch (err) {
        error("levelUp", summonerId, err);
      }
    } else {
      log("levelUp", summonerId, `Did not need to level up.`);
    }
};

module.exports = levelUp;

// levelUp().catch((err) => {
//   console.error(err);
// });

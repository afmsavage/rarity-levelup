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
const { pause } = require("./utils");

// get the time until next adventure
const getAdventureLog = async (id) => {
  await provider.ready;
  let adventurersLog = await contract.adventurers_log(id);
  return adventurersLog;
};

// sends your summoner on an adventure!
const adventure = async () => {
  let timestamp = await provider.getBlock();
  let currentTime = ethers.BigNumber.from(timestamp.timestamp);
  for (let id of summonerIds) {
    let adventureTimestamp = await getAdventureLog(id);
    if (currentTime.gt(adventureTimestamp)) {
      try {
        let response = await writeContract.adventure(id);
        let receipt = await response.wait();
        console.log(receipt);
        console.log(`We adventured for summoner ${id}!`);
        pause();
      } catch (err) {
        console.error(`could not send the tx: ${err}`);
      }
    } else {
      console.log(`not yet time to adventure for ${id}`);
      pause();
    }
  }
};

module.exports = adventure;

// adventure().catch((err) => {
//   console.error(err);
// });

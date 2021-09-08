require("dotenv").config();
const ethers = require("ethers");
const { NonceManager } = require("@ethersproject/experimental");
const contracts = require("./contracts");
const craftingContractAddress = contracts.crafting1_1;
const rarityAbi = require("../abis/rarity_crafting_1-1.json");

const endpoint = process.env.FTMPROVIDER; // eslint-disable-line no-undef
const provider = new ethers.providers.JsonRpcProvider(endpoint, 250);
const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY); // eslint-disable-line no-undef
const wallet = Wallet.connect(provider);
const nonceManager = new NonceManager(wallet);
const contract = new ethers.Contract(
  craftingContractAddress,
  rarityAbi,
  provider
);
const writeContract = contract.connect(nonceManager);
const summonerIds = require("./summoners");

// get the time until next adventure
const getAdventureLog = async (id) => {
  await provider.ready;
  let adventurersLog = await contract.adventurers_log(id);
  return adventurersLog;
};

// sends your summoner on an adventure!
const craftAdventure = async () => {
  let timestamp = await provider.getBlock();
  let currentTime = ethers.BigNumber.from(timestamp.timestamp);
  summonerIds.forEach(async (id) => {
    let adventureTimestamp = await getAdventureLog(id);
    let rewards = await contract.scout(id);
    if (currentTime.gt(adventureTimestamp) && rewards.gt(ethers.BigNumber.from(0))) {
      try {
        let response = await writeContract.adventure(id);
        let receipt = await response.wait();
        // console.log(receipt);
        console.log(`We craft adventured for summoner ${id}!`);
      } catch (err) {
        console.error(`could not send the tx: ${err}`);
      }
    } else {
      console.log(`not yet time to craft adventure for ${id}`);
    }
  });
};

module.exports = craftAdventure;

// adventure().catch((err) => {
//   console.error(err);
// });

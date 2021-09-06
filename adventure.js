require("dotenv").config();
const ethers = require("ethers");
const { NonceManager } = require("@ethersproject/experimental");
const contractAddress = "0xce761D788DF608BD21bdd59d6f4B54b2e27F25Bb";

const rarityAbi = require("./abis/rarity.json");
const endpoint = process.env.FTMPROVIDER;

const provider = new ethers.providers.JsonRpcProvider(endpoint, 250);
const Wallet = new ethers.Wallet(process.env.PRIVATE_KEY);
const wallet = Wallet.connect(provider);
const nonceManager = new NonceManager(wallet);
const contract = new ethers.Contract(contractAddress, rarityAbi, provider);
const writeContract = contract.connect(nonceManager);
const summonerIds = require("./summoners");

// get the time until next adventure
const getAdventureLog = async (id) => {
  await provider.ready;
  let adventurersLog = await contract.adventurers_log(id);
  return adventurersLog;
};

// sends your summoner on an adventure!
const adventure = async () => {
  let timestamp = await provider.getBlock();
  currentTime = ethers.BigNumber.from(timestamp.timestamp);
  summonerIds.forEach(async (id) => {
    let adventureTimestamp = await getAdventureLog(id);
    if (currentTime.gt(adventureTimestamp)) {
      try {
        let response = await writeContract.adventure(id);
        let receipt = await response.wait();
        console.log(receipt);
        console.log(`We adventured for summoner ${id}!`);
      } catch (err) {
        console.error(`could not send the tx: ${err}`);
      }
    } else {
      console.log(`not yet time to adventure for ${id}`);
    }
  });
};

module.exports = adventure;

// adventure().catch((err) => {
//   console.error(err);
// });

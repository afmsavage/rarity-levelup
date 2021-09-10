const adventure = require("./actions/adventure");
const levelUp = require("./actions/levelUp");
const craftAdventure = require("./actions/craftingMaterials1-1");
const summonerIds = require("./actions/summoners");
const ethers = require("ethers");
const { provider } = require("./config/wallet");

const main = async () => {
  let block = await provider.getBlock();
  let currentTime = ethers.BigNumber.from(block.timestamp);

  for (let i = 0; i < summonerIds.length; i++) {
    console.log(`### Start with summoner ${summonerIds[i]} ###`);
    await adventure(summonerIds[i], currentTime);
    await levelUp(summonerIds[i]);
    await craftAdventure(summonerIds[i], currentTime);
    console.log(``);
  }
};

main().catch((err) => {
  console.error(err);
});

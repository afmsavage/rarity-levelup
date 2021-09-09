const adventure = require("./actions/adventure");
const levelUp = require("./actions/levelUp");
const craftAdventure = require("./actions/craftingMaterials1-1");
const summonerIds = require("./actions/summoners");

const main = async () => {
  for (let i = 0; i < summonerIds.length; i++) {
    await adventure();
    await levelUp();
    await craftAdventure();
  }
};

main().catch((err) => {
  console.error(err);
});

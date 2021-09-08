const adventure = require("./actions/adventure");
const levelUp = require("./actions/levelUp");
const craftAdventure = require("./actions/craftingMaterials1-1");

const main = async () => {
  adventure();
  levelUp();
  craftAdventure();
};

main().catch((err) => {
  console.error(err);
});

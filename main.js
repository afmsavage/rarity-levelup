const adventure = require("./adventure");
const levelUp = require("./levelUp");

const main = async () => {
  adventure();
  levelUp();
};

main().catch((err) => {
  console.error(err);
});

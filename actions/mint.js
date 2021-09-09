require("dotenv").config();
const ethers = require("ethers");
const contracts = require("../config/contracts");
const rarityContractAddress = contracts.rarity;
const rarityAbi = require("../abis/rarity.json");
const { provider, nonceManager, wallet } = require("../config/wallet");

const contract = new ethers.Contract(
  rarityContractAddress,
  rarityAbi,
  provider
);

const writeContract = contract.connect(nonceManager);

const mint = async (type) => {
  let nonce = await wallet.getTransactionCount();
  let override = {
    nonce: nonce,
  };
  let response = await writeContract.summon(type, override);
  let receipt = await response.wait();
  let id = receipt.events[1].args.summoner.toNumber();
  console.log(id);
};

mint(1).catch((err) => {
  console.error(err);
});

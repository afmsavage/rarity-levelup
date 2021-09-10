require("dotenv").config();
const ethers = require("ethers");
const contracts = require("../config/contracts");
const goldContractAddress = contracts.gold;
const rarityAbi = require("../abis/rarity_gold.json");
const { provider, nonceManager } = require("../config/wallet");
const { log, error } = require("./utils");

const contract = new ethers.Contract(goldContractAddress, rarityAbi, provider);
const writeContract = contract.connect(nonceManager);

const claimable = async (id) => {
    let amount = contract.claimable(id);
    return amount;
};

const claim = async (summonerId) => {
    try {
        let response = await writeContract.claim(summonerId);
        /* let receipt = */ await response.wait();
        // log("gold", summonerId, receipt);
        log("gold", summonerId, `Gold claimed successfully!`);
    } catch (err) {
        error("gold", summonerId, err);
    }
};

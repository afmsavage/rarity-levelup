require('dotenv').config()
const ethers = require('ethers')
const contracts = require('../config/contracts')
const craftingContractAddress = contracts.crafting1_1
const rarityAbi = require('../abis/rarity_crafting_1-1.json')
const { provider, nonceManager } = require('../config/wallet')
const { log, error } = require('./utils')

const contract = new ethers.Contract(
    craftingContractAddress,
    rarityAbi,
    provider
)
const writeContract = contract.connect(nonceManager)
const { pause } = require('./utils')

// get the time until next adventure
const getAdventureLog = async (id) => {
    await provider.ready
    let adventurersLog = await contract.adventurers_log(id)
    return adventurersLog
}

// sends your summoner on an adventure!
const craftAdventure = async (summonerId, currentTime) => {
    let adventureTimestamp = await getAdventureLog(summonerId)
    let rewards = await contract.scout(summonerId)
    if (
        currentTime.gt(adventureTimestamp) &&
        rewards.gt(ethers.BigNumber.from(0))
    ) {
        try {
            let response = await writeContract.adventure(summonerId)
            /* let receipt = */ await response.wait()
            // log("craftAdventure", summonerId, receipt);
            log('craftAdventure', summonerId, `Adventure successfull!`)
            pause()
        } catch (err) {
            error('craftAdventure', summonerId, `Could not send the tx: ${err}`)
        }
    } else {
        log('craftAdventure', summonerId, `Not yet time to adventure.`)
    }
}

module.exports = craftAdventure

// adventure().catch((err) => {
//   console.error(err);
// });

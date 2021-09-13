require('dotenv').config()
const ethers = require('ethers')
const contracts = require('../config/contracts')
const goldContractAddress = contracts.gold
const rarityAbi = require('../abis/rarity_gold.json')
const { provider, nonceManager } = require('../config/wallet')
const { log, error, pause } = require('./utils')

const contract = new ethers.Contract(goldContractAddress, rarityAbi, provider)
const writeContract = contract.connect(nonceManager)

const claimable = async (summonerId) => {
    let amount = contract.claimable(summonerId).catch(() => {
        return
    })
    return amount
}

const { checkLevel } = require('./levelUp')

const claimGold = async (summonerId) => {
    let level = await checkLevel(summonerId)
    let amount = await claimable(summonerId)
    if (amount === undefined ) {
        log('gold', summonerId, `No gold to claim or already claimed for level ${level}`)
    } else if (level.gt(1) && amount.gt(0)) {
        try {
            let response = await writeContract.claim(summonerId)
            /* let receipt = */ await response.wait()
            // log("gold", summonerId, receipt);
            log('gold', summonerId, `Gold claimed successfully!`)
            pause()
        } catch (err) {
            error('gold', summonerId, err)
        }
    } else {
        log('gold', summonerId, `Did not need to claim gold.`)
    }
}

module.exports = claimGold


// claim(163414).catch((err) => {
//     console.error(err)
// })

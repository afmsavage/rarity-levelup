require('dotenv').config()
const ethers = require('ethers')
const contracts = require('../config/contracts')
const rarityContractAddress = contracts.attributes
const rarityAbi = require('../abis/rarity_attributes.json')
const { provider, nonceManager } = require('../config/wallet')
const { log, error } = require('./utils')

const contract = new ethers.Contract(rarityContractAddress, rarityAbi, provider)

const writeContract = contract.connect(nonceManager)
const { pause } = require('./utils')

const { checkLevel } = require('./levelUp')
const { checkClass, baseAttributes } = require('./classes')

// only used to place the initial skill points on a new summoner
// skill points set in classes.js
const spendBaseAttributes = async (summonerId) => {
    let summonerClass = await checkClass(summonerId)
    let level = await checkLevel(summonerId)
    let abilityPoints = baseAttributes[summonerClass]
    let characterCreated = await contract.character_created(summonerId)
    if (level.eq(1) && !characterCreated) {
        try {
            let response = await writeContract.point_buy(
                summonerId,
                abilityPoints.strength,
                abilityPoints.dexterity,
                abilityPoints.constitution,
                abilityPoints.intelligence,
                abilityPoints.wisdom,
                abilityPoints.charisma
            )
            /* let receipt = */ await response.wait()
            // log("adventure", summonerId, receipt);
            log('point_buy', summonerId, `Attribute Point Buy successfull!`)
            pause()
        } catch (err) {
            error('point_buy', summonerId, `Could not send the tx: ${err}`)
        }
    } else {
        log(
            'point_buy',
            summonerId,
            `Not level 1 or already spent base points, no need to set initial skill points`
        )
    }
}

module.exports = { checkClass, spendBaseAttributes }

// spendBaseAttributes(1170749).catch((err) => {
//   console.error(err);
// });

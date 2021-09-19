require('dotenv').config()
const ethers = require('ethers')
const contracts = require('../config/contracts')
const rarContractAddress = contracts.rar_token
const rarTokenAbi = require('../abis/rar_token.json')
const { provider, nonceManager } = require('../config/wallet')
const { log, error, pause } = require('./utils')

const contract = new ethers.Contract(rarContractAddress, rarTokenAbi, provider)
const writeContract = contract.connect(nonceManager)

const claimable = async (summonerId) => {
    let amount = contract.claimable(summonerId).catch(() => {
        return
    })
    return amount
}

const { checkLevel } = require('./levelUp')

const claimRar = async (summonerId) => {
    let level = await checkLevel(summonerId)
    let amount = await claimable(summonerId)
    if (amount === undefined) {
        log(
            'rar',
            summonerId,
            `No RAR to claim or already claimed for level ${level}`
        )
    } else if (level.gt(1) && amount.gt(0)) {
        try {
            let response = await writeContract.claim(summonerId)
            /* let receipt = */ await response.wait()
            // log("rar", summonerId, receipt);
            log('rar', summonerId, `RAR claimed successfully!`)
            pause()
        } catch (err) {
            error('rar', summonerId, err)
        }
    } else {
        log('rar', summonerId, `Did not need to claim RAR.`)
    }
}

module.exports = claimRar

// claimRar(163414).catch((err) => {
//     console.error(err)
// })

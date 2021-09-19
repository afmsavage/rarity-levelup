require('dotenv').config()
const ethers = require('ethers')
const contracts = require('../config/contracts')
const rarityContractAddress = contracts.rarity
const mintAbi = require('../abis/rarity.json')
const { provider, nonceManager, wallet } = require('../config/wallet')

const contract = new ethers.Contract(rarityContractAddress, mintAbi, provider)

const { pause } = require('./utils')

/* WIP */
const writeContract = contract.connect(nonceManager)

const mint = async (type) => {
    let nonce = await wallet.getTransactionCount()
    let override = {
        nonce: nonce,
    }
    let response = await writeContract.summon(type, override)
    let receipt = await response.wait()
    let id = receipt.events[1].args.summoner.toNumber()
    console.log(id)
    pause()
}

const main = async () => {
    for (let b = 0; b < 5; b++) {
        for (let i = 1; i < 12; i++) {
            await mint(i)
        }
    }
}

main().catch(() => {
    console.error('there was an error')
})

// mint(1).catch((err) => {
//   console.error(err);
// });

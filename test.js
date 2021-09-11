require('dotenv').config()
const ethers = require('ethers')
const contracts = require('./config/contracts')
const goldContractAddress = contracts.gold
const rarityAbi = require('./abis/rarity_gold.json')
const { provider, nonceManager } = require('./config/wallet')
const { log, error } = require('./actions/utils')

const contract = new ethers.Contract(goldContractAddress, rarityAbi, provider)
const writeContract = contract.connect(nonceManager)

const claimable = async (id) => {
    let amount = await contract.claimable(id)
    return amount
}

const { checkLevel } = require('./actions/levelUp')

// const claim = async (summonerId) => {
//     try {
//         let level = await checkLevel(summonerId)
//         if(level.gt(1)) {
//             let response = await writeContract.claim(summonerId)
//             /* let receipt = */ await response.wait()
//             // log("gold", summonerId, receipt);
//             log('gold', summonerId, `Gold claimed successfully!`)
//     }
//     } catch (err) {
//         error('gold', summonerId, err)
//     }
// }

// module.exports = (
//     claim
// )

const test = async (summonerId) => {
  let ammt = await claimable(summonerId)
  console.log(ammt.toString());

}



test(163446).catch((err) => {
      console.error(err);
    });

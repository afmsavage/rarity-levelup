import * as dotenv from 'dotenv'
dotenv.config()
import {ethers} from 'ethers'
import {contracts} from '../config/contracts'
import {rarityContractAddress} from contracts.rarity
import * as rarityAbi from '../abis/rarity.json'
import { provider, nonceManager } from '../config/wallet'
import { log, error } from './utils'

const contract = new ethers.Contract(rarityContractAddress, rarityAbi, provider)
const writeContract = contract.connect(nonceManager)
const { pause } from './utils')

// get the time until next adventure
export const getAdventureLog = async (id) => {
    await provider.ready
    let adventurersLog = await contract.adventurers_log(id)
    return adventurersLog
}

// sends your summoner on an adventure!
export const adventure = async (summonerId, currentTime) => {
    let adventureTimestamp = await getAdventureLog(summonerId)
    if (currentTime.gt(adventureTimestamp)) {
        try {
            let response = await writeContract.adventure(summonerId)
            /* let receipt = */ await response.wait()
            // log("adventure", summonerId, receipt);
            log('adventure', summonerId, `Adventure successfull!`)
            pause()
        } catch (err) {
            error('adventure', summonerId, `Could not send the tx: ${err}`)
        }
    } else {
        log('adventure', summonerId, `Not yet time to adventure.`)
    }
}

// adventure().catch((err) => {
//   console.error(err);
// });

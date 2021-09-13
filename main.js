const adventure = require('./actions/adventure')
const { levelUp } = require('./actions/levelUp')
const craftAdventure = require('./actions/craftingMaterials1-1')
const summonerIds = require('./actions/summoners')
const ethers = require('ethers')
const { provider } = require('./config/wallet')
const { checkClass } = require('./actions/classes')
const { spendBaseAttributes } = require('./actions/spendBaseAttributes')
const claimGold = require('./actions/gold')

const main = async () => {
    let block = await provider.getBlock()
    let currentTime = ethers.BigNumber.from(block.timestamp)

    for (let i = 0; i < summonerIds.length; i++) {
        let summonerClass = await checkClass(summonerIds[i])
        console.log(
            `### Start with summoner ${summonerIds[i]} ${summonerClass} ###`
        )
        await adventure(summonerIds[i], currentTime)
        await levelUp(summonerIds[i])
        await craftAdventure(summonerIds[i], currentTime)
        await spendBaseAttributes(summonerIds[i])
        await claimGold(summonerIds[i])
        console.log(``)
    }
}

main().catch((err) => {
    console.error(err)
})

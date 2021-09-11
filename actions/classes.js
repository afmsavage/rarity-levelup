require('dotenv').config()
const ethers = require('ethers')
const contracts = require('../config/contracts')
const rarityContractAddress = contracts.rarity
const rarityAbi = require('../abis/rarity.json')
const { provider } = require('../config/wallet')
const contract = new ethers.Contract(rarityContractAddress, rarityAbi, provider)

const checkClass = async (summonerId) => {
    let summonerClass = await contract.class(summonerId)
    return classes[summonerClass.toString()]
}

const classes = {
    1: 'Barbarian',
    2: 'Bard',
    3: 'Cleric',
    4: 'Druid',
    5: 'Fighter',
    6: 'Monk',
    7: 'Paladin',
    8: 'Ranger',
    9: 'Rogue',
    10: 'Sorcerer',
    11: 'Wizard',
}

const baseAttributes = {
    Barbarian: {
        strength: 16,
        dexterity: 16,
        constitution: 16,
        intelligence: 8,
        wisdom: 10,
        charisma: 8,
    },
    Bard: {
        strength: 8,
        dexterity: 14,
        constitution: 10,
        intelligence: 15,
        wisdom: 14,
        charisma: 16,
    },
    Cleric: {
        strength: 13,
        dexterity: 13,
        constitution: 14,
        intelligence: 8,
        wisdom: 18,
        charisma: 8,
    },
    Druid: {
        strength: 8,
        dexterity: 12,
        constitution: 16,
        intelligence: 9,
        wisdom: 18,
        charisma: 9,
    },
    Fighter: {
        strength: 17,
        dexterity: 9,
        constitution: 16,
        intelligence: 8,
        wisdom: 15,
        charisma: 8,
    },
    Monk: {
        strength: 8,
        dexterity: 18,
        constitution: 15,
        intelligence: 8,
        wisdom: 15,
        charisma: 8,
    },
    Paladin: {
        strength: 16,
        dexterity: 10,
        constitution: 16,
        intelligence: 10,
        wisdom: 10,
        charisma: 14,
    },
    Ranger: {
        strength: 8,
        dexterity: 18,
        constitution: 15,
        intelligence: 8,
        wisdom: 15,
        charisma: 8,
    },
    Rogue: {
        strength: 8,
        dexterity: 16,
        constitution: 14,
        intelligence: 14,
        wisdom: 12,
        charisma: 14,
    },
    Sorcerer: {
        strength: 9,
        dexterity: 15,
        constitution: 15,
        intelligence: 9,
        wisdom: 9,
        charisma: 17,
    },
    Wizard: {
        strength: 8,
        dexterity: 14,
        constitution: 15,
        intelligence: 17,
        wisdom: 13,
        charisma: 8,
    },
}

module.exports = {
    checkClass,
    classes,
    baseAttributes,
}

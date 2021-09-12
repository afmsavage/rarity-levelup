require('dotenv').config()
const { NonceManager } = require('@ethersproject/experimental')
const ethers = require('ethers')
const endpoint = process.env.FTMPROVIDER // eslint-disable-line no-undef
const provider = new ethers.providers.JsonRpcProvider(endpoint, 250)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY) // eslint-disable-line no-undef
const account = wallet.connect(provider)
const nonceManager = new NonceManager(account)



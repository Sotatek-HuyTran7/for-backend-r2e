dotenv = require('dotenv').config()
const ethers = require('ethers')
const provider = new ethers.providers.getDefaultProvider(
  process.env.PROVIDER_URL,
)

const {
  signWithdrawToken,
  signWithdrawNFT,
} = require('../helper-sign')
///ABI

const ADDRESSES_FILE = require('../addresses/rinkeby_address.json')

const backendWallet = new ethers.Wallet(process.env.PRIVATE_KEY_BACKEND)
const backendAccount = backendWallet.connect(provider)

const userWallet = new ethers.Wallet(process.env.PRIVATE_KEY_USER)
const userAccount = userWallet.connect(provider)

ABI_TMR = require('../ABI/TMRToken.json').abi
ABI_TMG = require('../ABI/TMGToken.json').abi
ABI_CHARACTER = require('../ABI/NFTCharacter.json').abi
ABI_BADGE = require('../ABI/NFTBadge.json').abi
ABI_EQUIPMENT = require('../ABI/NFTEquipment.json').abi
ABI_TOOMICS = require('../ABI/Toomics.json').abi

const toomicsUser = new ethers.Contract(
  ADDRESSES_FILE.toomics,
  ABI_TOOMICS,
  userAccount,
)

let nonces = []
nonces[userWallet.address] = 1

async function main() {
  //SCRIPT

  //-----withdrawToken

  console.log('withdrawToken')
  sign = await signWithdrawToken(
    4, //chainId
    toomicsUser.address,
    backendWallet,
    nonces,
    userWallet.address,
    1,
    9999,
    ADDRESSES_FILE.tmrToken,
    ethers.utils.parseEther('0.2'),
  )

  estimate = await toomicsUser.estimateGas.withdrawToken(
    [sign],
    nonces[userWallet.address],
    1,
    9999,
    ADDRESSES_FILE.tmrToken,
    ethers.utils.parseEther('0.2'),
  )
  console.log(estimate)

  //-----withdrawNFT

  console.log('withdrawNFT')
  sign = await signWithdrawNFT(
    4, //chainId
    toomicsUser.address,
    backendWallet,
    nonces,
    userWallet.address,
    1,
    9999,
    [10, 11],
    ADDRESSES_FILE.nftCharacter,
    [3, 4],
  )
  estimate = await toomicsUser.estimateGas.withdrawNFT(
    [sign],
    nonces[userWallet.address],
    1,
    9999,
    [10, 11],
    ADDRESSES_FILE.nftCharacter,
    [3, 4],
  )
  console.log(estimate)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

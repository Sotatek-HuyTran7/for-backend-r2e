const signWithdrawToken = async (
  chainId,
  verifyingContract,
  signer,
  // nonce,
  userAddress,
  userId,
  withdrawRequestId,
  tokenAddress,
  amount,
) => {
  nonce++

  let sig = await signer._signTypedData(
    {
      name: 'toomics',
      version: '1',
      chainId,
      verifyingContract,
    },
    {
      WithdrawToken: [
        { name: 'nonce', type: 'uint256' },
        { name: 'userAddress', type: 'address' },
        { name: 'userId', type: 'uint256' },
        { name: 'withdrawRequestId', type: 'uint256' },
        { name: 'tokenAddress', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
    },
    {
      nonce,
      userAddress,
      userId,
      withdrawRequestId,
      tokenAddress,
      amount,
    }, // data;
  )

  return sig
}

const signWithdrawNFT = async (
  chainId,
  verifyingContract,
  signer,
  // nonce,
  userAddress,
  userId,
  withdrawRequestId,
  localIds,
  nftAddress,
  tokenIds,
) => {
  nonce++

  let sig = await signer._signTypedData(
    {
      name: 'toomics',
      version: '1',
      chainId,
      verifyingContract,
    },
    {
      WithdrawNFT: [
        { name: 'nonce', type: 'uint256' },
        { name: 'userAddress', type: 'address' },
        { name: 'userId', type: 'uint256' },
        { name: 'withdrawRequestId', type: 'uint256' },
        { name: 'localIds', type: 'uint256[]' },
        { name: 'nftAddress', type: 'address' },
        { name: 'tokenIds', type: 'uint256[]' },
      ],
    },
    {
      nonce,
      userAddress,
      userId,
      withdrawRequestId,
      localIds,
      nftAddress,
      tokenIds,
    }, // data;
  )
  // console.log('sig: ' + sig) //sig này trả về cho FE
  return sig
}

module.exports = {
  signWithdrawToken,
  signWithdrawNFT,
}

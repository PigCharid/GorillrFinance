require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version:"0.8.18",
  },
  // contractSizer: {
  //   alphaSort: true,
  //   runOnCompile: true,
  //   disambiguatePaths: false,
  // },
  etherscan: {
    apiKey: {
      goerli: 'HXPKRFHE5MF6S4RX3AK1VHQEE6JNF6WATM',
      bsc:"KN7DZWI4ZAEF2STC8STWJ9RTK9Y6FVMUNQ"
    }
  },
  networks: {
    bsc:{
      url:"https://rpc-bsc.48.club",
      chainId:56,
      accounts:["8c518aa2357c3ae051d60c86002e243f63235109626c8add1384cff8da467315"]
    },
    goerli:{
      url:"https://eth-goerli.g.alchemy.com/v2/Q1svh7bjqwrEd5tgBKY5fl5QFxeq3KsG",
      chainId:5,
      accounts:[""]
    },
  }
};
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "localhost",
  settings: {
    optimizer: {
      enabled: false,
      runs: 1000,
      // details: {
      //  yul: false
      //}
    }
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: false,
    strict: true,
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      allowUnlimitedContractSize: true,
    },
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${process.env.MAINNET_ALCHEMY_API_KEY}`,
        blockNumber: 14701924
      },
      gas: 10000000000, // tx gas limit
      blockGasLimit: 10000000000,
      networkCheckTimeout: 100000000000,
      timeout: 40000000000,
      timeoutBlocks: 3000000000,
      allowUnlimitedContractSize: true
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.RINKEBY_ALCHEMY_API_KEY}`,
      accounts: [`0x${process.env.RINKEBY_PRIVATE_KEY}`],
      gasPrice: 5000000000
    },
    // mainnet: {
    //  url: `https://mainnet.infura.io/v3/${process.env.MAINNET_INFURA_API_KEY}`,
    //  accounts: [`0x${process.env.MAINNET_PRIVATE_KEY}`],
    // },
  },
  etherscan: {
    apiKey: `${process.env.ETHERSCAN_API_KEY}`
  }
};

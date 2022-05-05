require("@nomiclabs/hardhat-waffle");
require('hardhat-contract-sizer');

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
        url: "https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_API_KEY}",
        blockNumber: 14701924
      },
      gas: 100000000,
      blockGasLimit: 10000000000,
      networkCheckTimeout: 100000000,
      timeout: 100000000,
      allowUnlimitedContractSize: true
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`0x${RINKEBY_PRIVATE_KEY}`],
      gasPrice: 5000000000
    },
  },
};

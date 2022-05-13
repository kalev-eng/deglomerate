// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const LogoSearcher = await hre.ethers.getContractFactory("LogoSearcher", {
    libraries: {
    },
  });
  const logoSearcher = await LogoSearcher.deploy("0x2Dd78Fd9B8F40659Af32eF98555B8b31bC97A351");
  await logoSearcher.deployed();
  console.log("Logo Searcher deployed to:", logoSearcher.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

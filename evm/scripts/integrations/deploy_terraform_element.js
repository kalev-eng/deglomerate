// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const TerraformLogoElement = await hre.ethers.getContractFactory("TerraformLogoElement", {
    libraries: {},
  });
  const terraformLogoElement = await TerraformLogoElement.deploy();
  console.log("terraformLogoElement deployed to:", terraformLogoElement.address);

  const LogoDescriptor = await hre.ethers.getContractFactory("LogoDescriptor");
  const logoDescriptor = await LogoDescriptor.attach("0xeA55c5579e1ccE3e52217493788f2a909e64f64F");

  await logoDescriptor.setApprovedContracts([terraformLogoElement.address]);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

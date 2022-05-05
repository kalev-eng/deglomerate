// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const BackgroundLogoElement = await hre.ethers.getContractFactory("BackgroundLogoElement");
  const backgroundLogoElement = await BackgroundLogoElement.attach("0xa9Aa5143659B6BFf788C6050F4A0B2426B3BCf2A");

  const EmoticonLogoElement = await hre.ethers.getContractFactory("EmoticonLogoElement");
  const emoticonLogoElement = await EmoticonLogoElement.attach("0x2A99a17D663fB65DEa91C9FD019799c8b2C3Aa56");

  const TextLogoElement = await hre.ethers.getContractFactory("TextLogoElement");
  const textLogoElement = await TextLogoElement.attach("0xF880E6390f1A94DE4cf81Af96C0C3a7df11abe2a");

  const Logos = await hre.ethers.getContractFactory("Logos");
  const logos = await Logos.attach("0x127AE59fd35E8F85C0e1B9db61945C94ed2d258b");

  var result = await backgroundLogoElement.tokenURI(0);
  console.log(result);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

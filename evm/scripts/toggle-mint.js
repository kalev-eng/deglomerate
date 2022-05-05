// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const BackgroundLogoElement = await hre.ethers.getContractFactory("BackgroundLogoElement");
  const backgroundLogoElement = await BackgroundLogoElement.attach("0x9EeC4EdE727D25cBB4348D8cCA109F3109537ecd");

  const EmoticonLogoElement = await hre.ethers.getContractFactory("EmoticonLogoElement");
  const emoticonLogoElement = await EmoticonLogoElement.attach("0x2A99a17D663fB65DEa91C9FD019799c8b2C3Aa56");

  const TextLogoElement = await hre.ethers.getContractFactory("TextLogoElement");
  const textLogoElement = await TextLogoElement.attach("0x03E2339A17035A17059fAb862Cf68e0cAdcF0Bf9");

  const Logos = await hre.ethers.getContractFactory("Logos");
  const logos = await Logos.attach("0xcA2849e7a32BCa1cEe3eF511C05429c03860FDcf");

  await backgroundLogoElement.toggleMint();
  await emoticonLogoElement.toggleMint();
  await textLogoElement.toggleMint();
  await logos.toggleMint();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

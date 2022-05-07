// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const BackgroundLogoElement = await hre.ethers.getContractFactory("BackgroundLogoElement");
  const backgroundLogoElement = await BackgroundLogoElement.attach("0xfedf7d1f0bde821407B4906482e0d94CE2B04b1c");

  const EmoticonLogoElement = await hre.ethers.getContractFactory("EmoticonLogoElement");
  const emoticonLogoElement = await EmoticonLogoElement.attach("0x0F552be8CB76f7310129ea9ac9566290bCcBe087");

  const TextLogoElement = await hre.ethers.getContractFactory("TextLogoElement");
  const textLogoElement = await TextLogoElement.attach("0xe879E7cb78bc665026509598F534A9820F9db88A");

  const Logos = await hre.ethers.getContractFactory("Logos");
  const logos = await Logos.attach("0x320CCb623b612Eef62F186AfF6b664377cb4260b");

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

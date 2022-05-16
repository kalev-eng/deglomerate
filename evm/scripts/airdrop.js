// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const BackgroundLogoElement = await hre.ethers.getContractFactory("BackgroundLogoElement");
  const backgroundLogoElement = await BackgroundLogoElement.attach("0xfedf7d1f0bde821407B4906482e0d94CE2B04b1c");

  const Logos = await hre.ethers.getContractFactory("Logos");
  const logos = await Logos.attach("0x320CCb623b612Eef62F186AfF6b664377cb4260b");

  /*
  const contractAddress = '0xd65c5D035A35F41f31570887E3ddF8c3289EB920';
  const erc = await hre.ethers.getContractFactory("ERC721A");
  const ethTContract = await erc.attach(contractAddress);

  var owners = new Set()
  for (let i = 1; i <= 4269; i ++) {
    let owner = await ethTContract.ownerOf(i)
    if (owner !== contractAddress) {
      owners.add(owner);
    }
  }
  var distributionList = Array.from(owners);
  console.log(distributionList.length);
  
  for (let i = 0; i < distributionList.length; i++) {
    console.log(distributionList[i]);
  }
  */
  
  var distributionList = ['0xa9d2F90BD250E82E5ddc0d14d27063de21768848', '0x5578851e8c3e7520485dc8cDd6B13049D078bc8e']
  var thisBatch = [];
  for (let i = 0; i < distributionList.length; i++) {
    thisBatch.push(distributionList[i]);
    if (thisBatch.length % 2 == 0) {
      console.log('Airdropping for bucket...')
      console.log(thisBatch);
      await backgroundLogoElement.mintAdmin(thisBatch, 1, { gasLimit : 200000 });
      await logos.mintAdmin(thisBatch, 1, { gasLimit : 200000 });
      // await backgroundLogoElement.mintAdmin(thisBatch, 1, { gasLimit : 1875000 });
      // await logos.mintAdmin(thisBatch, 1, { gasLimit : 1875000 });
      thisBatch = [];
    }
  }

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

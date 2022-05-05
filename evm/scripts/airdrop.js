// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const BackgroundLogoElement = await hre.ethers.getContractFactory("BackgroundLogoElement");
  const backgroundLogoElement = await BackgroundLogoElement.attach("0xF1622FAC4cab336379795b1C209C09996FAfD533");
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
  
  var thisBatch = [];
  for (let i = 0; i < distributionList.length; i++) {
    thisBatch.push(distributionList[i]);
    if (thisBatch.size % 25 == 0) {
      console.log('Airdropping for bucket...')
      console.log(owners)
      await backgroundLogoElement.mintAdmin(thisBatch, 1, { gasLimit : 1875000 });
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

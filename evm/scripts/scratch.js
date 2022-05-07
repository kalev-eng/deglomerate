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

  const EmoticonLogoElementDescriptor = await hre.ethers.getContractFactory("EmoticonLogoElementDescriptor", {
    libraries: {
      LogoFactory: '0x74cd89f794BDBf81971A054E3B9adAa51d9781e7',
      LogoHelper: '0xE4E64B52d86BA86c5553b0E9972Cd30B509A40D9',
      SvgEmoticonComposer: '0xCa520e47E11441d5657b5BDa638C5D879a2e68A3',
    },
  });
  const emoticonLogoElementDescriptor = await EmoticonLogoElementDescriptor.attach("0xC743402D6E91143E5d40a2f75b47f4e8a1789F9B");

  const TextLogoElement = await hre.ethers.getContractFactory("TextLogoElement");
  const textLogoElement = await TextLogoElement.attach("0xe879E7cb78bc665026509598F534A9820F9db88A");

  const TextLogoElementDescriptor = await hre.ethers.getContractFactory("TextLogoElementDescriptor", {
  libraries: {
    LogoFactory: '0x74cd89f794BDBf81971A054E3B9adAa51d9781e7',
    LogoHelper: '0xE4E64B52d86BA86c5553b0E9972Cd30B509A40D9',
    SvgTextBuilder: '0x464da91688fB68048a2AC6BD6ecDabcC4360791F',
  },
});
  const textLogoElementDescriptor = await TextLogoElementDescriptor.attach("0x587A9bE02B75406557e3dDC13a281cA8ab54239d");

  const Logos = await hre.ethers.getContractFactory("Logos");
  const logos = await Logos.attach("0x127AE59fd35E8F85C0e1B9db61945C94ed2d258b");

  // var result = await backgroundLogoElement.tokenURI(0);
  // console.log(result);

  const fonts = ['https://fonts.googleapis.com/css?family=Rubik', 'https://fonts.googleapis.com/css?family=Playfair+Display', 'https://fonts.googleapis.com/css?family=Oswald', 'https://fonts.googleapis.com/css?family=Work+Sans', 'https://fonts.googleapis.com/css?family=Krona+One', 'https://fonts.googleapis.com/css?family=Italiana', 'https://fonts.googleapis.com/css?family=Federo', 'https://fonts.googleapis.com/css?family=Caudex', 'https://fonts.googleapis.com/css?family=VT323', 'https://fonts.googleapis.com/css?family=Faster+One'];
  console.log('here1');
  await textLogoElementDescriptor.setApprovedFontLinks(fonts);
  console.log('here2');
  await emoticonLogoElementDescriptor.setApprovedFontLinks(fonts);
  console.log('here3');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

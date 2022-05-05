// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const SvgElement = await hre.ethers.getContractFactory("SvgElement");
  const svgElement = await SvgElement.deploy();
  console.log("svgElement deployed to:", svgElement.address);

  const InlineSvgElement = await hre.ethers.getContractFactory("InlineSvgElement");
  const inlineSvgElement = await InlineSvgElement.deploy();
  console.log("inlineSvgElement deployed to:", inlineSvgElement.address);

  const Color = await hre.ethers.getContractFactory("Color");
  const color = await Color.deploy();
  console.log("color deployed to:", color.address);

  const LogoHelper = await hre.ethers.getContractFactory("LogoHelper");
  const logoHelper = await LogoHelper.deploy();
  console.log("logoHelper deployed to:", logoHelper.address);

  const SvgEmoticon = await hre.ethers.getContractFactory("SvgEmoticon", {
    libraries: {
      SvgElement: svgElement.address,
    },
  });
  const svgEmoticon = await SvgEmoticon.deploy();
  console.log("svgEmoticon deployed to:", svgEmoticon.address);

  const SvgPattern = await hre.ethers.getContractFactory("SvgPattern", {
    libraries: {
      SvgElement: svgElement.address,
      LogoHelper: logoHelper.address,
    },
  });
  const svgPattern = await SvgPattern.deploy();
  console.log("SvgPattern deployed to:", svgPattern.address);

  const LogoType = await hre.ethers.getContractFactory("LogoType", {
    libraries: {
      Color: color.address,
    },
  });
  const logoType = await LogoType.deploy();
  console.log("logoType deployed to:", logoType.address);

  const LogoFactory = await hre.ethers.getContractFactory("LogoFactory", {
    libraries: {
      LogoType: logoType.address,
      LogoHelper: logoHelper.address,
    },
  });
  const logoFactory = await LogoFactory.deploy();
  console.log("logoFactory deployed to:", logoFactory.address);

  const SvgFill = await hre.ethers.getContractFactory("SvgFill", {
    libraries: {
      SvgElement: svgElement.address,
      LogoHelper: logoHelper.address,
    },
  });
  const svgFill = await SvgFill.deploy();
  console.log("svgFill deployed to:", svgFill.address);

  const SvgFilter = await hre.ethers.getContractFactory("SvgFilter", {
    libraries: {
      SvgElement: svgElement.address,
      LogoHelper: logoHelper.address,
    },
  });
  const svgFilter = await SvgFilter.deploy();
  console.log("svgFilter deployed to:", svgFilter.address);

  const SvgText = await hre.ethers.getContractFactory("SvgText", {
    libraries: {
      SvgElement: svgElement.address,
      SvgFill: svgFill.address,
      LogoHelper: logoHelper.address,
    },
  });
  const svgText = await SvgText.deploy();
  console.log("svgText deployed to:", svgText.address);

  const SvgHeader = await hre.ethers.getContractFactory("SvgHeader", {
    libraries: {
      LogoHelper: logoHelper.address,
    },
  });
  const svgHeader = await SvgHeader.deploy();
  console.log("svgHeader deployed to:", svgHeader.address);

  const SvgEmoticonBuilder = await hre.ethers.getContractFactory("SvgEmoticonBuilder", {
    libraries: {
      SvgText: svgText.address,
      SvgFill: svgFill.address,
      SvgEmoticon: svgEmoticon.address,
      LogoHelper: logoHelper.address,
    },
  });
  const svgEmoticonBuilder = await SvgEmoticonBuilder.deploy();
  console.log("svgEmoticonBuilder deployed to:", svgEmoticonBuilder.address);

  const SvgBackground = await hre.ethers.getContractFactory("SvgBackground", {
    libraries: {
      SvgFill: svgFill.address,
      SvgFilter: svgFilter.address,
      SvgElement: svgElement.address,
      SvgPattern: svgPattern.address,
      LogoHelper: logoHelper.address,
    },
  });
  const svgBackground = await SvgBackground.deploy();
  console.log("svgBackground deployed to:", svgBackground.address);

  const SvgBackgroundBuilder = await hre.ethers.getContractFactory("SvgBackgroundBuilder", {
    libraries: {
      SvgBackground: svgBackground.address,
      SvgHeader: svgHeader.address,
    },
  });
  const svgBackgroundBuilder = await SvgBackgroundBuilder.deploy();
  console.log("svgBackgroundBuilder deployed to:", svgBackgroundBuilder.address);

  const SvgEmoticonComposer = await hre.ethers.getContractFactory("SvgEmoticonComposer", {
    libraries: {
      SvgEmoticonBuilder: svgEmoticonBuilder.address,
    },
  });
  const svgEmoticonComposer = await SvgEmoticonComposer.deploy();
  console.log("svgEmoticonComposer deployed to:", svgEmoticonComposer.address);

  const SvgTextBuilder = await hre.ethers.getContractFactory("SvgTextBuilder", {
    libraries: {
      SvgText: svgText.address,
    },
  });
  const svgTextBuilder = await SvgTextBuilder.deploy();
  console.log("svgTextBuilder deployed to:", svgTextBuilder.address);

  const BackgroundLogoElement = await hre.ethers.getContractFactory("BackgroundLogoElement", {
    libraries: {
    },
  });
  const backgroundLogoElement = await BackgroundLogoElement.deploy();
  console.log("BGBL deployed to:", backgroundLogoElement.address);

  const BackgroundLogoElementDsecriptor = await hre.ethers.getContractFactory("BackgroundLogoElementDescriptor", {
    libraries: {
      LogoFactory: logoFactory.address,
      LogoHelper: logoHelper.address,
      SvgBackgroundBuilder: svgBackgroundBuilder.address,
    },
  });
  const backgroundLogoElementDescriptor = await BackgroundLogoElementDsecriptor.deploy(backgroundLogoElement.address);
  console.log("BGBL descriptor deployed to:", backgroundLogoElementDescriptor.address);

  await backgroundLogoElement.setDescriptorAddress(backgroundLogoElementDescriptor.address);

  const EmoticonLogoElement = await hre.ethers.getContractFactory("EmoticonLogoElement", {
    libraries: {},
  });
  const emoticonLogoElement = await EmoticonLogoElement.deploy();
  console.log("FGBL deployed to:", emoticonLogoElement.address);

  const EmoticonLogoElementDescriptor = await hre.ethers.getContractFactory("EmoticonLogoElementDescriptor", {
    libraries: {
      LogoFactory: logoFactory.address,
      LogoHelper: logoHelper.address,
      SvgEmoticonComposer: svgEmoticonComposer.address,
    },
  });
  const emoticonLogoElementDescriptor = await EmoticonLogoElementDescriptor.deploy(emoticonLogoElement.address);
  console.log("FGBL descriptor deployed to:", emoticonLogoElementDescriptor.address);

  await emoticonLogoElement.setDescriptorAddress(emoticonLogoElementDescriptor.address);

  const EthTerrestrialLogoElement = await hre.ethers.getContractFactory("EthTerrestrialLogoElement", {
    libraries: {},
  });
  // const ethTerrestrialLogoElement = await EthTerrestrialLogoElement.deploy('0xd65c5D035A35F41f31570887E3ddF8c3289EB920', '0xEdAC00935844245e40218F418cC6527C41513B25');
  const ethTerrestrialLogoElement = await EthTerrestrialLogoElement.deploy('0xd65c5D035A35F41f31570887E3ddF8c3289EB920', '0xDFe359d2B9D34182C0320125A2886408AaC631e7');
  console.log("EthTerrestrialsLogo deployed to:", ethTerrestrialLogoElement.address);

  const NounLogoElement = await hre.ethers.getContractFactory("NounLogoElement", {
    libraries: {},
  });
  const nounLogoElement = await NounLogoElement.deploy('0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03', '0x0Cfdb3Ba1694c2bb2CFACB0339ad7b1Ae5932B63');
  console.log("NounLogo deployed to:", nounLogoElement.address);

  const TextLogoElement = await hre.ethers.getContractFactory("TextLogoElement", {
    libraries: {
    },
  });
  const textLogoElement = await TextLogoElement.deploy();
  console.log("TBL deployed to:", textLogoElement.address);

  const TextLogoElementDescriptor = await hre.ethers.getContractFactory("TextLogoElementDescriptor", {
    libraries: {
      LogoFactory: logoFactory.address,
      LogoHelper: logoHelper.address,
      SvgTextBuilder: svgTextBuilder.address,
    },
  });
  const textLogoElementDescriptor = await TextLogoElementDescriptor.deploy(textLogoElement.address);
  console.log("TBL descriptor deployed to:", textLogoElementDescriptor.address);

  await textLogoElement.setDescriptorAddress(textLogoElementDescriptor.address);
  
  const Logos = await hre.ethers.getContractFactory("Logos", {
    libraries: {
    },
  });
  const logos = await Logos.deploy();
  await logos.deployed();
  console.log("Logo deployed to:", logos.address);

  const LogoNftDescriptor = await hre.ethers.getContractFactory("LogoNftDescriptor", {
    libraries: {
      LogoHelper: logoHelper.address,
    },
  });
  const logoNftDescriptor = await LogoNftDescriptor.deploy();
  await logoNftDescriptor.deployed();
  console.log("Logo Nft Descriptor deployed to:", logoNftDescriptor.address);

  const LogoDescriptor = await hre.ethers.getContractFactory("LogoDescriptor", {
    libraries: {
      LogoHelper: logoHelper.address,
      SvgElement: svgElement.address,
      SvgHeader: svgHeader.address,
    },
  });
  const logoDescriptor = await LogoDescriptor.deploy(logos.address, logoNftDescriptor.address);
  await logoDescriptor.deployed();
  console.log("Logo Descriptor deployed to:", logoDescriptor.address);

  const LogoSearcher = await hre.ethers.getContractFactory("LogoSearcher", {
    libraries: {
    },
  });
  const logoSearcher = await LogoSearcher.deploy(logoDescriptor.address);
  await logoSearcher.deployed();
  console.log("Logo Searcher deployed to:", logoSearcher.address);

  await logos.setDescriptorAddress(logoDescriptor.address);

  await logoDescriptor.setApprovedContracts([backgroundLogoElement.address, emoticonLogoElement.address, textLogoElement.address, ethTerrestrialLogoElement.address, nounLogoElement.address]);
  const fonts = ['https://fonts.googleapis.com/css?family=Rubik', 'https://fonts.googleapis.com/css?family=Playfair+Display', 'https://fonts.googleapis.com/css?family=Oswald', 'https://fonts.googleapis.com/css?family=Work+Sans', 'https://fonts.googleapis.com/css?family=Krona+One', 'https://fonts.googleapis.com/css?family=Italiana', 'https://fonts.googleapis.com/css?family=Federo', 'https://fonts.googleapis.com/css?family=Caudex', 'https://fonts.googleapis.com/css?family=VT323', 'https://fonts.googleapis.com/css?family=Faster+One'];
  await textLogoElementDescriptor.setApprovedFontLinks(fonts);
  await emoticonLogoElementDescriptor.setApprovedFontLinks(fonts);

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

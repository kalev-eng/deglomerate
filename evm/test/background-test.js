const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Background and BackgroundDescriptor contract", function () {
  beforeEach(async function () {
    this.nullAddress = '0x0000000000000000000000000000000000000000';
    
    const SvgElement = await hre.ethers.getContractFactory("SvgElement");
    this.svgElement = await SvgElement.deploy();

    const InlineSvgElement = await hre.ethers.getContractFactory("InlineSvgElement");
    this.inlineSvgElement = await InlineSvgElement.deploy();

    const Color = await hre.ethers.getContractFactory("Color");
    this.color = await Color.deploy();

    const LogoHelper = await hre.ethers.getContractFactory("LogoHelper");
    this.logoHelper = await LogoHelper.deploy();

    const SvgEmoticon = await hre.ethers.getContractFactory("SvgEmoticon", {
      libraries: {
        SvgElement: this.svgElement.address,
      },
    });
    this.svgEmoticon = await SvgEmoticon.deploy();

    const SvgPattern = await hre.ethers.getContractFactory("SvgPattern", {
      libraries: {
        SvgElement: this.svgElement.address,
        LogoHelper: this.logoHelper.address,
      },
    });
    this.svgPattern = await SvgPattern.deploy();

    const LogoType = await hre.ethers.getContractFactory("LogoType", {
      libraries: {
        Color: this.color.address,
      },
    });
    this.logoType = await LogoType.deploy();

    const LogoFactory = await hre.ethers.getContractFactory("LogoFactory", {
      libraries: {
        LogoType: this.logoType.address,
        LogoHelper: this.logoHelper.address,
      },
    });
    this.logoFactory = await LogoFactory.deploy();

    const SvgFill = await hre.ethers.getContractFactory("SvgFill", {
      libraries: {
        SvgElement: this.svgElement.address,
        LogoHelper: this.logoHelper.address,
      },
    });
    this.svgFill = await SvgFill.deploy();

    const SvgFilter = await hre.ethers.getContractFactory("SvgFilter", {
      libraries: {
        SvgElement: this.svgElement.address,
        LogoHelper: this.logoHelper.address,
      },
    });
    this.svgFilter = await SvgFilter.deploy();

    const SvgText = await hre.ethers.getContractFactory("SvgText", {
      libraries: {
        SvgElement: this.svgElement.address,
        SvgFill: this.svgFill.address,
        LogoHelper: this.logoHelper.address,
      },
    });
    this.svgText = await SvgText.deploy();

    const SvgHeader = await hre.ethers.getContractFactory("SvgHeader", {
      libraries: {
        LogoHelper: this.logoHelper.address,
      },
    });
    this.svgHeader = await SvgHeader.deploy();

    const SvgEmoticonBuilder = await hre.ethers.getContractFactory("SvgEmoticonBuilder", {
      libraries: {
        SvgText: this.svgText.address,
        SvgFill: this.svgFill.address,
        SvgEmoticon: this.svgEmoticon.address,
        LogoHelper: this.logoHelper.address,
      },
    });
    this.svgEmoticonBuilder = await SvgEmoticonBuilder.deploy();

    const SvgBackground = await hre.ethers.getContractFactory("SvgBackground", {
      libraries: {
        SvgFill: this.svgFill.address,
        SvgFilter: this.svgFilter.address,
        SvgElement: this.svgElement.address,
        SvgPattern: this.svgPattern.address,
        LogoHelper: this.logoHelper.address,
      },
    });
    this.svgBackground = await SvgBackground.deploy();

    const SvgBackgroundBuilder = await hre.ethers.getContractFactory("SvgBackgroundBuilder", {
      libraries: {
        SvgBackground: this.svgBackground.address,
        SvgHeader: this.svgHeader.address,
      },
    });
    this.svgBackgroundBuilder = await SvgBackgroundBuilder.deploy();

    const SvgEmoticonComposer = await hre.ethers.getContractFactory("SvgEmoticonComposer", {
      libraries: {
        SvgEmoticonBuilder: this.svgEmoticonBuilder.address,
      },
    });
    this.svgEmoticonComposer = await SvgEmoticonComposer.deploy();

    const SvgTextBuilder = await hre.ethers.getContractFactory("SvgTextBuilder", {
      libraries: {
        SvgText: this.svgText.address,
      },
    });
    this.svgTextBuilder = await SvgTextBuilder.deploy();

    const BackgroundLogoElement = await hre.ethers.getContractFactory("BackgroundLogoElement", {
      libraries: {
      },
    });
    this.backgroundLogoElement = await BackgroundLogoElement.deploy();

    const BackgroundLogoElementDescriptor = await hre.ethers.getContractFactory("BackgroundLogoElementDescriptor", {
      libraries: {
        LogoFactory: this.logoFactory.address,
        LogoHelper: this.logoHelper.address,
        SvgBackgroundBuilder: this.svgBackgroundBuilder.address,
      },
    });
    this.backgroundLogoElementDescriptor = await BackgroundLogoElementDescriptor.deploy(this.backgroundLogoElement.address);

    await this.backgroundLogoElement.setDescriptorAddress(this.backgroundLogoElementDescriptor.address);

    const signers = await hre.ethers.getSigners();
    this.defaultAddress = signers[0].address;
    
    this.address2 = signers[1].address;
    this.address3 = signers[2].address;

    this.bgSignerAddress2 = this.backgroundLogoElement.connect(signers[1]);
    this.bgSignerAddress3 = this.backgroundLogoElement.connect(signers[2]);

    this.descriptorSignerAddress2 = this.backgroundLogoElementDescriptor.connect(signers[1]);
    this.descriptorSignerAddress3 = this.backgroundLogoElementDescriptor.connect(signers[2]);
  });

  it("Should restrict onlyOwner methods", async function () {
    // Background contract
    await expect(this.bgSignerAddress2.setDescriptorAddress(this.nullAddress)).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.bgSignerAddress2.sealContract()).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.bgSignerAddress2.sendValue(this.nullAddress, 1)).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.bgSignerAddress2.setPrice(ethers.utils.parseEther('0.02'))).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.bgSignerAddress2.mintAdmin([this.nullAddress], 50)).to.be.revertedWith('Ownable: caller is not the owner');
  });

  it("Should seal contract", async function () {
    // Background contract
    var tx = await this.backgroundLogoElement.sealContract()
    await tx.wait();
    await expect(this.backgroundLogoElement.setDescriptorAddress(this.nullAddress)).to.be.revertedWith('Contract is sealed');
    await expect(this.backgroundLogoElement.toggleMint()).to.be.revertedWith('Contract is sealed');

  });

  it("Should only allow owner to set", async function () {
    // Descriptor Contract
    var toggleTx = await this.backgroundLogoElement.toggleMint();
    await toggleTx.wait();

    var mintTx = await this.bgSignerAddress2.mint(1, { value: ethers.utils.parseEther('0.02')});
    await mintTx.wait();

    // is owner
    this.descriptorSignerAddress2.setDimensions(0, 1, 2);

    // is not owner
    await expect(this.descriptorSignerAddress3.setDimensions(0, 1, 2)).to.be.revertedWith('Must be owner of background');
  });

  it("Should prevent mint", async function () {
    // mint not toggled
    await expect(this.bgSignerAddress2.mint(2, { value: ethers.utils.parseEther('0.04')})).to.be.revertedWith('Mint is not active');

    // mint too many
    var toggleTx = await this.backgroundLogoElement.toggleMint();
    await toggleTx.wait();

    await expect(this.bgSignerAddress2.mint(11, { value: ethers.utils.parseEther('0.22')})).to.be.revertedWith('Only 10 tokens can be minted at once');
  });

  it("Should set mint price", async function () {
    // set price, pay correct price
    var toggleTx = await this.backgroundLogoElement.toggleMint();
    await toggleTx.wait();

    var mintTx = await this.bgSignerAddress2.mint(1, { value: ethers.utils.parseEther('0.02')});
    await mintTx.wait();

    var priceTx = await this.backgroundLogoElement.setPrice(ethers.utils.parseEther('1'));
    await priceTx.wait()

    var mintTx = await this.bgSignerAddress2.mint(1, { value: ethers.utils.parseEther('1')});
    await mintTx.wait();

    // more than 1 quantity
    mintTx = await this.bgSignerAddress2.mint(3, { value: ethers.utils.parseEther('3')});
    await mintTx.wait();

    // pay incorrect price
    await expect(this.bgSignerAddress2.mint(1, { value: ethers.utils.parseEther('10')})).to.be.revertedWith('Incorrect eth amount sent');

    priceTx = await this.backgroundLogoElement.setPrice(ethers.utils.parseEther('2'));
    await priceTx.wait()

    mintTx = await this.bgSignerAddress2.mint(3, { value: ethers.utils.parseEther('6')});
    await mintTx.wait();
  });
});
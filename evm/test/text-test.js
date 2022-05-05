const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Text and TextDescriptor contract", function () {
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

    const EmoticonLogoElement = await hre.ethers.getContractFactory("EmoticonLogoElement", {
      libraries: {},
    });
    this.emoticonLogoElement = await EmoticonLogoElement.deploy();

    const EmoticonLogoElementDescriptor = await hre.ethers.getContractFactory("EmoticonLogoElementDescriptor", {
      libraries: {
        LogoFactory: this.logoFactory.address,
        LogoHelper: this.logoHelper.address,
        SvgEmoticonComposer: this.svgEmoticonComposer.address,
      },
    });
    this.emoticonLogoElementDescriptor = await EmoticonLogoElementDescriptor.deploy(this.emoticonLogoElement.address);

    await this.emoticonLogoElement.setDescriptorAddress(this.emoticonLogoElementDescriptor.address);

    const TextLogoElement = await hre.ethers.getContractFactory("TextLogoElement", {
      libraries: {
      },
    });
    this.textLogoElement = await TextLogoElement.deploy();

    const TextLogoElementDescriptor = await hre.ethers.getContractFactory("TextLogoElementDescriptor", {
      libraries: {
        LogoFactory: this.logoFactory.address,
        LogoHelper: this.logoHelper.address,
        SvgTextBuilder: this.svgTextBuilder.address,
      },
    });
    this.textLogoElementDescriptor = await TextLogoElementDescriptor.deploy(this.textLogoElement.address);

    await this.textLogoElement.setDescriptorAddress(this.textLogoElementDescriptor.address);

    const signers = await hre.ethers.getSigners();
    this.defaultAddress = signers[0].address;
    
    this.address2 = signers[1].address;
    this.address3 = signers[2].address;

    this.emoticonSignerAddress2 = this.emoticonLogoElement.connect(signers[1]);
    this.emoticonSignerAddress3 = this.emoticonLogoElement.connect(signers[2]);

    this.emoticonDescriptorSignerAddress2 = this.emoticonLogoElementDescriptor.connect(signers[1]);

    this.textSignerAddress2 = this.textLogoElement.connect(signers[1]);
    this.textSignerAddress3 = this.textLogoElement.connect(signers[2]);

    this.textDescriptorSignerAddress2 = this.textLogoElementDescriptor.connect(signers[1]);
  });

  it("Should restrict onlyOwner methods", async function () {
    // Text contract
    await expect(this.textSignerAddress2.setDescriptorAddress(this.nullAddress)).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.textSignerAddress2.toggleMint()).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.textSignerAddress2.sealContract()).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.textSignerAddress2.sealContract()).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.textSignerAddress2.setPrice(ethers.utils.parseEther('0.02'))).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.textSignerAddress2.mintAdmin(this.nullAddress, 50)).to.be.revertedWith('Ownable: caller is not the owner');

    // TextDescriptor contract
    await expect(this.textDescriptorSignerAddress2.setApprovedFontLinks(['testFontLink'])).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.textDescriptorSignerAddress2.setUnapprovedFontLinks(['testFontLink'])).to.be.revertedWith('Ownable: caller is not the owner');

    // Emoticon contract
    await expect(this.emoticonSignerAddress2.setDescriptorAddress(this.nullAddress)).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.emoticonSignerAddress2.toggleMint()).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.emoticonSignerAddress2.sealContract()).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.emoticonSignerAddress2.setPrice(ethers.utils.parseEther('0.02'))).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.emoticonSignerAddress2.mintAdmin(this.nullAddress, 50)).to.be.revertedWith('Ownable: caller is not the owner');

    // EmoticonDescriptor contract
    await expect(this.emoticonDescriptorSignerAddress2.setApprovedFontLinks(['testFontLink'])).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.emoticonDescriptorSignerAddress2.setUnapprovedFontLinks(['testFontLink'])).to.be.revertedWith('Ownable: caller is not the owner');
  });

  it("Should seal contract", async function () {
    // Text contract
    var tx = await this.textLogoElement.sealContract()
    await tx.wait();
    await expect(this.textLogoElement.toggleMint()).to.be.revertedWith('Contract is sealed');

    // TextDescriptor contract
    tx = await this.textLogoElementDescriptor.sealContract()
    await tx.wait();
    await expect(this.textLogoElementDescriptor.setApprovedFontLinks(['testFontLink'])).to.be.revertedWith('Contract is sealed');
    await expect(this.textLogoElementDescriptor.setUnapprovedFontLinks(['testFontLink'])).to.be.revertedWith('Contract is sealed');


    // Emoticon contract
    var tx = await this.emoticonLogoElement.sealContract()
    await tx.wait();
    await expect(this.emoticonLogoElement.toggleMint()).to.be.revertedWith('Contract is sealed');

    // EmoticonDescriptor contract
    tx = await this.emoticonLogoElementDescriptor.sealContract()
    await tx.wait();
    await expect(this.emoticonLogoElementDescriptor.setApprovedFontLinks(['testFontLink'])).to.be.revertedWith('Contract is sealed');
    await expect(this.emoticonLogoElementDescriptor.setUnapprovedFontLinks(['testFontLink'])).to.be.revertedWith('Contract is sealed');
  });

  it("Should only allow txt owner to set", async function () {
    // Text Contract
    var toggleTx = await this.textLogoElement.toggleMint();
    await toggleTx.wait();

    var mintTx = await this.textSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    // is owner
    this.textSignerAddress2.setTxtVal(0, 'test');
    this.textSignerAddress2.setFont(0, 'test', 'test');

    // is not owner
    await expect(this.textSignerAddress3.setTxtVal(0, 'test')).to.be.revertedWith('Need to own token');
    await expect(this.textSignerAddress3.setFont(0, 'test', 'test')).to.be.revertedWith('Need to own token');

    // Emoticon Contract
    var toggleTx = await this.emoticonLogoElement.toggleMint();
    await toggleTx.wait();

    var mintTx = await this.emoticonSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    // is owner
    this.emoticonSignerAddress2.setTxtVal(0, 'test');
    this.emoticonSignerAddress2.setFont(0, 'test', 'test');

    // is not owner
    await expect(this.emoticonSignerAddress3.setTxtVal(0, 'test')).to.be.revertedWith('Need to own token');
    await expect(this.emoticonSignerAddress3.setFont(0, 'test', 'test')).to.be.revertedWith('Need to own token');
  });

  it("Should determine if txt is allowed", async function () {
    var isAllowed = await this.textLogoElementDescriptor.isTxtAllowed('hello');
    expect(isAllowed).to.equal(true);

    isAllowed = await this.textLogoElementDescriptor.isTxtAllowed('hello there');
    expect(isAllowed).to.equal(true);

    isAllowed = await this.textLogoElementDescriptor.isTxtAllowed('heLloZ TherZZe');
    expect(isAllowed).to.equal(true);

    isAllowed = await this.textLogoElementDescriptor.isTxtAllowed('heLl0oZ Th1erZZe99');
    expect(isAllowed).to.equal(true);

    isAllowed = await this.textLogoElementDescriptor.isTxtAllowed('he.llo there');
    expect(isAllowed).to.equal(false);

    isAllowed = await this.textLogoElementDescriptor.isTxtAllowed('he.llo (there');
    expect(isAllowed).to.equal(false);

    isAllowed = await this.textLogoElementDescriptor.isTxtAllowed('helzzzzzzzzzzzzzzzzzzzzzzzlo there');
    expect(isAllowed).to.equal(false);
  });


  it("Should prevent mint", async function () {
    // Text logo element
    // mint not toggled
    await expect(this.textSignerAddress2.mint(2, { value: ethers.utils.parseEther('0')})).to.be.revertedWith('Mint is not active');

    // set price, pay correct price
    var toggleTx = await this.textLogoElement.toggleMint();
    await toggleTx.wait();

    await expect(this.textSignerAddress2.mint(4, { value: ethers.utils.parseEther('0')})).to.be.revertedWith('Only 2 tokens can be minted at once');

    // Emoticon logo element
    // mint not toggled
    await expect(this.emoticonSignerAddress2.mint(2, { value: ethers.utils.parseEther('0')})).to.be.revertedWith('Mint is not active');

    // set price, pay correct price
    var toggleTx = await this.emoticonLogoElement.toggleMint();
    await toggleTx.wait();

    await expect(this.emoticonSignerAddress2.mint(4, { value: ethers.utils.parseEther('0')})).to.be.revertedWith('Only 2 tokens can be minted at once');
  });

  it("Should set mint price", async function () {
    // Text logo element
    // set price, pay correct price
    var toggleTx = await this.textLogoElement.toggleMint();
    await toggleTx.wait();

    var mintTx = await this.textSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    var priceTx = await this.textLogoElement.setPrice(ethers.utils.parseEther('1'));
    await priceTx.wait()

    var mintTx = await this.textSignerAddress2.mint(1, { value: ethers.utils.parseEther('1')});
    await mintTx.wait();

    // more than 1 quantity
    mintTx = await this.textSignerAddress2.mint(2, { value: ethers.utils.parseEther('2')});
    await mintTx.wait();

    // pay incorrect price
    await expect(this.textSignerAddress2.mint(1, { value: ethers.utils.parseEther('10')})).to.be.revertedWith('Incorrect eth amount sent');

    priceTx = await this.textLogoElement.setPrice(ethers.utils.parseEther('2'));
    await priceTx.wait()

    mintTx = await this.textSignerAddress2.mint(2, { value: ethers.utils.parseEther('4')});
    await mintTx.wait();

    // Emoticon logo element
    // set price, pay correct price
    var toggleTx = await this.emoticonLogoElement.toggleMint();
    await toggleTx.wait();

    var mintTx = await this.emoticonSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    var priceTx = await this.emoticonLogoElement.setPrice(ethers.utils.parseEther('1'));
    await priceTx.wait()

    var mintTx = await this.emoticonSignerAddress2.mint(1, { value: ethers.utils.parseEther('1')});
    await mintTx.wait();

    // more than 1 quantity
    mintTx = await this.emoticonSignerAddress2.mint(2, { value: ethers.utils.parseEther('2')});
    await mintTx.wait();

    // pay incorrect price
    await expect(this.emoticonSignerAddress2.mint(1, { value: ethers.utils.parseEther('10')})).to.be.revertedWith('Incorrect eth amount sent');

    priceTx = await this.emoticonLogoElement.setPrice(ethers.utils.parseEther('2'));
    await priceTx.wait()

    mintTx = await this.emoticonSignerAddress2.mint(2, { value: ethers.utils.parseEther('4')});
    await mintTx.wait();
  });
});
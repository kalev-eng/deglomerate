const { expect } = require("chai");
const { ethers } = require("hardhat");
const { boolean } = require("hardhat/internal/core/params/argumentTypes");


describe("LogoDescriptor contract", function () {
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

    const EthTerrestrialLogoElement = await hre.ethers.getContractFactory("EthTerrestrialLogoElement", {
      libraries: {},
    });
    this.ethTerrestrialLogoElement = await EthTerrestrialLogoElement.deploy('0xd65c5D035A35F41f31570887E3ddF8c3289EB920', '0xEdAC00935844245e40218F418cC6527C41513B25');

    const NounLogoElement = await hre.ethers.getContractFactory("NounLogoElement", {
      libraries: {},
    });
    this.nounLogoElement = await NounLogoElement.deploy('0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03', '0x0Cfdb3Ba1694c2bb2CFACB0339ad7b1Ae5932B63');

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

    const Logos = await hre.ethers.getContractFactory("Logos", {
      libraries: {
      },
    });
    this.logos = await Logos.deploy();
    await this.logos.deployed();
  
    const LogoNftDescriptor = await hre.ethers.getContractFactory("LogoNftDescriptor", {
      libraries: {
        LogoHelper: this.logoHelper.address,
      },
    });
    this.logoNftDescriptor = await LogoNftDescriptor.deploy();
    await this.logoNftDescriptor.deployed();
  
    const LogoDescriptor = await hre.ethers.getContractFactory("LogoDescriptor", {
      libraries: {
        LogoHelper: this.logoHelper.address,
        SvgElement: this.svgElement.address,
        SvgHeader: this.svgHeader.address,
      },
    });
    this.logoDescriptor = await LogoDescriptor.deploy(this.logos.address, this.logoNftDescriptor.address);
    await this.logoDescriptor.deployed();
  
    await this.logos.setDescriptorAddress(this.logoDescriptor.address);

    const signers = await hre.ethers.getSigners();
    this.defaultAddress = signers[0].address;
    
    this.address2 = signers[1].address;
    this.address3 = signers[2].address;

    this.logosSignerAddress2 = this.logos.connect(signers[1]);
    this.logosSignerAddress3 = this.logos.connect(signers[2]);

    this.signerAddress2 = this.logoDescriptor.connect(signers[1]);
    this.signerAddress3 = this.logoDescriptor.connect(signers[2]);

    this.bgSignerAddress2 = this.backgroundLogoElement.connect(signers[1]);
    this.textSignerAddress2 = this.textLogoElement.connect(signers[1]);
  });

  it("Should restrict onlyOwner methods", async function () {
    await expect(this.signerAddress2.setDescriptorAddress(this.logoNftDescriptor.address)).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.signerAddress2.toggleOnlyApprovedContracts()).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.signerAddress2.setApprovedContracts([this.logoNftDescriptor.address])).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.signerAddress2.setUnapprovedContracts([this.logoNftDescriptor.address])).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.signerAddress2.setDescriptorAddress(this.logoNftDescriptor.address)).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.signerAddress2.sealContract()).to.be.revertedWith('Ownable: caller is not the owner');
  });

  it("Should restrict onlyLogoOwner methods", async function () {
    var toggleTx = await this.logos.toggleMint();
    await toggleTx.wait();
    // mint tokens to different address
    var mintTx = await this.logosSignerAddress2.mint(2, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    mintTx = await this.logosSignerAddress3.mint(3, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    // test setLogoElement()
    const logoElement = {contractAddress: this.ethTerrestrialLogoElement.address, tokenId: 100, translateXDirection: 0, translateX: 0, translateYDirection: 0, translateY: 0, scaleDirection: 0, scaleMagnitude: 0};
    // try to set element for a logo address does not own
    await expect(this.signerAddress2.setLogoElement(3, 0, logoElement, '', '', '')).to.be.revertedWith('Only logo owner can be caller');
    // try to set element for logo that address does own
    await expect(this.signerAddress3.setLogoElement(3, 0, logoElement, '', '', '')).to.be.revertedWith('Contract not approved or ownership requirements not met');

    // test setLogo()
    const logo = {
      width: 300,
      height: 300,
      layers: [{contractAddress: this.nullAddress, tokenId: 0, translateXDirection: 0, translateX: 0, translateYDirection: 0, translateY: 0, scaleDirection: 0, scaleMagnitude: 0},
              {contractAddress: this.nullAddress, tokenId: 0, translateXDirection: 0, translateX: 0, translateYDirection: 0, translateY: 0, scaleDirection: 0, scaleMagnitude: 0}],
      text: {contractAddress: this.nullAddress, tokenId: 0, translateXDirection: 0, translateX: 0, translateYDirection: 0, translateY: 0, scaleDirection: 0, scaleMagnitude: 0}
      };
    // try to set logo address does not own
    await expect(this.signerAddress2.setLogo(3, logo, '', '', '')).to.be.revertedWith('Only logo owner can be caller');
    // try to set logo address does not own
    this.signerAddress3.setLogo(3, logo, '', '', '')

    // test setMetadata()
    const metaData = [{key: 'testKey', value: 'testValue'}];
    // try to set metadata for a logo address does not own
    await expect(this.signerAddress2.setMetaData(3, metaData)).to.be.revertedWith('Only logo owner can be caller');
    // try to set element for logo that address does own
    this.signerAddress3.setMetaData(3, metaData)
  });

  it("Should seal contract", async function () {
    // seal contract, cannot call methods
    var tx = await this.logoDescriptor.sealContract()
    await tx.wait();
    await expect(this.logoDescriptor.setDescriptorAddress(this.logoNftDescriptor.address)).to.be.revertedWith('Contract is sealed');
    await expect(this.logoDescriptor.toggleOnlyApprovedContracts()).to.be.revertedWith('Contract is sealed');
    await expect(this.logoDescriptor.setApprovedContracts([this.logoNftDescriptor.address])).to.be.revertedWith('Contract is sealed');
    await expect(this.logoDescriptor.setUnapprovedContracts([this.logoNftDescriptor.address])).to.be.revertedWith('Contract is sealed');
  });

  it("Should set approved contracts", async function () {
    // two contracts approved
    var tx = await this.logoDescriptor.setApprovedContracts([this.logoNftDescriptor.address, this.ethTerrestrialLogoElement.address]);
    await tx.wait();
    var approved = await this.logoDescriptor.approvedContracts(this.logoNftDescriptor.address);
    expect(approved).to.equal(true);
    approved = await this.logoDescriptor.approvedContracts(this.ethTerrestrialLogoElement.address);
    expect(approved).to.equal(true);

    // add another approved contract
    var tx = await this.logoDescriptor.setApprovedContracts([this.logoNftDescriptor.address, this.ethTerrestrialLogoElement.address, this.nounLogoElement.address]);
    await tx.wait();
    approved = await this.logoDescriptor.approvedContracts(this.logoNftDescriptor.address);
    expect(approved).to.equal(true);
    approved = await this.logoDescriptor.approvedContracts(this.ethTerrestrialLogoElement.address);
    expect(approved).to.equal(true);
    approved = await this.logoDescriptor.approvedContracts(this.nounLogoElement.address);
    expect(approved).to.equal(true);

    // unapprove contracts
    var tx = await this.logoDescriptor.setUnapprovedContracts([this.logoNftDescriptor.address, this.ethTerrestrialLogoElement.address]);
    await tx.wait();
    approved = await this.logoDescriptor.approvedContracts(this.logoNftDescriptor.address);
    expect(approved).to.equal(false);
    approved = await this.logoDescriptor.approvedContracts(this.ethTerrestrialLogoElement.address);
    expect(approved).to.equal(false);
    approved = await this.logoDescriptor.approvedContracts(this.nounLogoElement.address);
    expect(approved).to.equal(true);
  });

  
  it("Should toggle only approved contracts", async function () {
    // default is contracts must be approved
    onlyApproved = await this.logoDescriptor.onlyApprovedContracts()
    expect(onlyApproved).to.equal(true);

    // toggle only approved
    await this.logoDescriptor.toggleOnlyApprovedContracts();
    onlyApproved = await this.logoDescriptor.onlyApprovedContracts()
    expect(onlyApproved).to.equal(false);

    // toggle only approved
    await this.logoDescriptor.toggleOnlyApprovedContracts();
    onlyApproved = await this.logoDescriptor.onlyApprovedContracts()
    expect(onlyApproved).to.equal(true);
  });

  it("Should determine if element can be set or not", async function () {
    // mint token
    var toggleTx = await this.logos.toggleMint();
    await toggleTx.wait();
    // mint tokens to different address
    var mintTx = await this.logosSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    // can set null address
    var canSet = await this.signerAddress2.canSetElement(this.nullAddress, 0);
    expect(canSet).to.equal(true);

    // toggle all contracts, can mint
    await this.logoDescriptor.toggleOnlyApprovedContracts();
    var canSet = await this.signerAddress2.canSetElement(this.ethTerrestrialLogoElement.address, 0);
    expect(canSet).to.equal(true);
    await this.logoDescriptor.toggleOnlyApprovedContracts();

    // contract not approved
    var canSet = await this.signerAddress2.canSetElement(this.ethTerrestrialLogoElement.address, 0);
    expect(canSet).to.equal(false);

    // contract is approved, must not be owner
    var tx = await this.logoDescriptor.setApprovedContracts([this.ethTerrestrialLogoElement.address]);
    await tx.wait();
    var canSet = await this.signerAddress2.canSetElement(this.ethTerrestrialLogoElement.address, 0);
    expect(canSet).to.equal(true);

    // must be owner, is not owner
    toggleTx = await this.backgroundLogoElement.toggleMint();
    await toggleTx.wait();
    mintTx = await this.bgSignerAddress2.mint(1, { value: ethers.utils.parseEther('0.02')});
    await mintTx.wait();

    var tx = await this.logoDescriptor.setApprovedContracts([this.backgroundLogoElement.address]);
    await tx.wait();
    var canSet = await this.signerAddress3.canSetElement(this.backgroundLogoElement.address, 0);
    expect(canSet).to.equal(false);

    // must be owner, is owner
    var canSet = await this.signerAddress2.canSetElement(this.backgroundLogoElement.address, 0);
    expect(canSet).to.equal(true);
  });

  it("Should set logo element", async function () {
    // approve all contracts
    await this.logoDescriptor.toggleOnlyApprovedContracts();
    // mint token
    var toggleTx = await this.logos.toggleMint();
    await toggleTx.wait();
    toggleTx = await this.backgroundLogoElement.toggleMint();
    await toggleTx.wait();
    toggleTx = await this.textLogoElement.toggleMint();
    await toggleTx.wait();
    var mintTx = await this.logosSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();
    mintTx = await this.bgSignerAddress2.mint(1, { value: ethers.utils.parseEther('0.02')});
    await mintTx.wait();
    mintTx = await this.textSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    var textLogoElement = {contractAddress: this.textLogoElement.address, tokenId: 0, translateXDirection: 1, translateX: 2, translateYDirection: 1, translateY: 3, scaleDirection: 1, scaleMagnitude: 4};
    // set text logo element, just contract
    var tx = await this.signerAddress2.setLogoElement(0, 255, textLogoElement, '', '', '')
    await tx.wait();
    var logo = await this.logoDescriptor.logos(0);
    validateLogoElement(logo, null, 255, textLogoElement);

    // set text logo element, just text
    tx = await this.signerAddress2.setLogoElement(0, 255, textLogoElement, 'txt1', '', '')
    await tx.wait();
    logo = await this.logoDescriptor.logos(0);
    var txtVal = await this.textLogoElementDescriptor.txtVals(0);
    var txtFont = await this.textLogoElementDescriptor.txtFonts(0);
    validateLogoElement(logo, null, 255, textLogoElement);
    expect(txtVal).to.equal('txt1');
    expect(txtFont.name).to.equal('');
    expect(txtFont.link).to.equal('');

    // set text logo element, just text and font
    var tx = await this.signerAddress2.setLogoElement(0, 255, textLogoElement, 'txt2', 'font2', '')
    await tx.wait();
    logo = await this.logoDescriptor.logos(0);
    txtVal = await this.textLogoElementDescriptor.txtVals(0);
    txtFont = await this.textLogoElementDescriptor.txtFonts(0);
    validateLogoElement(logo, null, 255, textLogoElement);
    expect(txtVal).to.equal('txt2');
    expect(txtFont.name).to.equal('font2');
    expect(txtFont.link).to.equal('');

    // set text logo element, just text, font, and fontLink
    tx = await this.textLogoElementDescriptor.setApprovedFontLinks(['link3'])
    await tx.wait();
    tx = await this.signerAddress2.setLogoElement(0, 255, textLogoElement, 'txt3', 'font3', 'link3')
    await tx.wait();
    logo = await this.logoDescriptor.logos(0);
    txtVal = await this.textLogoElementDescriptor.txtVals(0);
    txtFont = await this.textLogoElementDescriptor.txtFonts(0);
    validateLogoElement(logo, null, 255, textLogoElement);
    expect(txtVal).to.equal('txt3');
    expect(txtFont.name).to.equal('font3');
    expect(txtFont.link).to.equal('link3');

    // set null address
    textLogoElement.contractAddress = this.nullAddress;
    var tx = await this.signerAddress2.setLogoElement(0, 255, textLogoElement, '', '', '')
    await tx.wait();
    logo = await this.logoDescriptor.logos(0);
    validateLogoElement(logo, null, 255, textLogoElement);

    // set first logo layer
    var logoElement1 = {contractAddress: this.backgroundLogoElement.address, tokenId: 0, translateXDirection: 0, translateX: 4, translateYDirection: 1, translateY: 5, scaleDirection: 0, scaleMagnitude: 6};
    tx = await this.signerAddress2.setLogoElement(0, 0, logoElement1, '', '', '');
    await tx.wait();
    logo = await this.logoDescriptor.logos(0);
    var layers = await this.logoDescriptor.getLayers(0);
    validateLogoElement(logo, null, 255, textLogoElement);
    validateLogoElement(logo, layers, 0, logoElement1);
    
    // update first logo layer
    logoElement1 = {contractAddress: this.ethTerrestrialLogoElement.address, tokenId: 10, translateXDirection: 0, translateX: 4, translateYDirection: 1, translateY: 5, scaleDirection: 0, scaleMagnitude: 6};
    tx = await this.signerAddress2.setLogoElement(0, 0, logoElement1, '', '', '');
    await tx.wait();
    logo = await this.logoDescriptor.logos(0);
    layers = await this.logoDescriptor.getLayers(0);
    validateLogoElement(logo, null, 255, textLogoElement);
    validateLogoElement(logo, layers, 0, logoElement1);

    // set second logo layer
    var logoElement2 = {contractAddress: this.backgroundLogoElement.address, tokenId: 0, translateXDirection: 1, translateX: 7, translateYDirection: 0, translateY: 8, scaleDirection: 1, scaleMagnitude: 9};
    tx = await this.signerAddress2.setLogoElement(0, 1, logoElement2, '', '', '');
    await tx.wait();
    logo = await this.logoDescriptor.logos(0);
    layers = await this.logoDescriptor.getLayers(0);
    validateLogoElement(logo, null, 255, textLogoElement);
    validateLogoElement(logo, layers, 0, logoElement1);
    validateLogoElement(logo, layers, 1, logoElement2);

    // update second logo layer
    logoElement2.contractAddress = this.nounLogoElement.address;
    tx = await this.signerAddress2.setLogoElement(0, 1, logoElement2, '', '', '');
    await tx.wait();
    logo = await this.logoDescriptor.logos(0);
    layers = await this.logoDescriptor.getLayers(0);
    validateLogoElement(logo, null, 255, textLogoElement);
    validateLogoElement(logo, layers, 0, logoElement1);
    validateLogoElement(logo, layers, 1, logoElement2);

    // update first logo layer to null address
    logoElement1.contractAddress = this.nullAddress;
    tx = await this.signerAddress2.setLogoElement(0, 0, logoElement1, '', '', '');
    await tx.wait();
    logo = await this.logoDescriptor.logos(0);
    layers = await this.logoDescriptor.getLayers(0);
    validateLogoElement(logo, null, 255, textLogoElement);
    validateLogoElement(logo, layers, 0, logoElement1);
    validateLogoElement(logo, layers, 1, logoElement2);
  });

  it("Should set logo", async function () {
    // approve all contracts
    await this.logoDescriptor.toggleOnlyApprovedContracts();
    // mint token
    var toggleTx = await this.logos.toggleMint();
    await toggleTx.wait();
    toggleTx = await this.backgroundLogoElement.toggleMint();
    await toggleTx.wait();
    toggleTx = await this.textLogoElement.toggleMint();
    await toggleTx.wait();
    var mintTx = await this.logosSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();
    mintTx = await this.bgSignerAddress2.mint(1, { value: ethers.utils.parseEther('0.02')});
    await mintTx.wait();
    mintTx = await this.textSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    var tx = await this.textLogoElementDescriptor.setApprovedFontLinks(['fontLink1', 'fontLink2', 'fontLink3'])
    await tx.wait();

    // set logo layers, text, width, height
    var textLogoElement = {contractAddress: this.textLogoElement.address, tokenId: 0, translateXDirection: 1, translateX: 2, translateYDirection: 1, translateY: 3, scaleDirection: 1, scaleMagnitude: 4};
    var logoElement1 = {contractAddress: this.backgroundLogoElement.address, tokenId: 0, translateXDirection: 0, translateX: 4, translateYDirection: 1, translateY: 5, scaleDirection: 0, scaleMagnitude: 6};
    var logoElement2 = {contractAddress: this.ethTerrestrialLogoElement.address, tokenId: 0, translateXDirection: 1, translateX: 7, translateYDirection: 0, translateY: 8, scaleDirection: 1, scaleMagnitude: 9};
    var logoStruct = {
      width: 1,
      height: 2,
      layers: [logoElement1,
        logoElement2],
      text: textLogoElement
      };
    var tx = await this.signerAddress2.setLogo(0, logoStruct, 'testTxt1', 'testFont1', 'fontLink1')
    await tx.wait();
    var logo = await this.logoDescriptor.logos(0);
    var layers = await this.logoDescriptor.getLayers(0);
    var txtVal = await this.textLogoElementDescriptor.txtVals(0);
    var txtFont = await this.textLogoElementDescriptor.txtFonts(0);
    expect(logo.width).to.equal(logoStruct.width);
    expect(logo.height).to.equal(logoStruct.height);
    validateLogoElement(logo, null, 255, textLogoElement);
    validateLogoElement(logo, layers, 0, logoElement1);
    validateLogoElement(logo, layers, 1, logoElement2);
    expect(txtVal).to.equal('testTxt1');
    expect(txtFont.name).to.equal('testFont1');
    expect(txtFont.link).to.equal('fontLink1');

    // add a new layer
    var logoElement3 = {contractAddress: this.nounLogoElement.address, tokenId: 0, translateXDirection: 1, translateX: 10, translateYDirection: 0, translateY: 11, scaleDirection: 1, scaleMagnitude: 12};
    logoStruct.layers.push(logoElement3);
    logoStruct.width = 3;
    logoStruct.height = 4;
    tx = await this.signerAddress2.setLogo(0, logoStruct, 'testTxt2', 'testFont2', 'fontLink2')
    await tx.wait();
    var logo = await this.logoDescriptor.logos(0);
    var layers = await this.logoDescriptor.getLayers(0);
    var txtVal = await this.textLogoElementDescriptor.txtVals(0);
    var txtFont = await this.textLogoElementDescriptor.txtFonts(0);
    expect(logo.width).to.equal(logoStruct.width);
    expect(logo.height).to.equal(logoStruct.height);
    validateLogoElement(logo, null, 255, textLogoElement);
    validateLogoElement(logo, layers, 0, logoElement1);
    validateLogoElement(logo, layers, 1, logoElement2);
    validateLogoElement(logo, layers, 2, logoElement3);
    expect(txtVal).to.equal('testTxt2');
    expect(txtFont.name).to.equal('testFont2');
    expect(txtFont.link).to.equal('fontLink2');

    // set layers to null address
    logoStruct.layers[0].contractAddress = this.nullAddress;
    logoStruct.layers[2].contractAddress = this.nullAddress;
    tx = await this.signerAddress2.setLogo(0, logoStruct, 'testTxt2', 'testFont2', 'fontLink2')
    await tx.wait();
    var logo = await this.logoDescriptor.logos(0);
    var layers = await this.logoDescriptor.getLayers(0);
    expect(logo.width).to.equal(logoStruct.width);
    expect(logo.height).to.equal(logoStruct.height);
    validateLogoElement(logo, null, 255, textLogoElement);
    validateLogoElement(logo, layers, 0, logoElement1);
    validateLogoElement(logo, layers, 1, logoElement2);
    validateLogoElement(logo, layers, 2, logoElement3);

    // send less layers than exist, only layer that is sent is update
    textLogoElement.contractAddress = this.nullAddress;
    logoElement1.contractAddress = this.nounLogoElement.address;
    logoStruct = {
      width: 1,
      height: 2,
      layers: [logoElement1],
      text: textLogoElement
      };
    tx = await this.signerAddress2.setLogo(0, logoStruct, 'testTxt2', 'testFont2', 'fontLink2')
    await tx.wait();
    var logo = await this.logoDescriptor.logos(0);
    var layers = await this.logoDescriptor.getLayers(0);
    expect(logo.width).to.equal(logoStruct.width);
    expect(logo.height).to.equal(logoStruct.height);
    validateLogoElement(logo, null, 255, textLogoElement);
    validateLogoElement(logo, layers, 0, logoElement1);
    validateLogoElement(logo, layers, 1, logoElement2);
    validateLogoElement(logo, layers, 2, logoElement3);

  });

  it("Should set metadata", async function () {;
    // mint token
    var toggleTx = await this.logos.toggleMint();
    await toggleTx.wait();
    var mintTx = await this.logosSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();
    mintTx = await this.logosSignerAddress3.mint(1, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    // set metadata for keys
    var metaData = [{key: 'testKey1', value: 'testValue1'},
                    {key: 'testKey2', value: 'testValue2'},
                    {key: 'testKey3', value: 'testValue3'}];
    // try to set metadata for a logo address does not own
    var tx = await this.signerAddress2.setMetaData(0, metaData);
    tx.wait()
    var metaDataForKeys = await this.signerAddress2.getMetaDataForKeys(0, ['testKey1', 'testKey2', 'testKey3']);
    expect(metaDataForKeys).to.eql(['testValue1', 'testValue2', 'testValue3']);

    // override value for keys
    metaData[0].value = 'new_testValue1';
    metaData[2].value = 'new_testValue3';
    var tx = await this.signerAddress2.setMetaData(0, metaData);
    tx.wait()
    var metaDataForKeys = await this.signerAddress2.getMetaDataForKeys(0, ['testKey1', 'testKey2', 'testKey3']);
    expect(metaDataForKeys).to.eql(['new_testValue1', 'testValue2', 'new_testValue3']);

    // add new metadata for keys
    metaData.push({key: 'testKey4', value: 'testValue4'})
    var tx = await this.signerAddress2.setMetaData(0, metaData);
    tx.wait()
    var metaDataForKeys = await this.signerAddress3.getMetaDataForKeys(0, ['testKey1', 'testKey2', 'testKey3', 'testKey4']);
    expect(metaDataForKeys).to.eql(['new_testValue1', 'testValue2', 'new_testValue3', 'testValue4']);

  });

  it("Should get metadata for keys", async function () {
        // mint token
        var toggleTx = await this.logos.toggleMint();
        await toggleTx.wait();
        var mintTx = await this.logosSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')});
        await mintTx.wait();
        mintTx = await this.logosSignerAddress3.mint(1, { value: ethers.utils.parseEther('0')});
        await mintTx.wait();
    
        // fetch when keys dont exist
        var metaDataForKeys = await this.signerAddress2.getMetaDataForKeys(0, ['testKey1', 'testKey2', 'testKey3']);
        expect(metaDataForKeys).to.eql(['', '', '']);

        // fetch when keys do exist
        var metaData = [{key: 'testKey1', value: 'testValue1'},
                        {key: 'testKey2', value: 'testValue2'},
                        {key: 'testKey3', value: 'testValue3'}];
        var tx = await this.signerAddress2.setMetaData(0, metaData);
        tx.wait()
        var metaDataForKeys = await this.signerAddress2.getMetaDataForKeys(0, ['testKey1', 'testKey2', 'testKey3']);
        expect(metaDataForKeys).to.eql(['testValue1', 'testValue2', 'testValue3']);

      
      // fetch for keys that do exist and dont exist
      var metaDataForKeys = await this.signerAddress2.getMetaDataForKeys(0, ['testKey1', 'dsntExist1', 'testKey2', 'testKey3', 'dsntExist2']);
      expect(metaDataForKeys).to.eql(['testValue1', '', 'testValue2', 'testValue3', '']);

      // fetch less keys than are set, only return requested keys
      var metaDataForKeys = await this.signerAddress2.getMetaDataForKeys(0, ['testKey3', 'testKey2']);
        expect(metaDataForKeys).to.eql(['testValue3', 'testValue2']);
  });

  const validateLogoElement = (logo, layers, layerIndex, element) => {
    if (layerIndex === 255) {
      expect(logo.text.contractAddress).to.equal(element.contractAddress);
      expect(logo.text.tokenId).to.equal(element.tokenId);
      expect(logo.text.translateXDirection).to.equal(element.translateXDirection);
      expect(logo.text.translateX).to.equal(element.translateX);
      expect(logo.text.translateYDirection).to.equal(element.translateYDirection);
      expect(logo.text.translateY).to.equal(element.translateY);
      expect(logo.text.scaleDirection).to.equal(element.scaleDirection);
      expect(logo.text.scaleMagnitude).to.equal(element.scaleMagnitude);
    } else {
      expect(layers[layerIndex].contractAddress).to.equal(element.contractAddress);
      expect(layers[layerIndex].tokenId).to.equal(element.tokenId);
      expect(layers[layerIndex].translateXDirection).to.equal(element.translateXDirection);
      expect(layers[layerIndex].translateX).to.equal(element.translateX);
      expect(layers[layerIndex].translateYDirection).to.equal(element.translateYDirection);
      expect(layers[layerIndex].translateY).to.equal(element.translateY);
      expect(layers[layerIndex].scaleDirection).to.equal(element.scaleDirection);
      expect(layers[layerIndex].scaleMagnitude).to.equal(element.scaleMagnitude);
    }
  }
});

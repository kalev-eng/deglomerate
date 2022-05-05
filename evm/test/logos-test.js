const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("Logos contract", function () {
  beforeEach(async function () {
    const SvgElement = await hre.ethers.getContractFactory("SvgElement");
    this.svgElement = await SvgElement.deploy();

    const LogoHelper = await hre.ethers.getContractFactory("LogoHelper");
    this.logoHelper = await LogoHelper.deploy();

    const SvgHeader = await hre.ethers.getContractFactory("SvgHeader", {
      libraries: {
        LogoHelper: this.logoHelper.address,
      },
    });
    this.svgHeader = await SvgHeader.deploy();

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
  });

  it("Should toggle mint", async function () {
    // mint while not active, expect error
    await expect(this.logosSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')})).to.be.revertedWith('Mint is not active');

    // mint while active
    var toggleTx = await this.logos.toggleMint();
    await toggleTx.wait();
    var mintTx = await this.logosSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    // toggle mint back off, mint, expect error
    toggleTx = await this.logos.toggleMint();
    await toggleTx.wait()
    await expect(this.logosSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')})).to.be.revertedWith('Mint is not active');
  });

  it("Should set mint price", async function () {
    // set price, pay correct price
    var toggleTx = await this.logos.toggleMint();
    await toggleTx.wait();
    var priceTx = await this.logos.setPrice(ethers.utils.parseEther('1'));
    await priceTx.wait()

    var mintTx = await this.logosSignerAddress2.mint(1, { value: ethers.utils.parseEther('1')});
    await mintTx.wait();

    // more than 1 quantity
    mintTx = await this.logosSignerAddress2.mint(8, { value: ethers.utils.parseEther('8')});
    await mintTx.wait();

    // pay incorrect price
    await expect(this.logosSignerAddress2.mint(1, { value: ethers.utils.parseEther('10')})).to.be.revertedWith('Incorrect eth amount sent');

    priceTx = await this.logos.setPrice(ethers.utils.parseEther('2'));
    await priceTx.wait()

    mintTx = await this.logosSignerAddress2.mint(8, { value: ethers.utils.parseEther('16')});
    await mintTx.wait();
  });

  it("Should set descriptor address", async function () {
    var descriptorAddress = await this.logos.logoDescriptorAddress();
    expect(descriptorAddress).to.equal(this.logoDescriptor.address);
    
    const tx = await this.logos.setDescriptorAddress(this.logoNftDescriptor.address);
    await tx.wait();
    descriptorAddress = await this.logos.logoDescriptorAddress();
    expect(descriptorAddress).to.equal(this.logoNftDescriptor.address);
  });

  it("Should restrict onlyOwner methods", async function () {
    await expect(this.logosSignerAddress2.setPrice(0)).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.logosSignerAddress2.setDescriptorAddress(this.logoDescriptor.address)).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.logosSignerAddress2.toggleMint()).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.logosSignerAddress2.sealContract()).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.logosSignerAddress2.sendValue(this.address2, ethers.utils.parseEther('16'))).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.logosSignerAddress2.mintAdmin([this.logoDescriptor.address], 50)).to.be.revertedWith('Ownable: caller is not the owner');
  });

  it("Should seal contract", async function () {
    // seal contract, cannot call methods
    var tx = await this.logos.sealContract()
    await tx.wait();
    await expect(this.logos.setPrice(0)).to.be.revertedWith('Contract is sealed');
    await expect(this.logos.setDescriptorAddress(this.logoDescriptor.address)).to.be.revertedWith('Contract is sealed');

    tx = await this.logos.sealContract()
    await tx.wait();
    await expect(this.logos.setPrice(0)).to.be.revertedWith('Contract is sealed');
    await expect(this.logos.setDescriptorAddress(this.logoDescriptor.address)).to.be.revertedWith('Contract is sealed');
    await expect(this.logos.mintAdmin([this.logoDescriptor.address], 50)).to.be.revertedWith('Contract is sealed');
  });

  it("Should mint", async function () {
    var toggleTx = await this.logos.toggleMint();
    await toggleTx.wait();
    // mint greater than max quantity, expect error
    await expect(this.logosSignerAddress2.mint(11, { value: ethers.utils.parseEther('0')})).to.be.revertedWith('Cannot mint more than 10');

    // mint and receive token
    var mintTx = await this.logosSignerAddress2.mint(1, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    mintTx = await this.logosSignerAddress3.mint(3, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    mintTx = await this.logosSignerAddress2.mint(8, { value: ethers.utils.parseEther('0')});
    await mintTx.wait();

    for (let i = 0; i < 1; i++) {
      let owner = await this.logos.ownerOf(i);
      expect(owner).to.equal(this.address2);
    }

    for (let i = 1; i < 4; i++) {
      let owner = await this.logos.ownerOf(i);
      expect(owner).to.equal(this.address3);
    }

    for (let i = 4; i < 12; i++) {
      let owner = await this.logos.ownerOf(i);
      expect(owner).to.equal(this.address2);
    }
  });

  it("Should mint admin", async function () {
    var toggleTx = await this.logos.toggleMint();
    await toggleTx.wait();

    var addresses = [this.address2, this.address3, this.address2];
    var tx = await this.logos.mintAdmin(addresses, 2);

    for (let i = 0; i < 2; i++) {
      let owner = await this.logos.ownerOf(i);
      expect(owner).to.equal(this.address2);
    }

    for (let i = 2; i < 4; i++) {
      let owner = await this.logos.ownerOf(i);
      expect(owner).to.equal(this.address3);
    }

    for (let i = 4; i < 6; i++) {
      let owner = await this.logos.ownerOf(i);
      expect(owner).to.equal(this.address2);
    }
  });

  /*
  it("Should send value", async function () {
    var toggleTx = await this.logos.toggleMint();
    await toggleTx.wait();

    var priceTx = await this.logos.setPrice(ethers.utils.parseEther('1'));
    await priceTx.wait()

    mintTx = await this.logos.mint(8, { value: ethers.utils.parseEther('8')});
    await mintTx.wait();

    const provider = ethers.getDefaultProvider();
    const beginBalance = await provider.getBalance(this.address3);
    console.log(beginBalance.toString());

    var sendValue = await this.logos.sendValue(this.address3, ethers.utils.parseEther('2'));
    await sendValue.wait();
    var endBalance = await provider.getBalance(this.address3);
    console.log(endBalance.toString());
    expect((endBalance - beginBalance).toString()).to.equal('2');
  });
  */
  
});

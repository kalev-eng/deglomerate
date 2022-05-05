const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("LogoNftDescriptor contract", function () {
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

    this.signerAddress2 = this.logoNftDescriptor.connect(signers[1]);
    this.signerAddress3 = this.logoNftDescriptor.connect(signers[2]);
  });

  it("Should restrict onlyOwner methods", async function () {
    await expect(this.signerAddress2.setNamePrefix('name1')).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.signerAddress2.setDescription('description1')).to.be.revertedWith('Ownable: caller is not the owner');
    await expect(this.signerAddress2.sealContract()).to.be.revertedWith('Ownable: caller is not the owner');
  });

  it("Should seal contract", async function () {
    // seal contract, cannot call methods
    var tx = await this.logoNftDescriptor.sealContract();
    await tx.wait();

    await expect(this.logoNftDescriptor.setNamePrefix('name1')).to.be.revertedWith('Contract is sealed');
    await expect(this.logoNftDescriptor.setDescription('description1')).to.be.revertedWith('Contract is sealed');

    // make sure seal is not toggling
    tx = await this.logoNftDescriptor.sealContract();
    await tx.wait();

    await expect(this.logoNftDescriptor.setNamePrefix('name1')).to.be.revertedWith('Contract is sealed');
    await expect(this.logoNftDescriptor.setDescription('description1')).to.be.revertedWith('Contract is sealed');

  });

  it("Should set namePrefix", async function () {
    // default name
    var namePrefix = await this.logoNftDescriptor.namePrefix();
    expect(namePrefix).to.equal('DO NOT PURCHASE. Logo Container #');

    // set name, updated
    var tx = await this.logoNftDescriptor.setNamePrefix('name1');
    await tx.wait();
    var namePrefix = await this.logoNftDescriptor.namePrefix();
    expect(namePrefix).to.equal('name1');
  });

  it("Should set description", async function () {
    // default description
    const defaultDesc = 'DO NOT PURCHASE. Logo containers point to other NFTs to create an image. Purchasing this NFT will not also purchase the NFTs creating the image. There is an infinite supply of logo containers and they can be minted for free.';
    var description = await this.logoNftDescriptor.description();
    expect(description).to.equal(defaultDesc);

    // set description, updated
    var tx = await this.logoNftDescriptor.setDescription('description1');
    await tx.wait();
    var namePrefix = await this.logoNftDescriptor.description();
    expect(namePrefix).to.equal('description1');
  });
});
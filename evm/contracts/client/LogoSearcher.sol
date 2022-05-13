//	SPDX-License-Identifier: MIT
/// @title  Logo Searcher
/// @notice Searcher for client to use
pragma solidity ^0.8.0;

import '../common/LogoModel.sol';

interface ILogoDescriptor {
  function logos(uint256 tokenId) external returns (Model.Logo memory);
  function metaData(uint256 tokenId, string memory key) external returns (string memory);
  function getTextElement(uint256 tokenId) external view returns (Model.LogoElement memory);
  function getLayers(uint256 tokenId) external view returns (Model.LogoElement[] memory);
}

contract LogoSearcher {
  address public logoDescriptorAddress;
  ILogoDescriptor descriptor;

  constructor(address _address) {
    logoDescriptorAddress = _address;
    descriptor = ILogoDescriptor(_address);
  }

  function getNextConfiguredLogos(uint256 quantity, string memory configuredAttr, uint256 startTokenId, uint256 endTokenId) public returns (uint256[] memory) {
    uint256[] memory tokenIds = new uint256[](quantity);
    for (uint i; i < quantity; i++) {
      tokenIds[i] = getNextConfiguredLogo(configuredAttr, startTokenId + i, endTokenId);
    }
    return tokenIds;
  }

  function getPreviousConfiguredLogos(uint256 quantity, string memory configuredAttr, uint256 startTokenId, uint256 endTokenId) public returns (uint256[] memory) {
    uint256[] memory tokenIds = new uint256[](quantity);
    for (uint i; i < quantity; i++) {
      tokenIds[i] = getPreviousConfiguredLogo(configuredAttr, startTokenId - i, endTokenId);
    }
    return tokenIds;
  }

  function getNextConfiguredLogo(string memory configuredAttr, uint256 startTokenId, uint256 endTokenId) public returns (uint256) {
    for (uint i = startTokenId; i <= endTokenId; i++) {
      if (equals(configuredAttr, 'visual')) {
        Model.LogoElement[] memory layers = descriptor.getLayers(i);
        for (uint j; j < layers.length; j++) {
          if (layers[j].contractAddress != address(0x0)) {
            return i;
          }
        }
        Model.LogoElement memory text = descriptor.getTextElement(i);
        if (text.contractAddress != address(0x0)) {
          return i;
        }
      } else {
        if (!equals(descriptor.metaData(i, configuredAttr), '')) {
          return i;
        }
      }
    }
    return type(uint256).max;
  }

  function getPreviousConfiguredLogo(string memory configuredAttr, uint256 startTokenId, uint256 endTokenId) public returns (uint256) {
    for (uint i = startTokenId; i >= endTokenId; i--) {
      if (equals(configuredAttr, 'visual')) {
        Model.LogoElement[] memory layers = descriptor.getLayers(i);
        for (uint j; j < layers.length; j++) {
          if (layers[j].contractAddress != address(0x0)) {
            return i;
          }
        }
        Model.LogoElement memory text = descriptor.getTextElement(i);
        if (text.contractAddress != address(0x0)) {
          return i;
        }
      } else {
        if (!equals(descriptor.metaData(i, configuredAttr), '')) {
          return i;
        }
      }
    }
    return type(uint256).max;
  }

  function equals(string memory a, string memory b) public pure returns (bool) {
    return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
  }
}
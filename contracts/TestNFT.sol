// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestNFT is ERC721, Ownable {
    uint256 public nextTokenId;

    constructor(address initialOwner) ERC721("TestNFT", "TNFT") Ownable(initialOwner) {}

    function mint(address to, uint256 tokenId) public onlyOwner {
        _safeMint(to, tokenId);
    }

    function mintNext(address to) public onlyOwner returns (uint256) {
        _safeMint(to, nextTokenId);
        nextTokenId++;
        return nextTokenId - 1;
    }
}

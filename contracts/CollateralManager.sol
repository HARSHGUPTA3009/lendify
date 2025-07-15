// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract CollateralManager {
    struct NFTCollateral {
        address tokenAddress;
        uint256 tokenId;
        address owner;
        address lender;
        bool locked;
    }

    struct ETHCollateral {
        uint256 amount;
        address owner;
        address lender;
        bool locked;
    }

    uint256 public nextNFTId;
    mapping(uint256 => NFTCollateral) public nftCollaterals;

    uint256 public nextETHId;
    mapping(uint256 => ETHCollateral) public ethCollaterals;

    event NFTLocked(uint256 id, address owner, address token, uint256 tokenId);
    event NFTReleased(uint256 id, address to);
    event NFTSeized(uint256 id, address to);

    event ETHLocked(uint256 id, address owner, uint256 amount);
    event ETHReleased(uint256 id, address to);
    event ETHSeized(uint256 id, address to);

    // Lock NFT as collateral
    function lockNFT(address tokenAddress, uint256 tokenId, address lender) external {
        IERC721(tokenAddress).transferFrom(msg.sender, address(this), tokenId);

        uint256 id = nextNFTId++;
        nftCollaterals[id] = NFTCollateral({
            tokenAddress: tokenAddress,
            tokenId: tokenId,
            owner: msg.sender,
            lender: lender,
            locked: true
        });

        emit NFTLocked(id, msg.sender, tokenAddress, tokenId);
    }

    function releaseNFT(uint256 id) external {
        NFTCollateral storage coll = nftCollaterals[id];
        require(coll.locked, "Already handled");
        require(msg.sender == coll.lender, "Only lender can release");

        coll.locked = false;
        IERC721(coll.tokenAddress).transferFrom(address(this), coll.owner, coll.tokenId);

        emit NFTReleased(id, coll.owner);
    }

    function seizeNFT(uint256 id) external {
        NFTCollateral storage coll = nftCollaterals[id];
        require(coll.locked, "Already handled");
        require(msg.sender == coll.lender, "Only lender can seize");

        coll.locked = false;
        IERC721(coll.tokenAddress).transferFrom(address(this), coll.lender, coll.tokenId);

        emit NFTSeized(id, coll.lender);
    }

    // Lock ETH as collateral
    function lockETH(address lender) external payable {
        uint256 id = nextETHId++;
        ethCollaterals[id] = ETHCollateral({
            amount: msg.value,
            owner: msg.sender,
            lender: lender,
            locked: true
        });

        emit ETHLocked(id, msg.sender, msg.value);
    }

    function releaseETH(uint256 id) external {
        ETHCollateral storage coll = ethCollaterals[id];
        require(coll.locked, "Already handled");
        require(msg.sender == coll.lender, "Only lender can release");

        coll.locked = false;
        payable(coll.owner).transfer(coll.amount);

        emit ETHReleased(id, coll.owner);
    }

    function seizeETH(uint256 id) external {
        ETHCollateral storage coll = ethCollaterals[id];
        require(coll.locked, "Already handled");
        require(msg.sender == coll.lender, "Only lender can seize");

        coll.locked = false;
        payable(coll.lender).transfer(coll.amount);

        emit ETHSeized(id, coll.lender);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract Auction {
    struct AuctionItem {
        uint256 id;
        address tokenAddress;
        uint256 tokenId;
        address lender;
        uint256 minBid;
        address highestBidder;
        uint256 highestBid;
        uint256 endTime;
        bool settled;
    }

    uint256 public nextAuctionId;
    mapping(uint256 => AuctionItem) public auctions;

    event AuctionStarted(uint256 auctionId, address token, uint256 tokenId, uint256 minBid, uint256 endTime);
    event NewBid(uint256 auctionId, address bidder, uint256 amount);
    event AuctionSettled(uint256 auctionId, address winner, uint256 amount);

    // start auction on an NFT
    function startAuction(address tokenAddress, uint256 tokenId, uint256 minBid, uint256 durationSeconds, address lender) external {
        IERC721(tokenAddress).transferFrom(msg.sender, address(this), tokenId);

        uint256 auctionId = nextAuctionId++;
        auctions[auctionId] = AuctionItem({
            id: auctionId,
            tokenAddress: tokenAddress,
            tokenId: tokenId,
            lender: lender,
            minBid: minBid,
            highestBidder: address(0),
            highestBid: 0,
            endTime: block.timestamp + durationSeconds,
            settled: false
        });

        emit AuctionStarted(auctionId, tokenAddress, tokenId, minBid, auctions[auctionId].endTime);
    }

    function placeBid(uint256 auctionId) external payable {
        AuctionItem storage auction = auctions[auctionId];
        require(block.timestamp < auction.endTime, "Auction ended");
        require(msg.value > auction.highestBid && msg.value >= auction.minBid, "Bid too low");

        // refund previous highest bidder
        if (auction.highestBidder != address(0)) {
            payable(auction.highestBidder).transfer(auction.highestBid);
        }

        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;

        emit NewBid(auctionId, msg.sender, msg.value);
    }

    function settleAuction(uint256 auctionId) external {
        AuctionItem storage auction = auctions[auctionId];
        require(block.timestamp >= auction.endTime, "Auction not yet ended");
        require(!auction.settled, "Already settled");

        auction.settled = true;

        // if there was a bidder, transfer NFT to winner and pay lender
        if (auction.highestBidder != address(0)) {
            IERC721(auction.tokenAddress).transferFrom(address(this), auction.highestBidder, auction.tokenId);
            payable(auction.lender).transfer(auction.highestBid);
        } else {
            // no bids, return NFT to lender
            IERC721(auction.tokenAddress).transferFrom(address(this), auction.lender, auction.tokenId);
        }

        emit AuctionSettled(auctionId, auction.highestBidder, auction.highestBid);
    }
}

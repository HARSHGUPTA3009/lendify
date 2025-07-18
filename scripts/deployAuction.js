const hre = require("hardhat");

async function main() {
  const Auction = await hre.ethers.getContractFactory("Auction");
  const auction = await Auction.deploy();
  await auction.deployed();

  console.log(`Auction contract deployed to: ${auction.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

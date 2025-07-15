const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with:", deployer.address);

  const TestNFT = await hre.ethers.getContractFactory("TestNFT");
  const nft = await TestNFT.deploy(deployer.address);
  await nft.deployed();

  console.log("Deployed to:", nft.address);
}

main()
  .catch((err) => { console.error(err); process.exit(1); });

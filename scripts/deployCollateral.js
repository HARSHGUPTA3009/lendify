const hre = require("hardhat");

async function main() {
  const CollateralManager = await hre.ethers.getContractFactory("CollateralManager");
  const collateralManager = await CollateralManager.deploy();
  await collateralManager.deployed();

  console.log(`CollateralManager deployed to: ${collateralManager.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

const hre = require("hardhat");

async function main() {
  const LoanManager = await hre.ethers.getContractFactory("LoanManager");
  const loanManager = await LoanManager.deploy();
  await loanManager.deployed();

  console.log(`LoanManager deployed to: ${loanManager.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

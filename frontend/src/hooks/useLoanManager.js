/* eslint-disable no-empty-pattern */
import { useState } from "react";
import { ethers } from "ethers";
import { toast } from "sonner";
import LoanManagerABI from "../abis/LoanManager.json";
import contractAddresses from "../utils/contractAddresses";
import { useWallet } from "../contexts/WalletContext";
// console.log("CONTRACT ADDRESSES:", contractAddresses);
// console.log("LoanManager address:", contractAddresses.LoanManager);


export default function useLoanManager() {
  const {} = useWallet(); // placeholder if needed later
  const [txPending, setTxPending] = useState(false);

  const getSigner = async () => {
    if (!window.ethereum) throw new Error("MetaMask not found");
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider.getSigner();
  };

  const handleTx = async (txPromise, loadingMsg, successMsg) => {
    setTxPending(true);
    try {
      toast.loading(loadingMsg);
      const txResponse = await txPromise;
      const receipt = await txResponse.wait();
      toast.success(`✅ ${successMsg}`, {
        description: `Hash: ${txResponse.hash.slice(0, 10)}...`,
      });
      return receipt;
    } catch (err) {
      console.error(err);
      toast.error("Transaction failed. See console.");
    } finally {
      setTxPending(false);
    }
  };

 const createLoan = async (amountETH, collateralId, durationDays) => {
  if (!amountETH || collateralId === undefined || !durationDays) {
    toast.error("Missing loan parameters.");
    return;
  }
  const signer = await getSigner();
  const contract = new ethers.Contract(contractAddresses.LoanManager, LoanManagerABI.abi, signer);

  console.log(`Creating loan for ${amountETH} ETH, collateralId ${collateralId}, duration ${durationDays} days`);
  console.log("Network:", await signer.provider.getNetwork());
  console.log("Signer:", await signer.getAddress());

  const txPromise = contract.createLoan(
    ethers.parseEther(amountETH.toString()),
    BigInt(collateralId),
    BigInt(durationDays)
  );

  return await handleTx(txPromise, "Creating loan...", "Loan created!");
};



  const fundLoan = async (loanId) => {
  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddresses.LoanManager.trim(), LoanManagerABI.abi, signer);

    // Directly get the loan by ID
    const loan = await contract.loans(loanId);
    console.log("Funding loan:", loan);

    await contract.fundLoan(loanId, { value: loan.amount });
    alert("Loan funded successfully!");
  } catch (err) {
    console.error(err);
    alert("Error funding loan: " + (err.reason || err.message));
  }
};



  const repayLoan = async (loanId, amountETH) => {
  if (!loanId || !amountETH) {
    toast.error("Missing loan ID or amount.");
    return;
  }
  const signer = await getSigner();
  const contract = new ethers.Contract(
    contractAddresses.LoanManager,
    LoanManagerABI.abi,
    signer
  );

  console.log(`Repaying loan #${loanId} with ${amountETH} ETH`);
  const tx = await contract.repayLoan(Number(loanId), {
    value: ethers.parseEther(amountETH.toString())
  });
  await handleTx(tx, "Repaying loan...", "Loan repaid!");
};


  const getLoansByBorrower = async (borrower) => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not found");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddresses.LoanManager, LoanManagerABI.abi, provider);
      return await contract.getLoansByBorrower(borrower);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch loans!");
      return [];
    }
  };

  const getLoan = async (loanId) => {
    try {
      if (!window.ethereum) throw new Error("MetaMask not found");
      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(contractAddresses.LoanManager, LoanManagerABI.abi, provider);
      return await contract.getLoan(loanId);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch loan!");
      return null;
    }
  };

  return {
    createLoan,
    fundLoan,
    repayLoan,
    getLoansByBorrower,
    getLoan,
    txPending
  };
}

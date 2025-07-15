import { useState } from "react";
import { BrowserProvider, Contract, parseEther } from "ethers";
import CollateralManagerABI from "../abis/CollateralManager.json";
import contractAddresses from "../utils/contractAddresses";

export default function useCollateral() {
  const [txPending, setTxPending] = useState(false);

  // helper to get signer + contract instance
  const getSignerContract = async () => {
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new Contract(
      contractAddresses.CollateralManager,
      CollateralManagerABI,
      signer
    );
  };

  const lockNFT = async (tokenAddress, tokenId, lender) => {
    try {
      setTxPending(true);
      const contract = await getSignerContract();
      const tx = await contract.lockNFT(tokenAddress, tokenId, lender);
      await tx.wait();
    } catch (err) {
      console.error("Error locking NFT collateral:", err);
    } finally {
      setTxPending(false);
    }
  };

  const lockETH = async (amountETH, lender) => {
    try {
      setTxPending(true);
      const contract = await getSignerContract();
      const tx = await contract.lockETH(lender, {
        value: parseEther(amountETH),
      });
      await tx.wait();
    } catch (err) {
      console.error("Error locking ETH collateral:", err);
    } finally {
      setTxPending(false);
    }
  };

  const releaseNFT = async (id) => {
    try {
      setTxPending(true);
      const contract = await getSignerContract();
      const tx = await contract.releaseNFT(id);
      await tx.wait();
    } catch (err) {
      console.error("Error releasing NFT:", err);
    } finally {
      setTxPending(false);
    }
  };

  const seizeNFT = async (id) => {
    try {
      setTxPending(true);
      const contract = await getSignerContract();
      const tx = await contract.seizeNFT(id);
      await tx.wait();
    } catch (err) {
      console.error("Error seizing NFT:", err);
    } finally {
      setTxPending(false);
    }
  };

  return { lockNFT, lockETH, releaseNFT, seizeNFT, txPending };
}

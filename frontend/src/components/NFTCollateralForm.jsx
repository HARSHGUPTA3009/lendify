import { useState } from "react";
import useCollateral from "../hooks/useCollateral";

export default function NFTCollateralForm() {
  const { lockNFT, txPending } = useCollateral();
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenId, setTokenId] = useState("");
  const [lender, setLender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await lockNFT(tokenAddress, tokenId, lender);
    setTokenAddress("");
    setTokenId("");
    setLender("");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-4">Lock NFT as Collateral</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">NFT Contract Address</label>
          <input
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Token ID</label>
          <input
            type="number"
            value={tokenId}
            onChange={(e) => setTokenId(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Lender Address</label>
          <input
            type="text"
            value={lender}
            onChange={(e) => setLender(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={txPending}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {txPending ? "Locking..." : "Lock NFT"}
        </button>
      </form>
    </div>
  );
}

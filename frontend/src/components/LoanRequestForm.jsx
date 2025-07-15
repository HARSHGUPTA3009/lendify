import { useState } from "react";
import useLoanManager from "../hooks/useLoanManager";

export default function LoanRequestForm() {
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [collateralId, setCollateralId] = useState("");
  const { createLoan, txPending } = useLoanManager();

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!amount || !duration || !collateralId) {
        alert("Please fill all fields.");
        return;
      }
      await createLoan(amount, parseInt(collateralId), parseInt(duration));
      // Reset only after successful tx
      setAmount("");
      setDuration("");
      setCollateralId("");
    } catch (err) {
      console.error("Failed to create loan:", err);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-md">
      <input
        type="number"
        placeholder="Loan amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="Duration (days)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="Collateral ID"
        value={collateralId}
        onChange={(e) => setCollateralId(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={txPending}
      >
        {txPending ? "Creating..." : "Create Loan"}
      </button>
    </form>
  );
}

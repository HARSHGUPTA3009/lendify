import { useState } from "react";
import useLoanManager from "../hooks/useLoanManager";

export default function FundLoanForm() {
  const [loanId, setLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const { fundLoan, txPending } = useLoanManager();

  const submit = async (e) => {
    e.preventDefault();
    await fundLoan(loanId, amount);
    setLoanId("");
    setAmount("");
  };

  return (
    <form onSubmit={submit} className="space-y-4 max-w-md">
      <input
        type="number"
        placeholder="Loan ID"
        value={loanId}
        onChange={(e) => setLoanId(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={txPending}
      >
        {txPending ? "Funding..." : "Fund Loan"}
      </button>
    </form>
  );
}

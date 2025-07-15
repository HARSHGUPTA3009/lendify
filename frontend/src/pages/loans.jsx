import { useState } from "react";
import useLoanManager from "../hooks/useLoanManager";
import { toast } from "sonner";

export default function Loans() {
  const [loanId, setLoanId] = useState("");
  const [loan, setLoan] = useState(null);
  const [loading, setLoading] = useState(false);
  const { getLoan } = useLoanManager();

  const fetchLoan = async () => {
    setLoading(true);
    try {
      const fetchedLoan = await getLoan(loanId);
      setLoan(fetchedLoan);
      toast.success("Loan fetched!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch loan");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Get Loan by ID</h2>
      <input
        type="number"
        value={loanId}
        onChange={(e) => setLoanId(e.target.value)}
        placeholder="Enter Loan ID"
        className="border p-2 mr-2"
      />
      <button
        onClick={fetchLoan}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Loan"}
      </button>

      {loan && (
        <div className="border p-4 mt-4 rounded-lg shadow">
          <p><strong>ID:</strong> {loan.id.toString()}</p>
          <p><strong>Borrower:</strong> {loan.borrower}</p>
          <p><strong>Lender:</strong> {loan.lender}</p>
          <p><strong>Amount:</strong> {loan.amount.toString()}</p>
          <p><strong>Repaid:</strong> {loan.repaid.toString()}</p>
          <p><strong>Due:</strong> {new Date(loan.dueDate * 1000).toLocaleString()}</p>
          <p><strong>Funded:</strong> {loan.funded ? "Yes" : "No"}</p>
          <p><strong>Fully Repaid:</strong> {loan.repaidFully ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}

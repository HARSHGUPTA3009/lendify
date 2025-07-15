import { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";
import LoanManagerABI from "../abis/LoanManager.json";
import contractAddresses from "../utils/contractAddresses";

export default function MyLoansList() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLoans = async () => {
      setLoading(true);
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      const contract = new Contract(contractAddresses.LoanManager, LoanManagerABI, provider);

      // assume contract has a function getLoansByBorrower(address) returns array of loans
      try {
        const myLoans = await contract.getLoansByBorrower(userAddress);
        setLoans(myLoans);
      } catch (err) {
        console.error("Error loading loans:", err);
      }
      setLoading(false);
    };

    loadLoans();
  }, []);

  if (loading) return <div>Loading your loans...</div>;

  return (
    <div className="space-y-4">
      {loans.length === 0 ? (
        <div>You have no loans yet.</div>
      ) : (
        loans.map((loan, idx) => (
          <div key={idx} className="border p-4 rounded shadow">
            <div><strong>Amount:</strong> {loan.amount} wei</div>
            <div><strong>Status:</strong> {loan.status}</div>
            {/* extend here with repay button if needed */}
          </div>
        ))
      )}
    </div>
  );
}

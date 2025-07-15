import { useState, useEffect } from "react";
import { ethers } from "ethers";
import contractAddresses from "../utils/contractAddresses.js";
import LoanManagerABI from "../abis/LoanManager.json";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CreditCard, Calendar, DollarSign, Hash, RefreshCw, Loader2 } from "lucide-react";

export default function MyLoans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          contractAddresses.LoanManager.trim(),
          LoanManagerABI.abi,
          signer
        );

        const code = await provider.getCode(contract.target);
        if (code === "0x") {
          console.error("No contract deployed at this address!");
          setLoans([]);
          return;
        }

        const borrowerAddress = await signer.getAddress();

        const [
          ids,
          amounts,
          repaidAmounts,
          lenders,
          dueDates,
          statuses,
        ] = await contract.getLoansByBorrower(borrowerAddress);

        const formattedLoans = ids.map((id, i) => ({
          id: id.toString(),
          amount: ethers.formatEther(amounts[i]),
          repaid: ethers.formatEther(repaidAmounts[i]),
          lender: lenders[i],
          dueDate: Number(dueDates[i]),
          status: Number(statuses[i])  // <== crucial line
        }));

        setLoans(formattedLoans);
      } catch (err) {
        console.error("Error fetching loans:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const getStatusBadge = (loan) => {
    if (loan.status === 2) {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Repaid</Badge>;
    }
    if (loan.status === 0) {
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>;
    }
    if (loan.status === 1 && loan.dueDate * 1000 < Date.now()) {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Overdue</Badge>;
    }
    return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Active</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading your loans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-orange-400 flex items-center">
            <CreditCard className="w-8 h-8 mr-3" />
            My Loans
          </h1>
          <p className="text-gray-400 mt-2">Track and manage all your loan activities</p>
        </div>
        <Button
          onClick={() => window.location.reload()}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {loans.length === 0 ? (
        <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50">
          <CardContent className="py-12 text-center">
            <CreditCard className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No Loans Found</h3>
            <p className="text-gray-500 mb-6">You haven't created any loans yet.</p>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
              Create Your First Loan
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {loans.map((loan, index) => (
            <Card
              key={`${loan.id}-${index}`}
              className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-orange-500/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-lg">
                    <Hash className="w-5 h-5 mr-2 text-orange-400" />
                    Loan #{loan.id}
                  </CardTitle>
                  {getStatusBadge(loan)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <DollarSign className="w-4 h-4 text-blue-400 mr-2" />
                      <span className="text-sm text-gray-400">Amount</span>
                    </div>
                    <p className="text-xl font-bold text-white">{loan.amount} ETH</p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <RefreshCw className="w-4 h-4 text-green-400 mr-2" />
                      <span className="text-sm text-gray-400">Repaid</span>
                    </div>
                    <p className="text-xl font-bold text-white">{loan.repaid} ETH</p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Calendar className="w-4 h-4 text-purple-400 mr-2" />
                      <span className="text-sm text-gray-400">Due Date</span>
                    </div>
                    <p className="text-sm font-medium text-white">
                      {new Date(loan.dueDate * 1000).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Hash className="w-4 h-4 text-orange-400 mr-2" />
                      <span className="text-sm text-gray-400">Progress</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                      <div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${Math.min(
                            (parseFloat(loan.repaid) / parseFloat(loan.amount)) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400">
                      {Math.round(
                        (parseFloat(loan.repaid) / parseFloat(loan.amount)) * 100
                      )}% paid
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/30 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Lender</h4>
                  <p className="text-sm font-mono text-gray-400 break-all">{loan.lender}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

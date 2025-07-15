import { useState } from "react";
import { ethers } from "ethers";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RefreshCw, DollarSign, Hash, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import contractAddresses from "../utils/contractAddresses";
import LoanManagerABI from "../abis/LoanManager.json";

export default function RepayLoan() {
  const [loanId, setLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const [txPending, setTxPending] = useState(false);
  const { toast } = useToast();

  const handleRepay = async () => {
    if (!loanId || !amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setTxPending(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        contractAddresses.LoanManager.trim(),
        LoanManagerABI.abi,
        signer
      );

      console.log(`Repaying loan #${loanId} with ${amount} ETH`);
      const tx = await contract.repayLoan(
        Number(loanId),
        { value: ethers.parseEther(amount.toString()) }
      );
      await tx.wait();

      toast({
        title: "Repayment Successful!",
        description: `You repaid ${amount} ETH for loan #${loanId}`,
      });
      setLoanId("");
      setAmount("");
    } catch (err) {
      console.error("Repayment error:", err);
      toast({
        title: "Transaction Failed",
        description: err.reason || "Could not process your repayment.",
        variant: "destructive",
      });
    }
    setTxPending(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold text-teal-400">
            <RefreshCw className="w-6 h-6 mr-3" />
            Repay Loan
          </CardTitle>
          <p className="text-gray-400">
            Make payments on your active loans to maintain good standing.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="loanId" className="flex items-center text-sm text-gray-300 mb-1">
                <Hash className="w-4 h-4 mr-2" /> Loan ID
              </Label>
              <Input
                id="loanId"
                value={loanId}
                onChange={(e) => setLoanId(e.target.value)}
                placeholder="Enter your loan ID"
                className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-500 focus:border-teal-500"
              />
            </div>

            <div>
              <Label htmlFor="amount" className="flex items-center text-sm text-gray-300 mb-1">
                <DollarSign className="w-4 h-4 mr-2" /> Amount (ETH)
              </Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-500 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700/50">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Repayment Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Loan ID:</span>
                <span className="text-white">{loanId || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span className="text-white">{amount || "0"} ETH</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-700">
                <span className="text-gray-400">Est. Gas Fee:</span>
                <span className="text-yellow-400">~0.001 ETH</span>
              </div>
            </div>
          </div>

          <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <RefreshCw className="w-5 h-5 text-teal-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-teal-400 mb-1">Payment Notice</h4>
                <p className="text-xs text-gray-400">
                  Ensure you have enough ETH in your wallet to cover gas fees.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleRepay}
            disabled={txPending || !loanId || !amount}
            className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 py-3 text-white font-medium shadow-lg shadow-teal-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {txPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4 mr-2" />
                Make Payment
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

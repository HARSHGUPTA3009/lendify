 
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { DollarSign, Hash, Loader2, TrendingUp } from "lucide-react";
import { useToast } from "../hooks/use-toast";

import useLoanManager from "../hooks/useLoanManager";

export default function FundLoan() {
  const [loanId, setLoanId] = useState("");
  const [amount, setAmount] = useState("");
  const [txPending, setTxPending] = useState(false);
  const { toast } = useToast();
  const { fundLoan } = useLoanManager();

  const handleFund = async () => {
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
    await fundLoan(loanId, amount);
    toast({
      title: "Loan Funded Successfully!",
      description: `Funded ${amount} ETH to loan #${loanId}`,
    });
    setLoanId("");
    setAmount("");
  } catch (error) {
    console.error(error);
    toast({
      title: "Transaction Failed",
      description: "Funding failed",
      variant: "destructive",
    });
  }
    setTxPending(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold text-purple-400">
            <TrendingUp className="w-6 h-6 mr-3" />
            Fund a Loan
          </CardTitle>
          <p className="text-gray-400">
            Provide funding to loan requests and earn interest
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="loanId" className="text-sm font-medium text-gray-300 flex items-center">
              <Hash className="w-4 h-4 mr-2" />
              Loan ID
            </Label>
            <Input
              id="loanId"
              type="text"
              placeholder="Enter loan ID to fund"
              value={loanId}
              onChange={(e) => setLoanId(e.target.value)}
              className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-gray-300 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Funding Amount (ETH)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-purple-500/20"
            />
          </div>

          <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700/50">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Funding Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Loan ID:</span>
                <span className="text-white">#{loanId || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Funding Amount:</span>
                <span className="text-white">{amount || "0"} ETH</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-700">
                <span className="text-gray-400">Expected Return:</span>
                <span className="text-purple-400">{amount ? (parseFloat(amount) * 1.1).toFixed(2) : "0"} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Interest Rate:</span>
                <span className="text-green-400">10% APR</span>
              </div>
            </div>
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <TrendingUp className="w-5 h-5 text-purple-400 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-purple-400 mb-1">Investment Opportunity</h4>
                <p className="text-xs text-gray-400">
                  By funding this loan, you’ll earn competitive interest while helping the DeFi ecosystem grow.
                </p>
              </div>
            </div>
          </div>

          <Button
            onClick={handleFund}
            disabled={txPending || !loanId || !amount}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-medium py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/25"
          >
            {txPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <DollarSign className="w-4 h-4 mr-2" />
                Fund Loan
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

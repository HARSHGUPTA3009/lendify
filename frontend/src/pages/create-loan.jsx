import { useState } from "react";
import useLoanManager from "../hooks/useLoanManager";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Plus, DollarSign, Calendar, Hash, Loader2 } from "lucide-react";
import { useToast } from "../hooks/use-toast";

export default function CreateLoan() {
  const { createLoan, txPending } = useLoanManager();
  const [amount, setAmount] = useState("");
  const [collateralId, setCollateralId] = useState("");
  const [duration, setDuration] = useState("");
  const { toast } = useToast();

  const handleCreate = async () => {
    if (!amount || !duration || !collateralId) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await createLoan(amount, collateralId, duration);
      toast({
        title: "Loan Created Successfully!",
        description: `Loan request for ${amount} ETH has been created`,
      });
      setAmount("");
      setCollateralId("");
      setDuration("");
    } catch (error) {
      console.error(error);
      toast({
        title: "Transaction Failed",
        description: "Failed to create loan request",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl font-bold text-green-400">
            <Plus className="w-6 h-6 mr-3" />
            Create Loan Request
          </CardTitle>
          <p className="text-gray-400">
            Create a new loan request using your NFT as collateral
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-sm font-medium text-gray-300 flex items-center">
              <DollarSign className="w-4 h-4 mr-2" />
              Loan Amount (ETH)
            </Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="collateral" className="text-sm font-medium text-gray-300 flex items-center">
              <Hash className="w-4 h-4 mr-2" />
              NFT Collateral ID
            </Label>
            <Input
              id="collateral"
              type="text"
              placeholder="Enter your NFT token ID"
              value={collateralId}
              onChange={(e) => setCollateralId(e.target.value)}
              className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration" className="text-sm font-medium text-gray-300 flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Loan Duration (Days)
            </Label>
            <Input
              id="duration"
              type="number"
              placeholder="30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="bg-gray-900/50 border-gray-600 text-white placeholder-gray-500 focus:border-green-500 focus:ring-green-500/20"
            />
          </div>

          <div className="bg-gray-900/30 rounded-lg p-4 border border-gray-700/50">
            <h3 className="text-sm font-medium text-gray-300 mb-2">Loan Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Amount:</span>
                <span className="text-white">{amount || "0"} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Collateral:</span>
                <span className="text-white">NFT #{collateralId || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Duration:</span>
                <span className="text-white">{duration || "0"} days</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-700">
                <span className="text-gray-400">Estimated Interest:</span>
                <span className="text-green-400">{amount ? (parseFloat(amount) * 0.1).toFixed(2) : "0"} ETH</span>
              </div>
            </div>
          </div>

          <Button
            onClick={handleCreate}
            disabled={txPending || !amount || !collateralId || !duration}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-500/25"
          >
            {txPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating Loan...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-2" />
                Create Loan Request
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

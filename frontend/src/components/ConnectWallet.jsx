import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Wallet, Shield, CheckCircle, LogOut } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { useWallet } from '../contexts/WalletContext';

export default function ConnectWallet() {
  const { address, isConnected, connect, disconnect } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const connectWallet = async () => {
    setIsConnecting(true);
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        connect(accounts[0]);
        toast({
          title: "Wallet Connected",
          description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        });
      } else {
        toast({
          title: "MetaMask not found",
          description: "Please install MetaMask to connect your wallet.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error('Wallet connection failed:', err);
      toast({
        title: "Connection Failed",
        description: "Could not connect to your wallet.",
        variant: "destructive",
      });
    }
    setIsConnecting(false);
  };

  const disconnectWallet = () => {
    disconnect();
    toast({
      title: "Disconnected",
      description: "Your wallet has been disconnected.",
    });
  };

  return (
    <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
            {isConnected ? (
              <CheckCircle className="w-8 h-8 text-white" />
            ) : (
              <Wallet className="w-8 h-8 text-white" />
            )}
          </div>

          {isConnected ? (
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-green-400 mb-2">Wallet Connected</h3>
                <p className="text-sm text-gray-400 font-mono bg-gray-900/50 px-3 py-2 rounded-lg">
                  {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Loading..."}
                </p>
              </div>
              <Button
                onClick={disconnectWallet}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white border-0 shadow-lg shadow-red-500/25"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Disconnect
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Connect Your Wallet</h3>
              <p className="text-sm text-gray-400 mb-4">
                Connect with MetaMask to start lending & borrowing.
              </p>
              <Button
                onClick={connectWallet}
                disabled={isConnecting}
                className={`bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 shadow-lg shadow-blue-500/25
                  ${isConnecting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isConnecting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4 mr-2" />
                    Connect Wallet
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

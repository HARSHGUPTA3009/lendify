import ConnectWallet from "../components/ConnectWallet";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { ArrowRight, TrendingUp, Users, Shield, DollarSign } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";


export default function Index() {
  const stats = [
    { label: "Total Volume", value: "$2.4M", icon: DollarSign, color: "from-blue-500 to-cyan-500" },
    { label: "Active Loans", value: "1,247", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
    { label: "Users", value: "8,392", icon: Users, color: "from-purple-500 to-pink-500" },
    { label: "Success Rate", value: "98.7%", icon: Shield, color: "from-orange-500 to-red-500" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6 py-12">
        <div className="inline-block">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent animate-fade-in">
            Decentralized Lending
          </h1>
          <div className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-4 animate-scale-in"></div>
        </div>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fade-in">
          Experience the future of peer-to-peer lending on the blockchain. 
          Secure, transparent, and fully decentralized.
        </p>
        <ConnectWallet />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card 
            key={stat.label}
            className="bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-green-400">
              <DollarSign className="w-5 h-5 mr-2" /> Create Loan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">Need funds? Create a loan request with your NFT as collateral.</p>
            <Button asChild className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 w-full">
              <Link to="/create-loan">
                Get Started <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-400">
              <TrendingUp className="w-5 h-5 mr-2" /> Fund Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">Earn yield by funding loan requests from other users.</p>
            <Button asChild className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 w-full">
              <Link to="/fund-loan">
                Start Lending <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-400">
              <Shield className="w-5 h-5 mr-2" /> My Loans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">Track and manage all your active loans in one place.</p>
            <Button asChild className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 w-full">
              <Link to="/my-loans">
                View Loans <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm border-gray-700/50">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Why Choose LendChain?
            </h2>
            <p className="text-gray-400">Built on blockchain technology for maximum security and transparency</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-blue-400">Secure</h3>
              <p className="text-gray-400">Smart contracts ensure your funds and collateral are always protected</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-400">Profitable</h3>
              <p className="text-gray-400">Competitive rates for both lenders and borrowers</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-400">Community</h3>
              <p className="text-gray-400">Join thousands of users in the decentralized finance revolution</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

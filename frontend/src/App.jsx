import { Routes, Route, NavLink } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/index";
import CreateLoan from "./pages/create-loan";
import FundLoan from "./pages/fund-loan";
import MyLoans from "./pages/my-loans";
import Loans from "./pages/loans";
import RepayLoan from "./pages/repay-loan";
import { Wallet, Plus, DollarSign, List, CreditCard, RefreshCw } from "lucide-react";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
        <div className="fixed inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse opacity-30"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-6">
          <header className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                  Lendify
                </h1>
              </div>
            </div>

            <nav className="flex space-x-2 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 border border-gray-700/50">
              <NavLink to="/" className={({ isActive }) => 
                `flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25" 
                    : "hover:bg-gray-700/50 text-gray-300 hover:text-white"
                }`
              }>
                <List className="w-4 h-4" /><span>Home</span>
              </NavLink>
              <NavLink to="/create-loan" className={({ isActive }) => 
                `flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25" 
                    : "hover:bg-gray-700/50 text-gray-300 hover:text-white"
                }`
              }>
                <Plus className="w-4 h-4" /><span>Create Loan</span>
              </NavLink>
              <NavLink to="/fund-loan" className={({ isActive }) => 
                `flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25" 
                    : "hover:bg-gray-700/50 text-gray-300 hover:text-white"
                }`
              }>
                <DollarSign className="w-4 h-4" /><span>Fund Loan</span>
              </NavLink>
              <NavLink to="/my-loans" className={({ isActive }) => 
                `flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25" 
                    : "hover:bg-gray-700/50 text-gray-300 hover:text-white"
                }`
              }>
                <CreditCard className="w-4 h-4" /><span>My Loans</span>
              </NavLink>
              <NavLink to="/repay-loan" className={({ isActive }) => 
                `flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25" 
                    : "hover:bg-gray-700/50 text-gray-300 hover:text-white"
                }`
              }>
                <RefreshCw className="w-4 h-4" /><span>Repay</span>
              </NavLink>
            </nav>
          </header>

          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/create-loan" element={<CreateLoan />} />
              <Route path="/fund-loan" element={<FundLoan />} />
              <Route path="/my-loans" element={<MyLoans />} />
              <Route path="/loans" element={<Loans />} />
              <Route path="/repay-loan" element={<RepayLoan />} />
            </Routes>
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

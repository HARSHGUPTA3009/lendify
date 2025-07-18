# 🚀 P2P Lending dApp (Ethereum)

A decentralized peer-to-peer lending platform built on Ethereum.  
This app lets borrowers create loan requests, lenders fund them with ETH, and borrowers repay loans — all on-chain.

---

## 🌟 Features

✅ Borrowers create loan requests with amount & due date.  
✅ Lenders view & fund these requests using ETH.  
✅ Borrowers repay loans, tracked live on-chain.  
✅ "My Loans" dashboard shows status, repayment progress.  
✅ Clean React + Tailwind UI, fully integrated with Solidity smart contracts.

---

## 🛠 Tech Stack

- **Solidity (Hardhat)** — smart contracts
- **React.js + TailwindCSS** — frontend
- **Ethers.js** — blockchain interactions
- **Local Hardhat node** (or easily deployable to Goerli/Mumbai)

---

## 📂 File Structure

<img src="public/0.png" alt="structure" width="200" height="500"/>




---

## 🖼 Screenshots

### 🏠 Home
![Home](public/1.png)

---

### 📝 Create Loan
![Create Loan](public/2.png)

---

### 💸 Fund Loan
![Fund Loan](public/3.png)

---

### 📊 My Loans Dashboard
![My Loans](public/4.png)

---

### 🔁 Repay Loan
![Repay Loan](public/5.png)

---

## 🚀 Getting Started

### 🔥 Clone & install
```bash
git clone https://github.com/yourusername/p2p-lending-dapp.git
cd p2p-lending-dapp

# Install Hardhat & backend deps
npm install

# Go to frontend
cd frontend
npm install

npx hardhat node

npx hardhat run scripts/deploy.js --network localhost (another Terminal)

Copy the deployed contract address

Paste it in frontend/src/utils/contractAddresses.js:
export default {
  LoanManager: "0xYourDeployedContractAddress"
};

cd frontend
npm run dev

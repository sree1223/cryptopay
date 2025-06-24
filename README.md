# 🪙 Web3Pay – Crypto Wallet App (React Native)

A sleek, lightweight mobile crypto wallet built using **React Native + Expo**.  
Supports **multi-coin balances**, **wallet actions (Send/Receive)**, **multi-sig creation**, and more — all wrapped in a modern, minimal UI.

---

## 🚀 Features

- 🧾 **Dashboard**: View balances for Bitcoin, Ethereum, Solana, Cardano, and Ripple
- 🧠 **ENS & Wallet Options**:
  - Register ENS
  - Create/Switch Wallet
  - Create Multi-Sig Wallet
  - Backup Keys (coming soon)
- 👥 **Multi-Sig Transactions**:
  - Choose number of owners
  - Set required approvals
  - Sign, Accept, Decline with preview
- 🔁 **Send & Receive UI**
- 📜 **Transaction History**:
  - View all received, sent, submitted, and accepted/declined transactions
- 🔐 Built for future support:
  - Android Secure Keystore
  - Biometric Auth
  - Camera (QR scanning)

---

## 🧪 Tech Stack

- 📱 React Native + Expo
- 🎨 Plain `StyleSheet` (No Tailwind)
- ⚡ Local-first dev (web preview via Expo)
- 🔄 GitHub used for backup and public publishing

---


## 🛠 Development Setup

```bash
# Clone the project
git clone https://github.com/yourusername/web3pay.git
cd web3pay

# Install dependencies
npm install

# Start the dev server
npx expo start

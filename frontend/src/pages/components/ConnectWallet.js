import { useState } from "react";

export default function ConnectWallet() {
  const [accounts, setAccounts] = useState("");

  async function connectWallet() {
    if (window.ethereum) {
      const account = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(account[0]);
    } else {
      alert("Metamask not installed!");
    }
  }

  return (
    <button
      onClick={connectWallet}
      className="bg-violet-700 hover:bg-violet-800 text-white font-semibold px-6 py-2 rounded-xl shadow-lg shadow-black text-shadow-md transition duration-300"
    >
      {accounts ? `Connected ${accounts.slice(0, 6)}...` : "Connect Wallet"}
    </button>
  );
}

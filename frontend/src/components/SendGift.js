"use client";
import { useState } from "react";
import { GetContract } from "@/lib/ethers";

export default function SendGift() {
  const [recipient, setRecipient] = useState("");
  const [emojiKeyword, setEmojiKeyword] = useState("");
  const [message, setMessage] = useState("");

  const sendGift = async () => {
    try {
      const contract = await GetContract();
      const tx = await contract.mintGift(
        recipient.trim(),
        emojiKeyword,
        message
      );
      await tx.wait();
      alert("Gift sent successfully!");
      setRecipient("");
      setEmojiKeyword("");
      setMessage("");
    } catch (err) {
      console.error("Error sending gift:", err);
      alert("Failed to send gift");
    }
  };

  return (
    <div className="backdrop-blur-xl bg-white/10 border border-violet-500 rounded-3xl shadow-lg shadow-violet-700 max-w-xl mx-auto p-8 text-white font-[cursive]">
      <h2 className="text-3xl font-bold mb-6 text-violet-200"
      style={{ textShadow: "2px 2px 6px #a855f7", fontFamily: "cursive" }}>
        ✨ Send a Gift
      </h2>

      <input
        type="text"
        placeholder="Recipient address"
        className="w-full mb-4 p-3 rounded-xl bg-white/20 border border-violet-400 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-violet-600"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="What do you want to send?"
        className="w-full mb-4 p-3 rounded-xl bg-white/20 border border-violet-400 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-violet-600"
        value={emojiKeyword}
        onChange={(e) => setEmojiKeyword(e.target.value)}
      />
      <textarea
        placeholder="Your message"
        rows={4}
        className="w-full mb-6 p-3 rounded-xl bg-white/20 border border-violet-400 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-violet-600 resize-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        onClick={sendGift}
        className="bg-black hover:bg-violet-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-black text-shadow-md transition duration-300"
      >
        🎁 Send Gift
      </button>
    </div>
  );
}

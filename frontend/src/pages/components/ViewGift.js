"use client";
import { useState } from "react";
import { GetContract } from "@/lib/ethers";
import GiftModal from "./giftModal";

const emojiMap = {
  cake: "/images/cake.png",
  heart: "/images/heart.png",
  star: "/images/star.png",
  diamond: "/images/diamond.png",
  balloon: "/images/balloon.png",
  book: "/images/book.png",
  flower: "/images/flower.png",
  gift_pack: "/images/gift_pack.png",
  chocolate: "/images/chocolate.png",
};

export default function ViewGifts() {
  const [tokenId, setTokenId] = useState("");
  const [gift, setGift] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchGift = async () => {
    const parsedId = parseInt(tokenId);
    if (isNaN(parsedId) || parsedId < 0) {
      alert("Please enter a valid non-negative Token ID.");
      return;
    }

    try {
      const contract = await GetContract();
      const result = await contract.viewGift(parsedId);
      const [emoji, message, sender] = result;
      setGift({
        emoji,
        message,
        sender,
        imageSrc: emojiMap[emoji] || "/images/default.jpg",
      });
      setShowModal(true);
    } catch (err) {
      console.error(err);
      if (err.reason?.includes("invalid token ID")) {
        alert("Gift not found for this token ID.");
      } else {
        alert("Something went wrong fetching gift.");
      }
    }
  };

  return (
    <>
      <div className="backdrop-blur-xl bg-white/10 border border-violet-500 rounded-3xl shadow-lg shadow-violet-700 max-w-xl mx-auto p-8 text-white font-[cursive]">
        <h2 className="text-3xl font-bold mb-6 text-violet-200"
          style={{ textShadow: "2px 2px 6px #a855f7", fontFamily: "cursive" }}>
          🎉 View Received Gift
        </h2>

        <input
          type="number"
          min="0"
          step="1"
          placeholder="Enter token ID"
          className="w-full mb-6 p-3 rounded-xl bg-white/20 border border-violet-400 placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-violet-600"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />

        <button
          onClick={fetchGift}
          className="bg-black hover:bg-violet-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-black text-shadow-md transition duration-300"
        >
          🎁 View Gift
        </button>
      </div>

      {showModal && gift && (
        <GiftModal gift={gift} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

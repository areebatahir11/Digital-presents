"use client";
import Image from "next/image";
import Confetti from "react-confetti";
import { useEffect, useState } from "react";

export default function GiftModal({ gift, onClose }) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });

      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex justify-center items-center">
      {showConfetti && (
        <Confetti width={dimensions.width} height={dimensions.height} />
      )}

      <div className="relative text-white text-center px-6 py-10 max-w-lg w-full font-[cursive] backdrop-blur-3xl bg-white/5 rounded-3xl shadow-[0_0_60px_#7c3aed55] transition-all duration-500">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black hover:bg-violet-950 text-white text-2xl flex items-center justify-center shadow-lg transition"
        >
          ✖
        </button>

        <Image
          src={gift.imageSrc}
          alt={gift.emoji}
          width={180}
          height={180}
          className="mx-auto mb-6 rounded-xl shadow-lg shadow-violet-800"
        />

        <p className="text-2xl italic mb-4" style={{ textShadow: "1px 1px 2px black" }}>
          “{gift.message}”
        </p>
        <p className="text-sm text-violet-300">From: {gift.sender}</p>
      </div>
    </div>
  );
}

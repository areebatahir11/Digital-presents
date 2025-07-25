import ConnectWallet from "./ConnectWallet";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center glassy backdrop-blur-md rounded-xl shadow-md border border-white/20 bg-white/10 text-black"style={{fontFamily: "cursive"}}>
      <h2 className="text-2xl font-bold text-black" style={{textShadow: "2px 2px 6px #a855f7"}}>
        🎁 Digital Gifting
      </h2>
      <ConnectWallet />
    </nav>
  );
}

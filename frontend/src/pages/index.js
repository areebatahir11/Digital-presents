import Navbar from "./components/navbar";
import SendGift from "./components/SendGift";
import ViewGifts from "./components/ViewGift";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-950 via-black to-violet-800 p-4">
      <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-xl min-h-screen p-4">
        <Navbar />
        <main className="pt-6 px-4 md:px-12 lg:px-24">
          <SendGift />
          <div className="my-8" />
          <ViewGifts />
        </main>
      </div>
    </div>
  );
}

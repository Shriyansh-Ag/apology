"use client";

export default function Footer() {
  return (
    <footer className="w-full py-12 flex flex-col items-center justify-center gap-2 z-10 relative">
      <div className="text-3xl opacity-70 mb-2">🐈</div>
      <p className="font-handwriting text-2xl text-gray-500 flex items-center gap-2">
        Made with all my love <span className="text-blush-400 animate-pulse">❤️</span>
      </p>
    </footer>
  );
}

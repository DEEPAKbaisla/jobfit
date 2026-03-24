

const Loading = () => {
  return (
   <main className="flex items-center justify-center min-h-screen">
  <div className="flex flex-col items-center gap-6">

    {/* Animated arc logo */}
    <div className="relative w-20 h-20">
      <svg viewBox="0 0 80 80" className="w-20 h-20 -rotate-90">
        {/* Track */}
        <circle cx="40" cy="40" r="30" fill="none" stroke="rgba(124,58,237,0.15)" strokeWidth="5" strokeLinecap="round"/>
        {/* Animated arc */}
        <circle
          cx="40" cy="40" r="30"
          fill="none"
          stroke="#7C3AED"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray="188"
          strokeDashoffset="188"
          style={{
            animation: "spin-arc 1.4s ease-in-out infinite",
          }}
        />
      </svg>

      {/* JF badge center */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-9 h-9 rounded-lg bg-violet-700 flex items-center justify-center"
          style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 700, color: "#fff" }}>
          JF
        </div>
      </div>
    </div>

    {/* Wordmark */}
    <p style={{ fontFamily: "Georgia, serif" }}
      className="text-xl font-bold text-white tracking-tight">
      Job<span className="text-violet-400 italic font-normal">Fit</span>
    </p>

    {/* Animated dots */}
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-violet-500"
          style={{ animation: `bounce-dot 1.2s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  </div>

  <style>{`
    @keyframes spin-arc {
      0%   { stroke-dashoffset: 188; opacity: 1; }
      50%  { stroke-dashoffset: 47; opacity: 1; }
      100% { stroke-dashoffset: 188; opacity: 1; }
    }
    @keyframes bounce-dot {
      0%, 100% { opacity: 0.2; transform: translateY(0); }
      50%       { opacity: 1;   transform: translateY(-4px); }
    }
  `}</style>
</main>
  )
}

export default Loading

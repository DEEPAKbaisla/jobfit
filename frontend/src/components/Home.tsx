import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";


const LandingPage = () => {
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { user, handleLogout } = useAuth();


  useEffect(() => {
  setMounted(true);
  const handleMouse = (e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };
  window.addEventListener("mousemove", handleMouse);
  return () => window.removeEventListener("mousemove", handleMouse);
}, []);

  const features = [
    {
      icon: "◎",
      title: "Match Score",
      desc: "Get a precise compatibility score between your profile and the job requirements.",
      color: "text-violet-400",
      bg: "bg-violet-400/10",
      border: "border-violet-400/20",
    },
    {
      icon: "⟡",
      title: "Technical Questions",
      desc: "AI-curated technical questions tailored to the exact stack and role you're targeting.",
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
      border: "border-cyan-400/20",
    },
    {
      icon: "◈",
      title: "Behavioral Questions",
      desc: "STAR-method behavioral questions with coaching on what interviewers are really looking for.",
      color: "text-pink-400",
      bg: "bg-pink-400/10",
      border: "border-pink-400/20",
    },
    {
      icon: "◬",
      title: "Skill Gap Analysis",
      desc: "See exactly where you fall short and what to focus on before the interview.",
      color: "text-orange-400",
      bg: "bg-orange-400/10",
      border: "border-orange-400/20",
    },
    {
      icon: "⬡",
      title: "7-Day Roadmap",
      desc: "A daily preparation plan with tasks, readings, and practice sessions.",
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/20",
    },
    {
      icon: "◇",
      title: "Resume-Tailored",
      desc: "Everything is personalized to your actual resume, not generic interview advice.",
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/20",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Paste the Job Description",
      desc: "Copy the full job posting — responsibilities, requirements, tech stack.",
      emoji: "📋",
    },
    {
      num: "02",
      title: "Upload Your Resume",
      desc: "Drop your PDF resume or describe your background in your own words.",
      emoji: "📄",
    },
    {
      num: "03",
      title: "Get Your Strategy",
      desc: "In under a minute, receive a complete interview battle plan.",
      emoji: "🎯",
    },
  ];

  const marqueeItems = [
    "Match Score", "Technical Questions", "Behavioral Questions",
    "Skill Gap Analysis", "7-Day Roadmap", "Resume Tailored",
    "AI Powered", "Interview Ready",
  ];

  return (
    <div className="min-h-screen bg-[#06060a] text-slate-200 overflow-x-hidden relative">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900&family=Instrument+Serif:ital@0;1&display=swap');

        .landing * { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes spin-ring {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .fade-1 { animation: fadeUp 0.75s ease forwards; animation-delay: 0.1s; opacity: 0; }
        .fade-2 { animation: fadeUp 0.75s ease forwards; animation-delay: 0.25s; opacity: 0; }
        .fade-3 { animation: fadeUp 0.75s ease forwards; animation-delay: 0.4s; opacity: 0; }
        .fade-4 { animation: fadeUp 0.75s ease forwards; animation-delay: 0.55s; opacity: 0; }
        .fade-5 { animation: fadeUp 0.75s ease forwards; animation-delay: 0.7s; opacity: 0; }

        .marquee-track { animation: marquee-scroll 22s linear infinite; display: flex; width: max-content; gap: 48px; }

        .feature-card { transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease !important; }
        .feature-card:hover { transform: translateY(-4px) !important; background: rgba(255,255,255,0.04) !important; }

        .step-item { transition: background 0.2s ease, border-radius 0.2s ease; padding: 36px 16px; }
        .step-item:hover { background: rgba(255,255,255,0.018); border-radius: 16px; }

        .serif-font { font-family: 'Instrument Serif', Georgia, serif !important; }
      `}</style>

      {/* Mouse-following glow */}
      <div
        className="fixed pointer-events-none z-0 rounded-full"
        style={{
          top: mousePos.y - 300,
          left: mousePos.x - 300,
          width: 600,
          height: 600,
          background: "radial-gradient(circle, rgba(139,92,246,0.055) 0%, transparent 70%)",
          transition: "top 0.5s ease, left 0.5s ease",
        }}
      />

      {/* Static ambient blobs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute rounded-full"
          style={{
            top: "-15%", right: "-5%", width: 700, height: 700,
            background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            bottom: "-20%", left: "-10%", width: 600, height: 600,
            background: "radial-gradient(circle, rgba(56,189,248,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── NAV ── */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-8 py-5 border-b border-white/[0.06] backdrop-blur-xl"
        style={{ background: "rgba(6,6,10,0.85)" }}
      >
        <div className="flex items-center gap-2">
  <div className="w-8 h-8 rounded-lg bg-violet-700 flex items-center justify-center text-[11px] font-bold text-white"
    style={{ fontFamily: "Georgia, serif" }}>
    JF
  </div>
  <span style={{ fontFamily: "Georgia, serif" }}
    className="font-bold text-[16px] tracking-tight text-white">
    Job<span className="text-violet-400 italic">Fit</span>
  </span>
</div>

        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it works"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, "-")}`}
              className="text-white/40 hover:text-white/80 text-sm font-medium transition-colors duration-150 no-underline"
            >
              {link}
            </a>
          ))}
        </div>
        
        {/* ── NAV buttons ── */}
<div className="flex items-center gap-2.5">
  {user ? (
    <>
      <Button
        variant="destructive"
        onClick={async () => {
          try {
            await handleLogout();
            toast.success("Successfully logged out");
            navigate("/");
          } catch (error) {
            toast.error("Logout failed. Please try again.");
          }
        }}
        // className="text-white/45 hover:text-white hover:bg-white/[0.06] hidden md:flex text-sm font-medium "
      >
        Logout
      </Button>
      <Button
        onClick={() => navigate("/prep")}
        className="hidden md:flex bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 rounded-lg border border-violet-500/40 transition-all duration-200"
      >
        Go to App →
      </Button>
    </>
  ) : (
    // ✅ not logged in — show Sign in + Get started
    <>
      <Button
        variant="ghost"
        onClick={() => navigate("/login")}
        className="text-white/45 hover:text-white hover:bg-white/[0.06] hidden md:flex text-sm font-medium"
      >
        Sign in
      </Button>
      <Button
        onClick={() => navigate("/prep")}
        className="bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-5 rounded-lg border border-violet-500/40 transition-all duration-200"
      >
        Get started free
      </Button>
    </>
  )}
</div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative z-10 text-center pt-24 pb-20 px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className={mounted ? "fade-1 mb-10" : "opacity-0 mb-10"}>
          <Badge
            variant="outline"
            className="px-4 py-1.5 rounded-full border-violet-500/30 bg-violet-500/10 text-violet-300 text-[11px] font-semibold uppercase tracking-widest gap-2 inline-flex items-center"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block flex-shrink-0"
              style={{ animation: "pulse-dot 2s ease infinite" }}
            />
            AI-Powered Interview Intelligence
          </Badge>
        </div>

        {/* Headline */}
        <h1
          className={`serif-font text-white font-normal leading-[1.05] tracking-[-2px] mb-7 ${mounted ? "fade-2" : "opacity-0"}`}
          style={{ fontSize: "clamp(52px, 8vw, 86px)" }}
        >
          Stop guessing,{" "}
          <span
            className="serif-font italic"
            style={{
              background: "linear-gradient(135deg, #a78bfa 0%, #f472b6 50%, #38bdf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            start winning
          </span>
          <br />
          your interviews.
        </h1>

        {/* Subline */}
        <p
          className={`text-[17px] text-white/35 max-w-[500px] mx-auto mb-12 leading-[1.75] ${mounted ? "fade-3" : "opacity-0"}`}
        >
          Paste a job description, upload your resume — get a personalized match score,
          curated questions, skill gaps, and a 7-day prep plan in under a minute.
        </p>

        {/* CTAs */}
        <div className={`flex items-center justify-center gap-3 mb-14 flex-wrap ${mounted ? "fade-4" : "opacity-0"}`}>
          <Button
            size="lg"
            onClick={() => navigate("/prep")}
            className="px-8 h-12 text-[15px] font-bold rounded-xl border border-violet-500/40 text-white hover:opacity-90 transition-all duration-200 hover:shadow-[0_8px_30px_rgba(139,92,246,0.35)] hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}
          >
            Analyze my resume →
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() =>
              document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-7 h-12 text-[15px] font-medium rounded-xl border-white/10 bg-transparent text-white/45 hover:bg-white/[0.04] hover:text-white/70 hover:border-white/20"
          >
            See how it works
          </Button>
        </div>

        {/* Stats */}
        <div className={`flex items-center justify-center gap-10 flex-wrap ${mounted ? "fade-5" : "opacity-0"}`}>
          {[
            { num: "10k+", label: "Reports generated" },
            { num: "94%", label: "Match accuracy" },
            { num: "<60s", label: "Generation time" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-[26px] font-black text-white tracking-tight">{s.num}</div>
              <div className="text-[11px] text-white/25 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="relative z-10 border-y border-white/[0.05] py-4 overflow-hidden mb-24" style={{ background: "rgba(255,255,255,0.015)" }}>
        <div className="marquee-track">
          {[...Array(2)].flatMap(() =>
            marqueeItems.map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="text-white/18 text-[12px] font-bold uppercase tracking-[2px] whitespace-nowrap flex-shrink-0 flex items-center gap-6"
              >
                {item}
                <span className="text-violet-600 text-base">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <section id="features" className="relative z-10 max-w-[1100px] mx-auto px-6 pb-28">
        <div className="text-center mb-16">
          <p className="text-violet-400 text-[11px] font-bold tracking-[3px] uppercase mb-4">
            Everything you need
          </p>
          <h2
            className="serif-font font-normal text-white tracking-[-1.5px] leading-[1.1]"
            style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
          >
            Your complete interview{" "}
            <span className="serif-font italic text-white/45">arsenal</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <Card
              key={f.title}
              className="feature-card bg-white/[0.025] border-white/[0.07] rounded-2xl cursor-default"
            >
              <CardContent className="p-7">
                <div
                  className={`w-10 h-10 rounded-xl mb-5 flex items-center justify-center text-[18px] border ${f.bg} ${f.border} ${f.color}`}
                >
                  {f.icon}
                </div>
                <h3 className="text-[15px] font-bold text-white mb-2.5 tracking-[-0.3px]">
                  {f.title}
                </h3>
                <p className="text-[13.5px] text-white/32 leading-[1.75]">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="relative z-10 max-w-[860px] mx-auto px-6 pb-28">
        <div className="text-center mb-16">
          <p className="text-cyan-400 text-[11px] font-bold tracking-[3px] uppercase mb-4">
            Simple process
          </p>
          <h2
            className="serif-font font-normal text-white tracking-[-1.5px]"
            style={{ fontSize: "clamp(32px, 5vw, 52px)" }}
          >
            Three steps to{" "}
            <span className="serif-font italic text-white/45">interview confidence</span>
          </h2>
        </div>

        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div key={step.num}>
              <div className="step-item flex items-start gap-8">
                <span className="text-[13px] font-black text-white/12 tracking-wider min-w-[36px] pt-1">
                  {step.num}
                </span>
                <div className="flex-1">
                  <h3 className="text-[21px] font-bold text-white tracking-[-0.5px] mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-[14.5px] text-white/33 leading-[1.75]">{step.desc}</p>
                </div>
                <div className="w-12 h-12 rounded-[14px] flex-shrink-0 flex items-center justify-center text-xl bg-violet-500/10 border border-violet-500/20">
                  {step.emoji}
                </div>
              </div>
              {i < steps.length - 1 && <Separator className="bg-white/[0.05] my-0" />}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative z-10 max-w-[900px] mx-auto px-6 pb-28">
        <Card
          className="border-violet-500/20 rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.14) 0%, rgba(56,189,248,0.07) 100%)",
          }}
        >
          <CardContent className="p-16 text-center relative overflow-hidden">
            {/* Decorative rings */}
            <div
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full border border-violet-500/10 pointer-events-none"
              style={{ animation: "spin-ring 30s linear infinite" }}
            />
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border border-violet-500/[0.15] pointer-events-none" />

            <h2
              className="serif-font font-normal text-white tracking-[-1px] mb-4 relative"
              style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
            >
              Ready to ace your next interview?
            </h2>
            <p className="text-[15px] text-white/35 leading-[1.75] mb-10 relative">
              Join thousands of candidates who've walked into interviews confident,
              <br className="hidden sm:block" />
              prepared, and ready to impress.
            </p>
            <Button
              size="lg"
              onClick={() => navigate("/prep")}
              className="px-10 h-12 text-[15px] font-bold rounded-xl border border-violet-500/40 text-white hover:opacity-90 hover:shadow-[0_8px_30px_rgba(139,92,246,0.35)] hover:-translate-y-0.5 transition-all duration-200 relative"
              style={{ background: "linear-gradient(135deg, #8b5cf6, #7c3aed)" }}
            >
              Start for free →
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* ── FOOTER ── */}
      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-[1100px] mx-auto px-6 pt-14 pb-6 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2">
  <div className="w-8 h-8 rounded-lg bg-violet-700 flex items-center justify-center text-[11px] font-bold text-white"
    style={{ fontFamily: "Georgia, serif" }}>
    JF
  </div>
  <span style={{ fontFamily: "Georgia, serif" }}
    className="font-bold text-[16px] tracking-tight text-white">
    Job<span className="text-violet-400 italic">Fit</span>
  </span>
</div>
            </div>
            <p className="text-[13px] text-white/25 leading-[1.8] max-w-[280px]">
              AI-powered interview preparation that turns your resume and target role into a winning strategy.
            </p>
            <div className="flex gap-2.5 pt-1">
              {["GH", "LI", "TW"].map((s) => (
                <Button
                  key={s}
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 rounded-lg border-white/[0.08] bg-white/[0.03] text-white/28 hover:text-white/70 hover:bg-white/[0.08] text-[11px] font-bold"
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <p className="text-white/38 text-[11px] font-bold uppercase tracking-[2px]">Product</p>
            <div className="flex flex-col gap-3">
              {["Features", "How it works", "Changelog"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/25 hover:text-white/65 text-[13.5px] transition-colors duration-150 no-underline"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <p className="text-white/38 text-[11px] font-bold uppercase tracking-[2px]">Company</p>
            <div className="flex flex-col gap-3">
              {["About", "Blog", "Privacy Policy", "Terms of Service"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-white/25 hover:text-white/65 text-[13.5px] transition-colors duration-150 no-underline"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>

        <Separator className="bg-white/[0.05]" />

        <div className="max-w-[1100px] mx-auto px-6 py-5 flex items-center justify-between flex-wrap gap-3">
          <p className="text-white/18 text-[12px]">
            © {new Date().getFullYear()} JobFiT. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-white/18 text-[12px]">
            <span
              className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"
              style={{ animation: "pulse-dot 2s ease infinite" }}
            />
            All systems operational
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
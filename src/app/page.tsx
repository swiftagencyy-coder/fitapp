import Link from 'next/link';
import { Dumbbell, Zap, Target, MessageSquare, ChevronRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-black">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="text-primary" size={28} />
            <span className="text-xl font-bold tracking-tighter">FIT TWIN <span className="text-primary italic">AI</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">How it Works</Link>
            <Link href="/login" className="hover:text-primary transition-colors">Login</Link>
            <Link href="/signup" className="px-5 py-2 bg-primary text-black rounded-full hover:scale-105 transition-transform active:scale-95">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              NEW: GPT-4o POWERED WORKOUTS
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight mb-8">
              UNLEASH YOUR <span className="text-primary italic">DIGITAL TWIN.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 mb-10 leading-relaxed max-w-xl">
              Professional-grade AI coaching that generates personalized hypertrophy & strength plans based on your anatomy, equipment, and biological data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/onboarding" className="group px-8 py-4 bg-primary text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:shadow-[0_0_40px_-10px_rgba(204,255,0,0.5)] transition-all transform hover:-translate-y-1">
                Start Transformation
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#preview" className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 transition-all rounded-2xl flex items-center justify-center font-bold">
                See it in action
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Zap, title: "Instant Generation", desc: "Scientific workouts built in seconds, optimized for your exact equipment." },
              { icon: Target, title: "Biological Precision", desc: "Tailored to your body type, injuries, and fasting schedule." },
              { icon: MessageSquare, title: "24/7 AI Coach", desc: "Always-on guidance for form, nutrition, and recovery." }
            ].map((f, i) => (
              <div key={i} className="space-y-4">
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center">
                  <f.icon className="text-primary" size={24} />
                </div>
                <h3 className="text-2xl font-bold">{f.title}</h3>
                <p className="text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

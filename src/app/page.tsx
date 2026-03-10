'use client';

import Link from 'next/link';
import { Dumbbell, Zap, Target, MessageSquare, ChevronRight, Activity, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-white overflow-hidden">
      <h1 style={{ color: 'red', fontSize: '100px', position: 'fixed', top: 0, left: 0, zIndex: 9999, background: 'white' }}>
        IF YOU SEE THIS THE APP IS UPDATING
      </h1>
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_-5px_hsl(var(--primary))] group-hover:scale-110 transition-transform">
              <Dumbbell className="text-primary-foreground" size={20} strokeWidth={3} />
            </div>
            <span className="text-xl font-black tracking-tighter uppercase leading-none">
              FIT TWIN <span className="text-primary italic">AI</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-white/50">
            <Link href="#features" className="hover:text-primary transition-colors">Capabilities</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">Protocol</Link>
            <Link href="/login" className="hover:text-primary transition-colors">Access</Link>
            <Button size="sm" asChild>
              <Link href="/signup">Initialize</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-24 md:pt-64 md:pb-40">
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.07] blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-blue-500/[0.03] blur-[150px] rounded-full -translate-x-1/2 opacity-50" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 glass border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] mb-10 text-primary shadow-xl"
            >
              <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
              Engine V2.0: Neural Training active
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[120px] font-black tracking-tighter leading-[0.85] mb-10 uppercase"
            >
              Unleash your <br />
              <span className="text-primary italic relative">
                Digital Twin.
                <div className="absolute -bottom-4 left-0 w-full h-2 bg-primary/20 blur-xl opacity-50" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-2xl font-medium"
            >
              Professional-grade AI coaching engineered to generate high-precision protocols based on your biomarkers, environment, and physical objective.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start"
            >
              <Button size="lg" className="group" asChild>
                <Link href="/onboarding">
                  Deploy Mission
                  <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/login">Identity Access</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Decorative Scroll Hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Initialize Transmission</span>
          <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Stats / Proof Section */}
      <section className="py-20 glass border-y border-white/5 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center md:text-left">
            {[
              { label: 'Protocols Generated', val: '142K+' },
              { label: 'Data Points Syncing', val: '2.8B' },
              { label: 'Neural Uplink Speed', val: '12ms' },
              { label: 'System Uptime', val: '99.9%' },
            ].map((s, i) => (
              <div key={i} className="space-y-1">
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{s.label}</p>
                <p className="text-3xl font-black text-primary italic tracking-tighter tabular-nums">{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 relative overflow-hidden bg-background">
        {/* Glow Element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/[0.03] blur-[150px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-none">
              Advanced Human <br /><span className="text-primary italic">Engineering.</span>
            </h2>
            <p className="text-muted-foreground text-lg uppercase font-bold tracking-[0.2em]">The tech stack behind your evolution.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Neural Synthesis",
                desc: "GPT-4o powered logic that adapts your training volume based on real-time biomass feedback and performance metrics.",
                accent: "from-primary/20 to-transparent"
              },
              {
                icon: Target,
                title: "Biotic Precision",
                desc: "Algorithms optimized for your exact morphology, phenotype, and injury history. No generic splits, only engineered results.",
                accent: "from-blue-500/10 to-transparent"
              },
              {
                icon: Shield,
                title: "Identity Integrity",
                desc: "End-to-end encrypted performance data. Your physical evolution is synchronized securely across all system modules.",
                accent: "from-purple-500/10 to-transparent"
              }
            ].map((f, i) => (
              <motion.div
                whileHover={{ y: -8 }}
                key={i}
                className="p-10 rounded-[3rem] glass-dark border-white/5 relative overflow-hidden group transition-all duration-500 hover:border-primary/20"
              >
                <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity", f.accent)} />
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 glass border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 group-hover:border-primary/30 transition-all duration-500">
                    <f.icon className="text-primary" size={32} />
                  </div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter">{f.title}</h3>
                  <p className="text-white/40 leading-relaxed font-medium">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <section className="py-32 bg-primary relative overflow-hidden group">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-5 transition-opacity duration-1000" />
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-8xl font-black text-primary-foreground tracking-[calc(-0.05em)] leading-none mb-12 uppercase italic">
            Evolve today.
          </h2>
          <Button size="lg" variant="secondary" className="h-20 px-16 text-xl rounded-full shadow-2xl" asChild>
            <Link href="/signup">
              Construct Profile
              <ChevronRight size={32} className="ml-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

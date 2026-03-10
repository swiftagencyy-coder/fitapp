'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, Timer, ChevronRight, X, Info, Activity, Target, Zap, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const MOCK_EXERCISES = [
    { name: 'Barbell Back Squat', sets: 4, reps: '8-10', weight: 100, type: 'Compound' },
    { name: 'Bulgarian Split Squat', sets: 3, reps: '10-12', weight: 40, type: 'Isolation' },
    { name: 'Leg Extensions', sets: 3, reps: '15', weight: 60, type: 'Isolation' },
];

export default function ActiveWorkoutPage() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const exercise = MOCK_EXERCISES[currentIdx];

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* Tactical Header */}
            <div className="flex items-center justify-between mb-12 glass p-4 rounded-[2rem] border-white/10">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-white/5 transition-colors">
                        <X size={20} className="text-muted-foreground" />
                    </Button>
                    <div className="h-10 w-px bg-white/10 mx-2" />
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <Activity className="text-primary" size={12} />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Live Session</span>
                        </div>
                        <h1 className="text-lg font-black tracking-widest uppercase">Protocol: <span className="text-white/60 font-bold italic">ALPHA-01</span></h1>
                    </div>
                </div>
                <div className="flex items-center gap-4 bg-background/50 px-6 py-3 rounded-2xl border border-white/5 shadow-inner">
                    <Timer size={18} className="text-primary animate-pulse" />
                    <span className="font-mono text-xl font-black text-white tabular-nums tracking-tighter">42:15<span className="text-[10px] text-muted-foreground ml-1 font-sans font-black">s</span></span>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIdx}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="space-y-10"
                >
                    {/* Exercise Identifier */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-primary/20 text-primary border border-primary/20 rounded-lg text-[10px] font-black uppercase tracking-widest leading-none">
                                {exercise.type}
                            </span>
                            <div className="flex gap-1">
                                {[...Array(MOCK_EXERCISES.length)].map((_, i) => (
                                    <div key={i} className={cn(
                                        "h-1 rounded-full transition-all duration-500",
                                        i === currentIdx ? "w-8 bg-primary" : "w-2 bg-white/10"
                                    )} />
                                ))}
                            </div>
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-white italic">
                            {exercise.name.split(' ').slice(0, -1).join(' ')} <br />
                            <span className="text-primary not-italic">{exercise.name.split(' ').slice(-1)}</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Interactive Set Matrix */}
                        <div className="lg:col-span-8 space-y-4">
                            {[...Array(exercise.sets)].map((_, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    key={i}
                                >
                                    <Card className="glass-dark border-white/5 group relative overflow-hidden transition-all duration-300 hover:border-primary/20">
                                        <CardContent className="p-6 flex items-center justify-between gap-6">
                                            <div className="flex items-center gap-8">
                                                <div className="relative">
                                                    <span className="text-3xl font-black italic opacity-10 tabular-nums">0{i + 1}</span>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center font-black text-xs border border-white/10">
                                                            {i + 1}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-8">
                                                    <div className="space-y-1.5 focus-within:translate-y-[-2px] transition-transform">
                                                        <label className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.2em] ml-1">Load (kg)</label>
                                                        <Input
                                                            defaultValue={exercise.weight}
                                                            className="w-24 bg-white/5 border border-white/5 h-12 text-xl font-black rounded-xl text-center focus:border-primary/40 focus:bg-primary/5 transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5 focus-within:translate-y-[-2px] transition-transform">
                                                        <label className="text-[9px] text-muted-foreground uppercase font-black tracking-[0.2em] ml-1">Rep Count</label>
                                                        <Input
                                                            defaultValue={exercise.reps}
                                                            className="w-24 bg-white/5 border border-white/5 h-12 text-xl font-black rounded-xl text-center focus:border-primary/40 focus:bg-primary/5 transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <Button size="icon" className="rounded-2xl h-14 w-14 glass-dark border-white/10 hover:bg-primary hover:text-black hover:scale-105 transition-all shadow-xl group/btn">
                                                <Check size={28} className="transition-transform group-hover/btn:scale-110" />
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>

                        {/* Tactical Sidebar */}
                        <div className="lg:col-span-4 space-y-6">
                            <Card className="glass border-white/10 p-8 space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                        <Zap size={14} className="text-primary" />
                                        Performance Tips
                                    </h3>
                                    <p className="text-sm font-medium leading-relaxed italic opacity-80">
                                        "Focus on a 3-second eccentric phase. Keep tension constant."
                                    </p>
                                </div>
                                <div className="h-px bg-white/5" />
                                <div className="space-y-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                        <Target size={14} className="text-blue-500" />
                                        Rest Interval
                                    </h3>
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-blue-500"
                                                initial={{ width: "0%" }}
                                                animate={{ width: "65%" }}
                                                transition={{ duration: 5, ease: "linear" }}
                                            />
                                        </div>
                                        <span className="text-xs font-black tabular-nums">01:14</span>
                                    </div>
                                </div>
                            </Card>

                            <Button variant="outline" className="w-full h-16 rounded-[2rem] glass-dark border-white/5 hover:bg-white/10 text-[10px] font-black uppercase tracking-[0.3em] gap-3">
                                <Info size={16} />
                                Technical Specifications
                            </Button>
                        </div>
                    </div>

                    {/* Navigation Actions */}
                    <div className="flex gap-6 pt-12 border-t border-white/5">
                        <Button
                            variant="outline"
                            className="flex-1 h-20 rounded-[2.5rem] glass-dark border-white/5 text-xs font-black uppercase tracking-[0.3em] gap-4"
                            onClick={() => setCurrentIdx(p => Math.max(0, p - 1))}
                            disabled={currentIdx === 0}
                        >
                            <ChevronLeft />
                            Backtrack Protocol
                        </Button>
                        <Button
                            className="flex-1 h-20 rounded-[2.5rem] bg-primary text-black font-black text-xs uppercase tracking-[0.3em] gap-4 shadow-[0_0_50px_-10px_rgba(204,255,0,0.5)] active:scale-95 transition-all"
                            onClick={() => setCurrentIdx(p => Math.min(MOCK_EXERCISES.length - 1, p + 1))}
                        >
                            Sync & Progression
                            <ChevronRight />
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

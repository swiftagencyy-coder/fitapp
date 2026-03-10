'use client';

import { Dumbbell, Calendar, Info, Clock, Play, ArrowRight, Zap, Target, ScrollText, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const weeklySplit = [
    { day: 'Day 1', name: 'Legs & Core A', focus: 'Quads, Calves, Abs', duration: '65m', intensity: 'High', type: 'Hypertrophy', active: true },
    { day: 'Day 2', name: 'Rest', focus: 'Active Recovery', duration: '—', intensity: 'Low', type: 'Recovery', active: false },
    { day: 'Day 3', name: 'Push B', focus: 'Chest, Shoulders, Triceps', duration: '55m', intensity: 'Moderate', type: 'Hypertrophy', active: false },
    { day: 'Day 4', name: 'Pull A', focus: 'Back, Biceps, Rear Delts', duration: '60m', intensity: 'High', type: 'Strength', active: false },
    { day: 'Day 5', name: 'Rest', focus: 'Active Recovery', duration: '—', intensity: 'Low', type: 'Recovery', active: false },
    { day: 'Day 6', name: 'Legs & Core B', focus: 'Hamstrings, Glutes, Abs', duration: '70m', intensity: 'High', type: 'Hypertrophy', active: false },
    { day: 'Day 7', name: 'Upper Hybrid', focus: 'Full Upper Body', duration: '60m', intensity: 'Moderate', type: 'Metabolic', active: false },
];

export default function WorkoutPage() {
    return (
        <div className="space-y-10 pb-12">
            {/* Protocol Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Protocol Active: Cycle 01</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
                        Training <span className="text-primary italic">Timeline.</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">Hypertrophy V1: Mechanical Tension & Progressive Overload</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="glass rounded-2xl h-12 px-6 border-white/5 hover:bg-white/10">
                        <ScrollText className="mr-2" size={18} />
                        Full Script
                    </Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-2xl h-12 px-8 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)]" asChild>
                        <Link href="/workout/active">
                            <Play className="mr-2 fill-current" size={18} />
                            Deploy Mission
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Protocol Strategy Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="glass-dark border-white/5 relative overflow-hidden group h-fit">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -translate-y-1/3 translate-x-1/3" />
                        <CardHeader>
                            <CardTitle className="text-sm uppercase tracking-[0.2em] font-black flex items-center gap-2">
                                <Target className="text-primary" size={18} />
                                Strategy Brief
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 glass rounded-2xl border-white/5">
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Frequency</p>
                                    <p className="text-xl font-black">5 <span className="text-[10px] text-muted-foreground">DAYS/WK</span></p>
                                </div>
                                <div className="p-4 glass rounded-2xl border-white/5">
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Focus</p>
                                    <p className="text-xl font-black">HYPERTROPHY</p>
                                </div>
                            </div>

                            <div className="space-y-4 pt-2">
                                <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
                                    <span className="text-muted-foreground font-medium">Progression Model</span>
                                    <span className="text-primary font-bold italic">Linear Overload</span>
                                </div>
                                <div className="flex justify-between items-center text-sm py-2 border-b border-white/5">
                                    <span className="text-muted-foreground font-medium">System State</span>
                                    <span className="text-blue-400 font-bold">Optimized</span>
                                </div>
                                <div className="flex justify-between items-center text-sm py-2">
                                    <span className="text-muted-foreground font-medium">Next Deload</span>
                                    <span className="text-white font-bold">12 Days</span>
                                </div>
                            </div>

                            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 relative">
                                <Zap className="absolute top-4 right-4 text-primary opacity-20" size={24} />
                                <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Architect's Directive</p>
                                <p className="text-xs text-muted-foreground italic leading-relaxed">
                                    "Prioritize internal cueing today. Feel the contraction in the lengthened position of the quadriceps during work sets."
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Training Timeline */}
                <div className="lg:col-span-8 space-y-6">
                    <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2 px-1">
                        <Calendar className="text-primary" size={24} />
                        Weekly Timeline
                    </h2>

                    <div className="relative pl-8 space-y-6">
                        {/* The Timeline Line */}
                        <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-primary via-white/5 to-white/5" />

                        {weeklySplit.map((day, i) => (
                            <motion.div
                                key={day.day}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="relative"
                            >
                                {/* The Dot */}
                                <div className={cn(
                                    "absolute -left-8 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-4 border-background z-10 flex items-center justify-center",
                                    day.active ? "bg-primary shadow-[0_0_15px_hsl(var(--primary))]" : "bg-white/10"
                                )}>
                                    {day.active && <Zap size={10} className="text-black" />}
                                </div>

                                <Card className={cn(
                                    "glass-dark border-white/5 group hover:border-primary/20 transition-all duration-300",
                                    day.active && "border-primary/20 bg-primary/[0.03]"
                                )}>
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-center gap-6">
                                                <div className="text-center min-w-[50px]">
                                                    <p className="text-[10px] uppercase font-black text-muted-foreground tracking-widest leading-none mb-1">{day.type}</p>
                                                    <p className="text-2xl font-black text-white">{day.day.split(' ')[1]}</p>
                                                </div>
                                                <div className="h-10 w-px bg-white/5 hidden md:block" />
                                                <div>
                                                    <h3 className={cn(
                                                        "text-xl font-black tracking-tight leading-none mb-1",
                                                        day.active ? "text-primary" : "text-white/90"
                                                    )}>
                                                        {day.name}
                                                    </h3>
                                                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">{day.focus}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between md:justify-end gap-10">
                                                <div className="flex gap-8">
                                                    <div className="text-right flex flex-col items-end">
                                                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Intensity</p>
                                                        <span className={cn(
                                                            "text-xs font-black uppercase italic tracking-tighter",
                                                            day.intensity === 'High' ? "text-primary" : "text-white"
                                                        )}>{day.intensity}</span>
                                                    </div>
                                                    <div className="text-right flex flex-col items-end">
                                                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest mb-1">Vol</p>
                                                        <span className="text-xs font-black text-white uppercase tracking-tighter">{day.duration}</span>
                                                    </div>
                                                </div>

                                                {day.active ? (
                                                    <Button size="icon" className="bg-primary text-primary-foreground rounded-2xl h-12 w-12 group shadow-lg shadow-primary/20" asChild>
                                                        <Link href="/workout/active">
                                                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                                        </Link>
                                                    </Button>
                                                ) : (
                                                    <div className="w-12 h-12 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <ChevronRight size={20} className="text-muted-foreground" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

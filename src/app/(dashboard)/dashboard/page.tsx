'use client';

import { Dumbbell, Target, TrendingUp, Calendar, ArrowRight, Zap, MessageSquare, Activity, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';

const stats = [
    { label: 'Workout Streak', value: '12 Days', sub: '+2 from last week', icon: Zap, color: 'text-primary' },
    { label: 'Adherence', value: '94%', sub: 'Target: 90%', icon: Target, color: 'text-blue-400' },
    { label: 'Total Volume', value: '42.5k', sub: 'kg / this week', icon: TrendingUp, color: 'text-emerald-400' },
    { label: 'Intensity Avg', value: 'RPE 8.2', sub: 'Peak: 9.5', icon: Activity, color: 'text-orange-400' },
];

export default function DashboardPage() {
    return (
        <div className="space-y-10 pb-12">
            {/* Header Zone */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
                        Commander <span className="text-primary italic">Status.</span>
                    </h1>
                    <p className="text-muted-foreground mt-2 text-lg">Your protocol is 92% optimized for current biomarkers.</p>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="glass rounded-2xl h-12 px-6 border-white/5 hover:bg-white/10">
                        View Analytics
                    </Button>
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-2xl h-12 px-8 shadow-[0_0_20px_-5px_hsl(var(--primary)/0.4)]">
                        Log Metrics
                    </Button>
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Card className="glass-dark border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all duration-500">
                            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color.replace('text', 'bg')}/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2`} />
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-2xl bg-white/5 ${stat.color}`}>
                                        <stat.icon size={22} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground/60">{stat.label}</p>
                                        <p className="text-2xl font-black text-white mt-1">{stat.value}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                                    <TrendingUp size={10} className="text-primary" />
                                    {stat.sub}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Primary Action Zone */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Today's Mission */}
                <motion.div
                    className="xl:col-span-2"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Card className="glass border-primary/20 relative overflow-hidden h-full min-h-[400px] flex flex-col group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-50" />
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/3 -translate-y-1/3 group-hover:bg-primary/10 transition-colors duration-700" />

                        <CardHeader className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Live Protocol</span>
                            </div>
                            <CardTitle className="text-4xl font-black tracking-tighter uppercase leading-tight">
                                Today's <span className="text-primary">Mission:</span><br />
                                Legs & Core Focus
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="relative z-10 flex-1 flex flex-col justify-end space-y-8">
                            <div className="flex flex-wrap gap-8 py-8 border-y border-white/5">
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Target Split</p>
                                    <p className="text-2xl font-black text-white">LEGS A</p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Duration</p>
                                    <p className="text-2xl font-black text-white">65 <span className="text-sm font-medium text-muted-foreground">MIN</span></p>
                                </div>
                                <div>
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Complexity</p>
                                    <p className="text-2xl font-black text-primary italic">HIGH</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-16 rounded-3xl text-xl font-black uppercase tracking-tight shadow-xl shadow-primary/20 group" asChild>
                                    <Link href="/workout/active">
                                        Deploy Protocol
                                        <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </Button>
                                <Button variant="outline" className="glass h-16 w-16 rounded-3xl border-white/5" asChild>
                                    <Link href="/workout"><Calendar size={24} /></Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* AI Insight Zone */}
                <div className="space-y-8">
                    <Card className="glass-dark border-white/5 relative overflow-hidden h-full flex flex-col">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] font-black">
                                <MessageSquare className="text-primary" size={18} />
                                Architect Insights
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col justify-between space-y-6">
                            <div className="space-y-4">
                                <div className="p-5 glass rounded-2xl border-white/5 text-sm leading-relaxed italic relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/30 rounded-full" />
                                    "Your recovery biomarkers suggests a slight increase in systemic fatigue. Focus on the eccentric tempo (4s down) today instead of maxing out weight."
                                </div>
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 px-1">Today's Focus Points</p>
                                    <ul className="space-y-2">
                                        {[
                                            'Controlled Eccentric Tempo',
                                            'Max Range of Motion',
                                            'Peak Contraction Hold'
                                        ].map(item => (
                                            <li key={item} className="flex items-center gap-3 text-xs font-bold text-white/80 group cursor-default">
                                                <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-150 transition-transform" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <Button variant="outline" className="w-full glass rounded-2xl h-14 border-white/5 hover:bg-white/10 text-xs font-black uppercase tracking-widest group" asChild>
                                <Link href="/coach">
                                    Consult Architect
                                    <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Dumbbell, Target, Shield, Mail, Zap, Settings, Award, Activity, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Fingerprint className="text-primary" size={14} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Identity Verified</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
                        Operator <span className="text-primary italic">Profile.</span>
                    </h1>
                </div>
                <div className="flex gap-4">
                    <Button variant="outline" className="glass rounded-2xl h-12 px-6 border-white/5 hover:bg-white/10">
                        <Settings className="mr-2" size={18} />
                        Preferences
                    </Button>
                    <Badge className="bg-primary/20 text-primary border border-primary/20 px-4 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase h-12 flex items-center">
                        Level 04 Platinum
                    </Badge>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left: Identity Card */}
                <div className="lg:col-span-4 space-y-6">
                    <Card className="glass-dark border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -translate-y-1/3 translate-x-1/3" />
                        <CardContent className="p-8 flex flex-col items-center text-center relative z-10">
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary/20 to-transparent border border-primary/30 flex items-center justify-center mb-6 relative group-hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.3)] transition-all duration-500"
                            >
                                <User size={56} className="text-primary" />
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-background border border-white/10 rounded-2xl flex items-center justify-center shadow-xl">
                                    <Activity size={18} className="text-primary" />
                                </div>
                            </motion.div>
                            <h2 className="text-3xl font-black tracking-tight text-white">John Doe</h2>
                            <p className="text-muted-foreground text-sm uppercase font-bold tracking-widest mb-8">Active Protocol: Hybrid V1</p>

                            <div className="w-full space-y-3">
                                <Button className="w-full bg-white text-black hover:bg-white/90 font-black uppercase tracking-widest rounded-2xl h-14 text-xs">
                                    Edit Identity
                                </Button>
                                <Button variant="ghost" className="w-full text-muted-foreground hover:text-white rounded-2xl h-12 text-xs uppercase font-bold tracking-widest">
                                    View Analytics
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-dark border-white/5">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground flex items-center gap-2">
                                <Mail size={14} className="text-primary" />
                                Communication
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm font-bold text-white mb-1">john.doe@example.com</p>
                            <p className="text-[10px] text-muted-foreground uppercase font-black">Encrypted Channel Active</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Right: Biological Matrix & Achievements */}
                <div className="lg:col-span-8 space-y-8">
                    <Card className="glass-dark border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2" />
                        <CardHeader>
                            <CardTitle className="text-sm uppercase tracking-[0.2em] font-black flex items-center gap-2">
                                <Activity className="text-primary" size={18} />
                                Biological Matrix
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {[
                                { label: 'Height', value: '185', unit: 'cm', color: 'text-white' },
                                { label: 'Weight', value: '83.2', unit: 'kg', color: 'text-primary' },
                                { label: 'Phenotype', value: 'Athlete', unit: 'Meso', color: 'text-white italic' },
                                { label: 'Directive', value: 'Muscle', unit: 'Gains', color: 'text-white' },
                            ].map((stat) => (
                                <div key={stat.label} className="space-y-1">
                                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">{stat.label}</p>
                                    <p className={cn("text-2xl font-black tabular-nums", stat.color)}>
                                        {stat.value} <span className="text-[10px] text-muted-foreground uppercase italic">{stat.unit}</span>
                                    </p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <div className="space-y-4">
                        <h2 className="text-xl font-black uppercase tracking-tighter flex items-center gap-2 px-1">
                            <Award className="text-primary" size={24} />
                            Milestones achieved
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { name: 'Consistent', icon: Zap, color: 'bg-yellow-500/10 text-yellow-500', desc: '30 Day Streak' },
                                { name: 'Titan Force', icon: Dumbbell, color: 'bg-primary/10 text-primary', desc: '200kg Deadlift' },
                                { name: 'Quantified', icon: Shield, color: 'bg-blue-500/10 text-blue-500', desc: '100 Logs Peak' }
                            ].map((a) => (
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    key={a.name}
                                    className={cn(
                                        "flex flex-col items-center gap-4 p-8 rounded-3xl border glass-dark transition-all duration-300",
                                        "hover:border-primary/20 border-white/5"
                                    )}
                                >
                                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center", a.color)}>
                                        <a.icon size={32} />
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-sm font-black uppercase tracking-widest text-white">{a.name}</h3>
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold mt-1 tracking-widest">{a.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <Card className="glass-dark border-white/5 p-8 border-dashed flex flex-col items-center justify-center text-center space-y-4 cursor-pointer hover:bg-white/5 transition-colors">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                            <Target size={20} className="text-muted-foreground" />
                        </div>
                        <div>
                            <p className="text-sm font-black uppercase tracking-widest text-white">Advanced Biomarkers</p>
                            <p className="text-xs text-muted-foreground mt-1">Connect your wearable to sync biometric data.</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

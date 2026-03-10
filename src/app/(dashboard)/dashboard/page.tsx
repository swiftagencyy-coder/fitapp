'use client';

import { Dumbbell, Target, TrendingUp, Calendar, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const stats = [
    { label: 'Workout Streak', value: '12 Days', icon: Zap, color: 'text-primary' },
    { label: 'Adherence Score', value: '94%', icon: Target, color: 'text-blue-500' },
    { label: 'Volume (Week)', value: '42,500 kg', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Next Session', value: 'Legs A', icon: Calendar, color: 'text-purple-500' },
];

import { Zap } from 'lucide-react';

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight">DASHBOARD</h1>
                <p className="text-muted-foreground">Welcome back, Athlete. Here's your status.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <Card key={stat.label} className="bg-white/5 border-white/10">
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                    <p className="text-2xl font-bold mt-1">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} bg-white/5 p-3 rounded-xl`}>
                                    <stat.icon size={24} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Today's Workout */}
                <Card className="lg:col-span-2 bg-gradient-to-br from-primary/10 to-transparent border-primary/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Dumbbell className="text-primary" />
                            TODAY'S WORKOUT
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="text-4xl font-black">LEGS & CORE A</h3>
                            <p className="text-muted-foreground">Focus: Quadriceps, Calves, Lower Abs</p>
                        </div>

                        <div className="flex gap-8 py-4 border-y border-white/5">
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Exercises</p>
                                <p className="text-xl font-bold">8</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Est. Duration</p>
                                <p className="text-xl font-bold">65 min</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Intensity</p>
                                <p className="text-xl font-bold text-primary">High</p>
                            </div>
                        </div>

                        <Button asChild className="w-full bg-primary text-black hover:bg-primary/90 h-14 rounded-2xl text-lg font-bold shadow-lg shadow-primary/20">
                            <Link href="/workout/active">
                                START WORKOUT
                                <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                    </CardContent>
                </Card>

                {/* AI Coach Quick Access */}
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <MessageSquare className="text-primary" />
                            AI COACH
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 text-sm italic">
                            "You crushed your last squat session. Today, focus on controlling the tempo (3-1-1-0) during the Bulgarian Split Squats for maximum hypertrophy."
                        </div>
                        <Button variant="outline" className="w-full border-white/10 rounded-xl" asChild>
                            <Link href="/coach">Ask Coach a Question</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

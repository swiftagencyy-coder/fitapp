'use client';

import { Dumbbell, Calendar, Info, Clock, Play, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const weeklySplit = [
    { day: 'Day 1', name: 'Legs & Core A', focus: 'Quads, Calves, Abs', duration: '65m', intensity: 'High', active: true },
    { day: 'Day 2', name: 'Rest', focus: 'Active Recovery', duration: '—', intensity: 'Low', active: false },
    { day: 'Day 3', name: 'Push B', focus: 'Chest, Shoulders, Triceps', duration: '55m', intensity: 'Moderate', active: false },
    { day: 'Day 4', name: 'Pull A', focus: 'Back, Biceps, Rear Delts', duration: '60m', intensity: 'High', active: false },
    { day: 'Day 5', name: 'Rest', focus: 'Active Recovery', duration: '—', intensity: 'Low', active: false },
    { day: 'Day 6', name: 'Legs & Core B', focus: 'Hamstrings, Glutes, Abs', duration: '70m', intensity: 'High', active: false },
    { day: 'Day 7', name: 'Upper Body Hybrid', focus: 'Full Upper Body', duration: '60m', intensity: 'Moderate', active: false },
];

export default function WorkoutPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight uppercase">Your Training Protocol</h1>
                    <p className="text-muted-foreground">AI-Engineered based on your biomarkers and goals.</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-white/10 rounded-xl h-12">
                        <Info className="mr-2" size={18} />
                        View Strategy
                    </Button>
                    <Button className="bg-primary text-black hover:bg-primary/90 rounded-xl px-8 h-12 font-bold shadow-lg shadow-primary/20" asChild>
                        <Link href="/workout/active">
                            <Play className="mr-2 fill-current" size={18} />
                            Start Today
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Protocol Info */}
                <Card className="bg-white/5 border-white/10 h-fit">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-widest text-primary">
                            Protocol Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-3 border-b border-white/5">
                                <span className="text-muted-foreground">Plan Name</span>
                                <span className="font-bold">Hypertrophy V1.0</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/5">
                                <span className="text-muted-foreground">Progression</span>
                                <span className="font-bold text-primary italic">Double progression</span>
                            </div>
                            <div className="flex justify-between items-center py-3 border-b border-white/5">
                                <span className="text-muted-foreground">Frequency</span>
                                <span className="font-bold">5 Days / Week</span>
                            </div>
                            <div className="flex justify-between items-center py-3">
                                <span className="text-muted-foreground">Intensity Target</span>
                                <span className="font-bold">RPE 8.5 Avg</span>
                            </div>
                        </div>

                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                            <p className="text-xs text-primary font-bold uppercase tracking-wider mb-2">Coach's Note</p>
                            <p className="text-sm text-muted-foreground italic leading-relaxed">
                                "This block focuses on the lengthening phase of the muscle. Ensure you pause for 1s at the bottom of every rep to maximize mechanical tension."
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Weekly Split */}
                <div className="lg:col-span-2 space-y-4">
                    <h2 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
                        <Calendar className="text-primary" size={20} />
                        WEEKLY CYCLE
                    </h2>

                    <div className="grid grid-cols-1 gap-3">
                        {weeklySplit.map((day) => (
                            <Card
                                key={day.day}
                                className={`transition-all duration-300 ${day.active
                                        ? 'bg-gradient-to-r from-primary/10 to-transparent border-primary/40 shadow-[0_0_30px_-10px_rgba(204,255,0,0.2)]'
                                        : 'bg-white/5 border-white/10 hover:border-white/20'
                                    }`}
                            >
                                <CardContent className="p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold text-xs ${day.active ? 'bg-primary text-black' : 'bg-white/5 text-muted-foreground'
                                            }`}>
                                            {day.day}
                                        </div>
                                        <div>
                                            <h3 className={`font-bold text-lg leading-tight ${day.active ? 'text-white' : 'text-white/80'}`}>
                                                {day.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">{day.focus}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8 mr-4 hidden md:flex">
                                        <div className="text-center">
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Duration</p>
                                            <div className="flex items-center gap-1 text-sm font-bold">
                                                <Clock size={12} className="text-primary" />
                                                {day.duration}
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Intensity</p>
                                            <p className={`text-sm font-bold ${day.intensity === 'High' ? 'text-primary italic' : 'text-white'
                                                }`}>
                                                {day.intensity}
                                            </p>
                                        </div>
                                        {day.active && (
                                            <Button size="icon" className="bg-primary text-black rounded-full h-8 w-8 ml-4">
                                                <ArrowRight size={16} />
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

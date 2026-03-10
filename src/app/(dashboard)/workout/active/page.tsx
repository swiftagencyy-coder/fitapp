'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Check, Timer, ChevronRight, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOCK_EXERCISES = [
    { name: 'Barbell Back Squat', sets: 4, reps: '8-10', weight: 100 },
    { name: 'Bulgarian Split Squat', sets: 3, reps: '10-12', weight: 40 },
    { name: 'Leg Extensions', sets: 3, reps: '15', weight: 60 },
];

export default function ActiveWorkoutPage() {
    const [currentIdx, setCurrentIdx] = useState(0);
    const exercise = MOCK_EXERCISES[currentIdx];

    return (
        <div className="max-w-3xl mx-auto py-8">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <X size={24} />
                    </Button>
                    <div>
                        <h1 className="text-xl font-bold">ACTIVE SESSION</h1>
                        <p className="text-sm text-primary font-bold">LEGS & CORE A</p>
                    </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                    <Timer size={18} className="text-primary" />
                    <span className="font-mono text-lg font-bold">42:15</span>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIdx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <h2 className="text-4xl font-black tracking-tight uppercase leading-none">{exercise.name}</h2>
                        <div className="flex gap-2">
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase">Compound</span>
                            <Button variant="link" className="h-6 p-0 text-muted-foreground text-xs flex gap-1 items-center">
                                <Info size={14} /> View Instructions
                            </Button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Exercise Table */}
                        <div className="md:col-span-2 space-y-4">
                            {[...Array(exercise.sets)].map((_, i) => (
                                <Card key={i} className="bg-white/5 border-white/10 group hover:border-primary/50 transition-colors">
                                    <CardContent className="p-4 flex items-center justify-between gap-4">
                                        <div className="flex items-center gap-6">
                                            <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center font-bold text-muted-foreground group-hover:text-primary transition-colors">
                                                {i + 1}
                                            </span>
                                            <div className="flex gap-4">
                                                <div className="space-y-1">
                                                    <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Weight (kg)</label>
                                                    <Input defaultValue={exercise.weight} className="w-20 bg-black/40 border-none text-xl font-bold" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Reps</label>
                                                    <Input defaultValue={exercise.reps} className="w-20 bg-black/40 border-none text-xl font-bold" />
                                                </div>
                                            </div>
                                        </div>
                                        <Button size="icon" className="rounded-xl h-12 w-12 bg-white/5 border border-white/10 hover:bg-primary hover:text-black transition-all">
                                            <Check size={24} />
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 pt-10">
                        <Button
                            variant="outline"
                            className="flex-1 h-14 rounded-2xl border-white/10 text-lg font-bold"
                            onClick={() => setCurrentIdx(p => Math.max(0, p - 1))}
                        >
                            Previous
                        </Button>
                        <Button
                            className="flex-1 h-14 rounded-2xl bg-primary text-black font-bold text-lg"
                            onClick={() => setCurrentIdx(p => Math.min(MOCK_EXERCISES.length - 1, p + 1))}
                        >
                            Next Exercise
                            <ChevronRight className="ml-2" />
                        </Button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

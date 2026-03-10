'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Sparkles, User, Dumbbell, Zap, Activity, Shield, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const SUGGESTIONS = [
    "Explain Bulgarian Split Squats",
    "Substitute Barbell Squats (Home Gym)",
    "Training tips for intermittent fasting",
    "How to improve my squat depth?"
];

export default function CoachChatPage() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Identity verified. I've analyzed your biometric data and today's Leg Protocol. You're showing peak recovery metrics. Ready to optimize your performance?" }
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: 'user', content: input }]);
        setInput('');
        // Mock response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: "Protocol update: Based on your input, I recommend shifting the focus to high-intensity eccentrics. This will maximize the hypertrophic stimulus for your current mesotype." }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-10rem)] max-w-6xl mx-auto">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Brain className="text-primary" size={14} />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Neural Synthesis Active</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter uppercase leading-none">
                        AI <span className="text-primary italic">Coach.</span>
                    </h1>
                </div>
                <div className="flex gap-3">
                    <div className="px-4 py-2 glass rounded-xl flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Cognitive Link: High</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
                <Card className="flex-1 glass-dark border-white/5 flex flex-col overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.03] blur-[80px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <ScrollArea className="flex-1 p-6 lg:p-10">
                        <div className="space-y-8">
                            <AnimatePresence initial={false}>
                                {messages.map((msg, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        key={i}
                                        className={cn(
                                            "flex gap-4 items-start",
                                            msg.role === 'user' ? 'flex-row-reverse' : ''
                                        )}
                                    >
                                        <div className={cn(
                                            "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg transition-transform hover:scale-110",
                                            msg.role === 'assistant' ? 'bg-primary text-black' : 'bg-white/5 border border-white/10 text-white'
                                        )}>
                                            {msg.role === 'assistant' ? <Brain size={18} /> : <User size={18} />}
                                        </div>
                                        <div className={cn(
                                            "max-w-[80%] px-6 py-4 rounded-[2rem] text-sm leading-relaxed",
                                            msg.role === 'assistant'
                                                ? 'glass border-white/10 text-white font-medium rounded-tl-sm'
                                                : 'bg-white text-black font-bold rounded-tr-sm shadow-[0_10px_30px_-10px_rgba(255,255,255,0.2)]'
                                        )}>
                                            {msg.content}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </ScrollArea>

                    <div className="p-6 lg:p-8 border-t border-white/5 bg-background/50 backdrop-blur-xl">
                        <div className="flex gap-4 items-center bg-white/5 rounded-[2rem] p-2 border border-white/5 focus-within:border-primary/30 transition-all shadow-inner">
                            <Input
                                placeholder="Transmit query to AI..."
                                className="bg-transparent border-none h-14 rounded-2xl text-base px-6 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <Button
                                size="icon"
                                className="h-12 w-12 bg-primary text-black hover:bg-primary/90 rounded-2xl shrink-0 transition-transform active:scale-95 shadow-lg"
                                onClick={sendMessage}
                            >
                                <Send size={18} />
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Sidebar suggestions */}
                <div className="hidden lg:flex flex-col w-80 gap-6">
                    <Card className="glass-dark border-white/5 overflow-hidden group">
                        <CardContent className="p-8 space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground flex items-center gap-2">
                                <Activity size={14} className="text-primary" />
                                Neural Shortcuts
                            </h3>
                            <div className="space-y-3">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        className="w-full text-left text-[11px] font-black uppercase tracking-widest p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/40 hover:bg-primary/10 transition-all duration-300 group/btn"
                                        onClick={() => setInput(s)}
                                    >
                                        <span className="opacity-40 group-hover/btn:opacity-100 transition-opacity">{s}</span>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-dark border-white/5 p-8 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50" />
                        <div className="relative z-10 space-y-4 text-center">
                            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary/20">
                                <Shield className="text-primary" size={24} />
                            </div>
                            <h4 className="text-xs font-black uppercase tracking-widest text-white">Advanced Analysis</h4>
                            <p className="text-[10px] text-muted-foreground uppercase leading-relaxed font-bold">Connect your DNA profile for phenotype-specific optimization.</p>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

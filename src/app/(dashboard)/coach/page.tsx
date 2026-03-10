'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Send, Sparkles, User, Dumbbell, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const SUGGESTIONS = [
    "Explain Bulgarian Split Squats",
    "Substitute Barbell Squats (Home Gym)",
    "Training tips for intermittent fasting",
    "How to improve my squat depth?"
];

export default function CoachChatPage() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm your FitTwin AI Coach. I have analyzed your Leg Day today. Ready to crush it? Do you have any questions about the plan or your performance?" }
    ]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: 'user', content: input }]);
        setInput('');
        // Mock response
        setTimeout(() => {
            setMessages(prev => [...prev, { role: 'assistant', content: "That's a great question about muscle hypertrophy. Based on your current volume, I recommend focusing on a 4-second eccentric phase for those lifts to maximize time under tension." }]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="mb-6">
                <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                    AI COACH <Sparkles className="text-primary" />
                </h1>
                <p className="text-muted-foreground">Expert training advice, personalized to your data.</p>
            </div>

            <div className="flex-1 flex gap-8 min-h-0">
                <Card className="flex-1 bg-white/5 border-white/10 flex flex-col overflow-hidden">
                    <ScrollArea className="flex-1 p-6">
                        <div className="space-y-6">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${msg.role === 'assistant' ? 'bg-primary text-black' : 'bg-white/10'}`}>
                                        {msg.role === 'assistant' ? <Dumbbell size={20} /> : <User size={20} />}
                                    </div>
                                    <div className={`max-w-[80%] px-4 py-3 rounded-2xl ${msg.role === 'assistant' ? 'bg-white/5 border border-white/10' : 'bg-primary text-black font-medium'}`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>

                    <div className="p-6 border-t border-white/10 bg-black/20">
                        <div className="flex gap-4">
                            <Input
                                placeholder="Ask your coach anything..."
                                className="bg-black/40 border-white/10 h-12 rounded-xl"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <Button size="icon" className="h-12 w-12 bg-primary text-black hover:bg-primary/90 rounded-xl" onClick={sendMessage}>
                                <Send size={20} />
                            </Button>
                        </div>
                    </div>
                </Card>

                {/* Sidebar suggestions */}
                <div className="hidden lg:flex flex-col w-80 gap-6">
                    <Card className="bg-white/5 border-white/10">
                        <CardContent className="p-6 space-y-4">
                            <h3 className="font-bold flex items-center gap-2">
                                <Zap size={18} className="text-primary" />
                                Quick Actions
                            </h3>
                            <div className="space-y-2">
                                {SUGGESTIONS.map((s) => (
                                    <button
                                        key={s}
                                        className="w-full text-left text-sm p-3 rounded-xl bg-white/5 border border-white/5 hover:border-primary/50 transition-colors"
                                        onClick={() => setInput(s)}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

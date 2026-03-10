'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Dumbbell, Target, Shield, Mail } from 'lucide-react';

export default function ProfilePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black tracking-tight">PROFILE</h1>
                <Badge className="bg-primary text-black hover:bg-primary">PLATINUM MEMBER</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-white/5 border-white/10 flex flex-col items-center p-8 text-center">
                    <div className="w-32 h-32 rounded-3xl bg-primary/20 border-2 border-primary/50 flex items-center justify-center mb-4">
                        <User size={64} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">John Doe</h2>
                    <p className="text-muted-foreground mb-6">Active since March 2026</p>
                    <Button variant="outline" className="w-full rounded-xl border-white/10">Edit Profile</Button>
                </Card>

                <Card className="md:col-span-2 bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle>Physical Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Height</p>
                            <p className="text-xl font-bold">185 cm</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Current Weight</p>
                            <p className="text-xl font-bold text-primary">83.2 kg</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Body Type</p>
                            <p className="text-xl font-bold italic">Mesomorph</p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Primary Goal</p>
                            <p className="text-xl font-bold">Muscle Gain</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-white/5 border-white/10">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Target className="text-primary" /> Achievements
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex gap-4 overflow-x-auto pb-4">
                    {[
                        { name: 'Consistent', icon: Zap, color: 'bg-yellow-500/10 text-yellow-500' },
                        { name: 'Strength King', icon: Dumbbell, color: 'bg-primary/10 text-primary' },
                        { name: 'Data Driven', icon: Shield, color: 'bg-blue-500/10 text-blue-500' }
                    ].map((a) => (
                        <div key={a.name} className={`flex flex-col items-center gap-2 p-6 rounded-2xl border min-w-[140px] ${a.color} border-current/20`}>
                            <a.icon size={32} />
                            <span className="text-sm font-bold">{a.name}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}

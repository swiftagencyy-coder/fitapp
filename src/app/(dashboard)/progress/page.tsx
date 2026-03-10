'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, Scale, Zap, History } from 'lucide-react';

const weightData = [
    { date: 'Jan 1', weight: 85.5 },
    { date: 'Jan 8', weight: 84.8 },
    { date: 'Jan 15', weight: 84.2 },
    { date: 'Jan 22', weight: 84.5 },
    { date: 'Jan 29', weight: 83.9 },
    { date: 'Feb 5', weight: 83.2 },
];

const volumeData = [
    { date: 'Mon', volume: 8000 },
    { date: 'Tue', volume: 12000 },
    { date: 'Wed', volume: 0 },
    { date: 'Thu', volume: 15000 },
    { date: 'Fri', volume: 11000 },
    { date: 'Sat', volume: 9000 },
    { date: 'Sun', volume: 0 },
];

export default function ProgressPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight">PROGRESS LOGS</h1>
                <p className="text-muted-foreground">Detailed analytics of your physical transformation.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weight Trend */}
                <Card className="bg-white/5 border-white/10">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Scale className="text-primary" /> Body Weight (kg)
                        </CardTitle>
                        <span className="text-green-500 font-bold">-2.3kg this month</span>
                    </CardHeader>
                    <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={weightData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                                    itemStyle={{ color: '#CCFF00' }}
                                />
                                <Line type="monotone" dataKey="weight" stroke="#CCFF00" strokeWidth={3} dot={{ fill: '#CCFF00', r: 4 }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Volume Trend */}
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="text-primary" /> Training Volume (Weekly)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={volumeData}>
                                <defs>
                                    <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#CCFF00" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px' }}
                                />
                                <Area type="monotone" dataKey="volume" stroke="#CCFF00" fillOpacity={1} fill="url(#colorVol)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white/5 border-white/10 p-6">
                    <History className="text-primary mb-2" />
                    <h3 className="font-bold">Total Workouts</h3>
                    <p className="text-3xl font-black">142</p>
                </Card>
                <Card className="bg-white/5 border-white/10 p-6">
                    <Zap className="text-primary mb-2" />
                    <h3 className="font-bold">Total Sets</h3>
                    <p className="text-3xl font-black">1,890</p>
                </Card>
                <Card className="bg-white/5 border-white/10 p-6">
                    <TrendingUp className="text-green-500 mb-2" />
                    <h3 className="font-bold">Strength Score</h3>
                    <p className="text-3xl font-black">+14%</p>
                </Card>
            </div>
        </div>
    );
}

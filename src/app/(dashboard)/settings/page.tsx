'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Bell, Lock, Globe, Moon } from 'lucide-react';

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-black tracking-tight">SETTINGS</h1>
                <p className="text-muted-foreground">Manage your account preferences and integration.</p>
            </div>

            <div className="space-y-6">
                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-lg">Account Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Dark Mode</Label>
                                <p className="text-sm text-muted-foreground">Keep the interface in dark theme.</p>
                            </div>
                            <Button variant="outline" className="rounded-xl border-white/10" disabled>Always On</Button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label className="text-base">Training Units</Label>
                                <p className="text-sm text-muted-foreground">Metric (kg/cm) vs Imperial (lb/in).</p>
                            </div>
                            <Button variant="outline" className="rounded-xl border-white/10">Switch to Imperial</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                        <CardTitle className="text-lg">Security</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Button variant="outline" className="w-full justify-start gap-3 rounded-xl border-white/10">
                            <Lock size={18} /> Change Password
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-3 rounded-xl border-white/10">
                            <Shield size={18} /> Privacy Settings
                        </Button>
                    </CardContent>
                </Card>

                <Button variant="destructive" className="w-full rounded-xl h-12">Log Out</Button>
            </div>
        </div>
    );
}

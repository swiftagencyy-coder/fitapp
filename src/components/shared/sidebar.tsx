'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Dumbbell,
    LayoutDashboard,
    LineChart,
    MessageSquare,
    User,
    Settings,
    Menu,
    X,
    TrendingUp,
    Zap,
    Activity,
    Shield,
    Brain
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Training Plan', href: '/workout', icon: Dumbbell },
    { name: 'Performance', href: '/progress', icon: LineChart },
    { name: 'AI Architect', href: '/coach', icon: MessageSquare },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-6 left-6 z-50 p-4 glass-dark rounded-2xl text-primary border-primary/20 shadow-2xl active:scale-95 transition-all"
            >
                <Menu size={20} />
            </button>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-80 h-screen sticky top-0 bg-background/50 backdrop-blur-3xl border-r border-white/5 p-10">
                <div className="flex items-center gap-4 mb-16 px-2">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_30px_-5px_oklch(0.85_0.2_100/0.4)]">
                        <Dumbbell className="text-primary-foreground" size={24} strokeWidth={3} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-tighter leading-none uppercase">
                            FIT <span className="text-primary italic">TWIN</span>
                        </h1>
                        <div className="flex items-center gap-2 mt-1.5">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                            <p className="text-[9px] uppercase tracking-[0.3em] font-black text-white/40">Neural Link Active</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-12 flex-1">
                    <section>
                        <p className="px-5 text-[10px] uppercase font-black tracking-[0.3em] text-white/30 mb-6">Execution Units</p>
                        <nav className="space-y-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-4 px-5 py-4 rounded-3xl transition-all duration-500 group relative overflow-hidden",
                                            isActive
                                                ? "glass border-primary/20 text-white font-black shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)]"
                                                : "text-white/50 hover:bg-white/5 hover:text-white"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="sidebar-active-bg"
                                                className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-transparent opacity-50"
                                            />
                                        )}
                                        <item.icon size={18} className={cn(
                                            "transition-all duration-500 group-hover:scale-110 group-hover:rotate-6",
                                            isActive ? "text-primary drop-shadow-[0_0_8px_rgba(204,255,0,0.5)]" : "group-hover:text-primary"
                                        )} strokeWidth={isActive ? 2.5 : 2} />
                                        <span className="text-[13px] uppercase tracking-widest leading-none relative z-10">{item.name}</span>
                                        {isActive && (
                                            <div className="absolute right-6 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_rgba(204,255,0,0.8)]" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </section>

                    <section>
                        <p className="px-5 text-[10px] uppercase font-black tracking-[0.3em] text-white/30 mb-6">User Matrix</p>
                        <nav className="space-y-2">
                            <Link
                                href="/profile"
                                className={cn(
                                    "flex items-center gap-4 px-5 py-4 rounded-3xl transition-all duration-500 group",
                                    pathname === '/profile' ? "glass border-white/10 text-white font-black" : "text-white/50 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <User size={18} className="group-hover:text-primary transition-all duration-500 group-hover:scale-110" />
                                <span className="text-[13px] uppercase tracking-widest leading-none">Identity Core</span>
                            </Link>
                            <Link
                                href="/settings"
                                className={cn(
                                    "flex items-center gap-4 px-5 py-4 rounded-3xl transition-all duration-500 group",
                                    pathname === '/settings' ? "glass border-white/10 text-white font-black" : "text-white/50 hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <Settings size={18} className="group-hover:text-primary transition-all duration-500 group-hover:scale-110" />
                                <span className="text-[13px] uppercase tracking-widest leading-none">System Config</span>
                            </Link>
                        </nav>
                    </section>
                </div>

                <div className="mt-8">
                    <div className="p-6 glass-dark rounded-[2rem] border border-white/5 relative overflow-hidden group hover:border-primary/20 transition-all duration-700">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-700" />
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                                <Activity className="text-primary" size={14} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Biometric Sync: 98%</span>
                        </div>
                        <p className="text-[11px] text-white/50 leading-relaxed font-bold uppercase tracking-wider">
                            Critical recovery phase detected. <span className="text-white italic">Protocol Alpha</span> optimized for current fatigue markers.
                        </p>
                    </div>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-background/95 backdrop-blur-xl z-[60] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%', skewX: 5 }}
                            animate={{ x: 0, skewX: 0 }}
                            exit={{ x: '-100%', skewX: -5 }}
                            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-[85%] max-w-md bg-background/50 border-r border-white/5 z-[70] p-10 lg:hidden flex flex-col"
                        >
                            <div className="flex items-center justify-between mb-16">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl">
                                        <Dumbbell className="text-primary-foreground" size={24} strokeWidth={3} />
                                    </div>
                                    <span className="text-2xl font-black italic tracking-tighter uppercase leading-none">FIT TWIN</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-4 glass rounded-[1.5rem] text-white/50 active:scale-95 transition-all">
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="flex-1 space-y-3">
                                <p className="px-5 text-[10px] uppercase font-black tracking-[0.3em] text-white/30 mb-4">Navigation</p>
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-5 px-6 py-5 rounded-[2rem] transition-all",
                                            pathname === item.href
                                                ? "glass border-primary/20 text-white font-black shadow-2xl"
                                                : "text-white/40 bg-white/5"
                                        )}
                                    >
                                        <item.icon size={20} className={pathname === item.href ? "text-primary" : ""} />
                                        <span className="text-sm uppercase tracking-widest leading-none">{item.name}</span>
                                    </Link>
                                ))}
                                <div className="pt-8 mt-8 border-t border-white/5 space-y-3">
                                    <p className="px-5 text-[10px] uppercase font-black tracking-[0.3em] text-white/30 mb-4">Operations</p>
                                    <Link
                                        href="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-5 px-6 py-5 rounded-[2rem] text-white/40 bg-white/5"
                                    >
                                        <User size={20} />
                                        <span className="text-sm uppercase tracking-widest leading-none">Identity Matrix</span>
                                    </Link>
                                    <Link
                                        href="/settings"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-5 px-6 py-5 rounded-[2rem] text-white/40 bg-white/5"
                                    >
                                        <Settings size={20} />
                                        <span className="text-sm uppercase tracking-widest leading-none">Settings</span>
                                    </Link>
                                </div>
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

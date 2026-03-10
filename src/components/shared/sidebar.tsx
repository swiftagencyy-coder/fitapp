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
    X
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Workout Plan', href: '/workout', icon: Dumbbell },
    { name: 'Progress', href: '/progress', icon: LineChart },
    { name: 'AI Coach', href: '/coach', icon: MessageSquare },
    { name: 'Profile', href: '/profile', icon: User },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-secondary rounded-lg text-primary"
            >
                <Menu size={24} />
            </button>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-card border-r border-border p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-10">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                        <Dumbbell className="text-background" size={24} />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-foreground">
                        FIT <span className="text-primary">TWIN</span>
                    </h1>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-primary text-background font-medium shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                )}
                            >
                                <item.icon size={20} className={cn(isActive ? "text-background" : "text-muted-foreground group-hover:text-primary")} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                <div className="pt-6 border-t border-border mt-auto">
                    <Link
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Settings size={20} />
                        Settings
                    </Link>
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
                            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 left-0 bottom-0 w-3/4 max-w-sm bg-card z-[70] p-6 lg:hidden"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-3">
                                    <Dumbbell className="text-primary" size={24} />
                                    <span className="text-xl font-bold">FIT TWIN</span>
                                </div>
                                <button onClick={() => setIsOpen(false)} className="p-2 text-muted-foreground">
                                    <X size={24} />
                                </button>
                            </div>

                            <nav className="space-y-2">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-4 rounded-xl",
                                            pathname === item.href ? "bg-primary text-background" : "text-muted-foreground bg-secondary/50"
                                        )}
                                    >
                                        <item.icon size={20} />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

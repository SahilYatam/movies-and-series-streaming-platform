"use client";

import Link from "next/link";
import {
  Clapperboard,
  Compass,
  History,
  ListVideo,
  Sparkles,
} from "lucide-react";
import { usePathname } from "next/navigation";

const navItems = [
    {
        href: "/",
        label: "Home",
        icon: Compass
    },

    {
        href: "/history",
        label: "History",
        icon: History
    },

    {
        href: "/watchlist",
        label: "Watchlist",
        icon: ListVideo
    },
]

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="fixed inset-y-0 left-0 z-40 flex w-16 flex-col items-center gap-2 border-r border-border bg-surface py-4 md:w-56 md:items-stretch md:px-3">
            {/* Logo */}
            <Link 
                href="/"
                className="mb-4 flex items-center gap-2 px-2 py-1"
            >
                <Clapperboard className="size-6 text-primary" />

                <span className="hidden font-display text-2xl tracking-wide md:inline">
                    Sora
                </span>
            </Link>

            {/* Navigation */}
            {navItems.map((item) => {
                const active = item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                
                const Icon = item.icon;

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                        active
                            ? "bg-primary/15 text-primary"
                            : "text-muted-foreground hover:bg-surface-2 hover:text-foreground"
                        }`}
                    >
                        <Icon className="size-5 shrink-0" />
                        
                        <span className="hidden md:inline">
                            {item.label}
                        </span>
                    </Link>
                )
            })}

            {/* Promo */}
            <div className="mt-auto hidden rounded-xl border border-border bg-surface-2 p-3 md:block">
                <Sparkles className="mb-2 size-4 text-primary" />

                <p className="text-xs text-muted-foreground">
                    Your next favorite story is waiting.
                </p>
            </div>

        </aside>
    )

}


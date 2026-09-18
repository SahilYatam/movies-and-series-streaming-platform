"use client";

import Link from "next/link";
import { authClient } from "@/lib/betterAuth/auth-client";
import { useState } from "react";

export default function ProfileNav() {
    const [showMenu, setShowMenu] = useState(false)

    const {
        data: session,
        isPending,
        error
    } = authClient.useSession()


    console.log("Session:", session);
    console.log("Pending:", isPending);
    console.log("Session error:", error);

    if (isPending) {
        return null
    }

    if (!session) {
        return (
            <Link
                href="/sign-in"
                className="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 transition-colors hover:bg-surface"
            >
                <span className="hidden text-sm sm:inline">
                    Sign in
                </span>
            </Link>
        );
    }

    const name = session.user.name;
    const initial = name?.charAt(0).toUpperCase() || "U";

    const handleLogout = async () => {
        await authClient.signOut();
        setShowMenu(false)
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => setShowMenu((prev) => !prev)}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 transition-colors hover:bg-surface"
                aria-expanded={showMenu}
                aria-haspopup="menu"
            >
                <span className="grid size-7 place-items-center rounded-full bg-primary font-medium text-primary-foreground">
                    {initial}
                </span>

                <span className="hidden text-sm sm:inline">
                    {name}
                </span>
            </button>

            {showMenu && (
                <div
                    className="absolute right-0 top-full z-50 mt-2 w-32 rounded-lg border border-border bg-card p-1 shadow-lg"
                    role="menu"
                >
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full bg-red-500 cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors font-bold hover:bg-red-600"
                        role="menuitem"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
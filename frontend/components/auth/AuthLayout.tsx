import { Clapperboard } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export function AuthLayout({
    title,
    subtitle,
    children,
    footer,
}: {
    title: string,
    subtitle: string,
    children: ReactNode,
    footer: ReactNode,
}) {
    return (
        <div className="grid min-h-screen w-full lg:grid-cols-2">
            <div className="relative hidden overflow-hidden bg-surface lg:block">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.75_0.17_62/0.28),transparent_60%)]" />
                <div className="relative flex h-full flex-col justify-between p-12">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Clapperboard className="flex items-center gap-2"/>
                        <span className="font-display text-3xl tracking-widest">
                            Sora
                        </span>
                    </Link>

                    <div>
                        <h2 className="max-w-sm text-5xl leading-tight">
                            Discover your next obsession.
                        </h2>
                        <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                            Track what you watch, build watchlists and pick up right where you left off — across all your devices.
                        </p>
                    </div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                        One place · Endless stories
                    </p>
                </div>
            </div>
            
            <div className="flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-sm">
                    <Link href="/" className="font-semibold mt-8 flex items-center gap-2 lg:hidden mb-5">
                        <Clapperboard className="size-6 text-primary"/>
                        <span className="font-display text-2xl tracking-wide ">Sora</span>
                    </Link>
                    <h1 className="font-bold text-4xl">{title}</h1>
                    <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
                    <div className="mt-8">{children}</div>
                    <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>
                </div>
            </div>

        </div>
    )
}


export function Divider() {
  return (
    <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-muted-foreground">
      <span className="h-px flex-1 bg-border" />
      or
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

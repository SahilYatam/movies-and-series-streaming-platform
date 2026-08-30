"use client";

import { History as HistoryIcon, Play } from "lucide-react";
import { titles, posterStyle } from "@/lib/types";
import { timeAgo, useLibrary } from "@/lib/library";
import Link from "next/link";

export default function HistoryPage() {
    const { entries, clearHistory } = useLibrary();

    const rows = entries
        .filter((e) => e.status !== "planning")
        .map((e) => ({
            entry: e, title: titles.find(
                (t) => t.id === e.id)
        }))
        .filter((r): r is { entry: (typeof entries)[number]; title: NonNullable<typeof r.title> } =>
            Boolean(r.title),
        );


    return (
        <div className="mx-auto max-w-5xl space-y-6 px-6 py-8 md:px-10">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl">Watch history</h1>
                    <p className="text-sm text-muted-foreground">Pick up exactly where you stopped.</p>
                </div>
                {rows.length > 0 && (
                    <button
                        type="button"
                        onClick={clearHistory}
                        className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-destructive"
                    >
                        Clear history
                    </button>
                )}
            </div>

            {rows.length === 0 ? (
                <div className="grid place-items-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
                    <HistoryIcon className="size-8 text-muted-foreground" />
                    <p className="text-muted-foreground">Nothing watched yet. Start with a trending title.</p>
                    <Link href="/" className="text-sm font-medium text-primary">
                        Browse home
                    </Link>
                </div>
            ) : (
                <ul className="space-y-3">
                    {rows.map(({ entry, title }) => (
                        <li key={entry.id}>
                            <Link
                                href={
                                    title.kind === "movie"
                                        ? `/watch/movie/${title.id}`
                                        : `/watch/tv/${title.id}/${entry.season}/${entry.episode}`
                                }
                                className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-3 transition-colors hover:bg-surface-2"
                            >
                                <span
                                    className="grid h-20 w-32 shrink-0 place-items-center rounded-xl"
                                    style={posterStyle(title)}
                                >
                                    <Play className="size-6 fill-current text-foreground/80" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="flex flex-wrap items-center gap-2">
                                        <span className="truncate font-medium">{title.title}</span>
                                        <span className="text-xs uppercase tracking-wider text-muted-foreground">
                                            {title.kind} · {title.year}
                                        </span>
                                    </span>
                                    <span className="mt-2 block h-1.5 w-full rounded-full bg-surface-2">
                                        <span
                                            className="block h-full rounded-full bg-primary"
                                            style={{ width: `${entry.progress}%` }}
                                        />
                                    </span>
                                    <span className="mt-1.5 block text-xs text-muted-foreground">
                                        {entry.progress >= 98 ? "Finished" : `${entry.progress}% watched`} ·{" "}
                                        {timeAgo(entry.updatedAt)}
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

}


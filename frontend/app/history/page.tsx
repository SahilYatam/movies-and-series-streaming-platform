"use client";

import { History as HistoryIcon, Play } from "lucide-react";
import Link from "next/link";

import {
    useClearWatchHistoryMutation,
    useGetAllWatchHistoryQuery,
} from "@/lib/services/watchHistoryApi";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const getPosterUrl = (path: string | null) => {
    if (!path) return "/placeholder-poster.jpg";

    return `${TMDB_IMAGE_BASE_URL}${path}`;
};

const getYear = (
    releaseDate: string | null,
    firstAirDate: string | null,
) => {
    const date = releaseDate ?? firstAirDate;

    if (!date) return "N/A";

    return new Date(date).getFullYear();
};

const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();

    const minutes = Math.floor(diff / (1000 * 60));

    if (minutes < 1) {
        return "Just now";
    }

    if (minutes < 60) {
        return `${minutes}m ago`;
    }

    const hours = Math.floor(minutes / 60);

    if (hours < 24) {
        return `${hours}h ago`;
    }

    const days = Math.floor(hours / 24);

    if (days < 30) {
        return `${days}d ago`;
    }

    const months = Math.floor(days / 30);

    if (months < 12) {
        return `${months}mo ago`;
    }

    return `${Math.floor(months / 12)}y ago`;
};

export default function HistoryPage() {
    const {
        data: history = [],
        isLoading,
        isFetching,
    } = useGetAllWatchHistoryQuery();

    const [clearWatchHistory, { isLoading: isClearing }] =
        useClearWatchHistoryMutation();

    if (isLoading) {
        return (
            <div className="mx-auto max-w-5xl px-6 py-8 md:px-10">
                <p className="text-sm text-muted-foreground">
                    Loading watch history...
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl space-y-6 px-6 py-8 md:px-10">
            <div className="flex items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl">Watch history</h1>

                    <p className="text-sm text-muted-foreground">
                        Pick up exactly where you stopped.
                    </p>
                </div>

                {history.length > 0 && (
                    <button
                        type="button"
                        disabled={isClearing}
                        onClick={() => clearWatchHistory()}
                        className="rounded-full cursor-pointer border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isClearing
                            ? "Clearing..."
                            : "Clear history"}
                    </button>
                )}
            </div>

            {history.length === 0 ? (
                <div className="grid place-items-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
                    <HistoryIcon className="size-8 text-muted-foreground" />

                    <p className="text-muted-foreground">
                        Nothing watched yet. Start with a trending title.
                    </p>

                    <Link
                        href="/"
                        className="text-sm font-medium text-primary"
                    >
                        Browse home
                    </Link>
                </div>
            ) : (
                <ul className="space-y-3">
                    {history.map((entry) => {
                        const title = entry.title;

                        const progress =
                            entry.duration && entry.duration > 0
                                ? Math.min(
                                    Math.max(
                                        ((entry.progress ?? 0) / entry.duration) * 100,
                                        0,
                                    ),
                                    100,
                                )
                                : 0;

                        const watchUrl =
                            title.kind === "movie"
                                ? `/watch/movie/${title.id}`
                                : entry.episode
                                    ? `/watch/tv/${title.id}/${entry.episode.season.seasonNumber}/${entry.episode.episodeNumber}`
                                    : `/watch/tv/${title.id}`;

                        return (
                            <li key={entry.id}>
                                <Link
                                    href={watchUrl}
                                    className="group flex items-center gap-4 rounded-2xl border border-border bg-surface p-3 transition-colors hover:bg-surface-2"
                                >
                                    <span
                                        className="h-20 w-32 shrink-0 rounded-xl bg-cover bg-center bg-no-repeat"
                                        style={{
                                            backgroundImage: `url("${getPosterUrl(title.posterPath)}")`,
                                        }}
                                    >
                                        <span className="grid h-full w-full place-items-center rounded-xl bg-black/20">
                                            <Play className="size-6 fill-current text-foreground/80" />
                                        </span>
                                    </span>

                                    <span className="min-w-0 flex-1">
                                        <span className="flex flex-wrap items-center gap-2">
                                            <span className="truncate font-medium">
                                                {title.title}
                                            </span>

                                            <span className="text-xs uppercase tracking-wider text-muted-foreground">
                                                {title.kind} ·{" "}
                                                {getYear(
                                                    title.releaseDate,
                                                    title.firstAirDate,
                                                )}
                                            </span>

                                            {title.kind === "tv" &&
                                                entry.episode && (
                                                    <span className="text-xs text-muted-foreground">
                                                        S
                                                        {
                                                            entry.episode
                                                                .season
                                                                .seasonNumber
                                                        }{" "}
                                                        E
                                                        {
                                                            entry.episode
                                                                .episodeNumber
                                                        }
                                                    </span>
                                                )}
                                        </span>

                                        <span className="mt-2 block h-1.5 w-full rounded-full bg-surface-2">
                                            <span
                                                className="block h-full rounded-full bg-primary"
                                                style={{
                                                    width: `${progress}%`,
                                                }}
                                            />
                                        </span>

                                        <span className="mt-1.5 block text-xs text-muted-foreground">
                                            {progress >= 98
                                                ? "Finished"
                                                : `${Math.round(progress)}% watched`}{" "}
                                            · {timeAgo(entry.lastWatchedAt)}
                                        </span>
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}

            {isFetching && !isLoading && (
                <p className="text-xs text-muted-foreground">
                    Updating history...
                </p>
            )}
        </div>
    );
}
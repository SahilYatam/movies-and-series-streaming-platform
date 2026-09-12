import Link from "next/link";
import Image from "next/image";
import { Play, Star } from "lucide-react";

import { WatchlistMenu } from "./WatchlistMenu";

import type { HomeTitle } from "@/lib/services/homeApi";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const getPosterUrl = (path: string | null) => {
    if (!path) {
        return "/placeholder-poster.jpg";
    }

    return `${TMDB_IMAGE_BASE_URL}${path}`;
};

const getYear = (
    releaseDate: string | null,
    firstAirDate: string | null,
) => {
    const date = releaseDate ?? firstAirDate;

    if (!date) {
        return "N/A";
    }

    return new Date(date).getFullYear();
};

export function TitleCard({
    title,
    progress,
}: {
    title: HomeTitle;
    progress?: number;
}) {
    // TV titles route through /watch/tv/[id], which resolves the real
    // season/episode to land on (server-side) and redirects there.
    const href =
        title.kind === "movie"
            ? `/watch/movie/${title.id}`
            : `/watch/tv/${title.id}`;

    return (
        <div className="group relative w-[168px] shrink-0">
            <Link
                href={href}
                className="block overflow-hidden rounded-xl border border-border/60"
            >
                <div className="relative aspect-2/3 overflow-hidden">
                    <Image
                        src={getPosterUrl(title.posterPath)}
                        alt={title.title}
                        fill
                        sizes="168px"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />

                    <div className="absolute inset-0 bg-background/10 opacity-0 transition-opacity group-hover:opacity-100" />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 pt-10">
                        <span className="relative block font-display text-xl leading-tight text-foreground">
                            {title.title}
                        </span>

                        <span className="relative text-[11px] uppercase tracking-widest text-foreground/70">
                            {title.kind} ·{" "}
                            {getYear(
                                title.releaseDate,
                                title.firstAirDate,
                            )}
                        </span>
                    </div>

                    <span className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-background/70 px-2 py-0.5 text-[11px] text-primary">
                        <Star className="size-3 fill-current" />
                        {title.rating?.toFixed(1) ?? "N/A"}
                    </span>

                    <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                        <span className="grid size-11 place-items-center rounded-full bg-primary text-primary-foreground">
                            <Play className="size-5 fill-current" />
                        </span>
                    </span>
                </div>

                {progress !== undefined && (
                    <div className="h-1 w-full bg-surface-2">
                        <div
                            className="h-full bg-primary"
                            style={{
                                width: `${Math.min(progress, 100)}%`,
                            }}
                        />
                    </div>
                )}
            </Link>

            <div className="absolute left-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                <WatchlistMenu id={title.id.toString()} compact />
            </div>
        </div>
    );
}

export function TitleRow({
    heading,
    items,
    progressFor,
}: {
    heading: string;
    items: HomeTitle[];
    progressFor?: (id: number) => number | undefined;
}) {
    if (items.length === 0) {
        return null;
    }

    return (
        <section className="space-y-3">
            <h2 className="text-2xl">{heading}</h2>

            <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
                {items.map((title) => (
                    <TitleCard
                        key={title.id}
                        title={title}
                        progress={progressFor?.(title.id)}
                    />
                ))}
            </div>
        </section>
    );
}
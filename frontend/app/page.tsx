"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Info, Play, Star } from "lucide-react";

import { useGetHomeQuery } from "@/lib/services/homeApi";
import { TitleRow } from "@/components/TitleCard";
import { WatchlistMenu } from "@/components/WatchlistMenu";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const getImageUrl = (path: string | null) => {
    if (!path) {
        return "/placeholder-backdrop.jpg";
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

export default function Home() {
    const {
        data: home,
        isLoading,
        isError,
    } = useGetHomeQuery();

    const [active, setActive] = useState(0);

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                Failed to load home page.
            </div>
        );
    }

    if (!home) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                No home page data available.
            </div>
        );
    }

    const hero = home?.trending[active] ?? home?.trending[0];

    if (!hero) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                No trending titles available.
            </div>
        );
    }

    return (
        <div className="pb-16">
            {/* Hero Section */}
            <section className="relative">
                <Image
                    src={getImageUrl(hero.backdropPath)}
                    alt={`${hero.title} key art`}
                    width={1920}
                    height={1080}
                    className="h-[62vh] min-h-[420px] w-full object-cover"
                />

                <div className="hero-fade absolute inset-0" />

                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end gap-5 px-6 pb-8 md:px-10 md:pb-12">
                    <div className="max-w-2xl space-y-4">
                        {/* Trending Badge */}
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary">
                            #{active + 1} trending today
                        </span>

                        {/* Title */}
                        <h1 className="text-5xl font-extrabold md:text-7xl">
                            {hero.title}
                        </h1>

                        {/* Metadata */}
                        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1 text-primary">
                                <Star className="size-4 fill-current" />
                                {hero.rating?.toFixed(1) ?? "N/A"}
                            </span>

                            <span>
                                {getYear(
                                    hero.releaseDate,
                                    hero.firstAirDate,
                                )}
                            </span>

                            <span className="uppercase tracking-wider">
                                {hero.kind}
                            </span>
                        </div>

                        {/* Description */}
                        <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                            {hero.overview ?? "No description available."}
                        </p>

                        {/* Actions */}
                        <div className="flex flex-wrap items-center gap-3 pt-1">
                            <Link
                                href={`/watch/${hero.id}`}
                                className="glow inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
                            >
                                <Play className="size-4 fill-current" />
                                Play now
                            </Link>

                            <WatchlistMenu id={hero.id.toString()} />

                            <Link
                                href={`/watch/${hero.id}`}
                                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <Info className="size-4" />
                                More info
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Sections */}
            <div className="space-y-10 px-6 pt-8 md:px-10">
                {/* Top 10 Trending */}
                <section className="space-y-3">
                    <h2 className="text-2xl">
                        Top 10 trending
                    </h2>

                    <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
                        {home?.trending.map((title, index) => (
                            <button
                                key={title.id}
                                type="button"
                                onClick={() => setActive(index)}
                                onMouseEnter={() => setActive(index)}
                                className={`flex shrink-0 items-end gap-1 rounded-xl border px-3 py-3 text-left transition-colors ${index === active
                                    ? "border-primary bg-primary/10"
                                    : "border-border bg-surface hover:bg-surface-2"
                                    }`}
                            >
                                <span className="font-display text-5xl leading-none text-primary">
                                    {index + 1}
                                </span>

                                <span className="w-32">
                                    <span className="block truncate text-sm font-medium">
                                        {title.title}
                                    </span>

                                    <span className="block text-xs uppercase tracking-wider text-muted-foreground">
                                        {title.kind} ·{" "}
                                        {getYear(
                                            title.releaseDate,
                                            title.firstAirDate,
                                        )}
                                    </span>
                                </span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Trending */}
                {/* <TitleRow
                    heading="Trending"
                    items={home?.trending}
                /> */}

                {/* Popular Movies */}
                <TitleRow
                    heading="Popular Movies"
                    items={home?.popularMovies}
                />

                {/* Popular TV */}
                <TitleRow
                    heading="Series to Watch"
                    items={home?.popularTv}
                />

                {/* Top Rated Movies */}
                <TitleRow
                    heading="Highly Rated Movies"
                    items={home?.topRatedMovies}
                />

                {/* Top Rated TV */}
                <TitleRow
                    heading="Highly Rated Series"
                    items={home.topRatedTv}
                />
            </div>
        </div>
    );
}
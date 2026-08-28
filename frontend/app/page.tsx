"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Info, Play, Star } from "lucide-react";

import { titles, trending } from "@/lib/types";
import { useLibrary } from "@/lib/library";
import { TitleRow } from "@/components/TitleCard";
import { WatchlistMenu } from "@/components/WatchlistMenu";

export default function Home() {
  const [active, setActive] = useState(0);

  const { entries, get } = useLibrary();

  const hero = trending[active]!;

  const continueWatching = entries
    .filter((entry) => entry.status === "watching")
    .map((entry) => titles.find((title) => title.id === entry.id))
    .filter(
      (title): title is NonNullable<typeof title> => Boolean(title)
    );

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="relative">
        <Image
          src={hero.backdrop}
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
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-1 text-xs uppercase tracking-[0.2em] text-primary font-bold">
              #{active + 1} trending today
            </span>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-extrabold">
              {hero.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1 text-primary">
                <Star className="size-4 fill-current" />
                {hero.rating}
              </span>

              <span>{hero.year}</span>

              <span>{hero.duration}</span>

              <span className="uppercase tracking-wider">
                {hero.genres.join(" · ")}
              </span>
            </div>

            {/* Description */}
            <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              {hero.description}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Play */}
              <Link
                href={`/watch/${hero.id}`}
                className="glow inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                <Play className="size-4 fill-current" />
                Play now
              </Link>

              {/* Watchlist */}
              <WatchlistMenu id={hero.id} />

              {/* More Info */}
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
            {trending.map((title, index) => (
              <button
                key={title.id}
                type="button"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                className={`flex shrink-0 items-end gap-1 rounded-xl border px-3 py-3 text-left transition-colors ${
                  index === active
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
                    {title.kind} · {title.year}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Continue Watching */}
        <TitleRow
          heading="Continue watching"
          items={continueWatching}
          progressFor={(id) => get(id)?.progress}
        />

        {/* New Releases */}
        <TitleRow
          heading="New releases"
          items={titles.filter((title) => title.year >= 2025)}
        />

        {/* Series */}
        <TitleRow
          heading="Series to binge"
          items={titles.filter((title) => title.kind === "series")}
        />

        {/* Critically Acclaimed */}
        <TitleRow
          heading="Critically acclaimed"
          items={titles.filter((title) => title.rating >= 8.2)}
        />
      </div>
    </div>
  );
}
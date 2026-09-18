"use client";

import Link from "next/link";

type EpisodeNavigationProps = {
    seriesId: string;
    season: number;
    episode: number;
    totalEpisodes: number;
    totalSeasons: number;
}

export function EpisodeNavigation({
    seriesId,
    season,
    episode,
    totalEpisodes,
    totalSeasons,
}: EpisodeNavigationProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl">Episodes</h2>

                <select
                    defaultValue={season}
                    className="rounded-lg border border-border bg-surface px-3 py-2 text-sm cursor-pointer"
                >
                    {Array.from(
                        { length: totalSeasons },
                        (_, index) => {
                            const seasonNumber = index + 1;

                            return (
                                <option
                                    key={seasonNumber}
                                    value={seasonNumber}
                                    className="bg-black"
                                >
                                    Season {seasonNumber}
                                </option>
                            )
                        }
                    )}
                </select>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
                {Array.from(
                    { length: totalEpisodes },
                    (_, index) => {
                        const episodeNumber = index + 1;
                        const active =
                            episodeNumber === episode;

                        return (
                            <Link
                                key={episodeNumber}
                                href={`/watch/tv/${seriesId}/${season}/${episodeNumber}`}
                                className={`rounded-lg border px-4 py-3 transition-colors ${active
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border hover:bg-surface-2"
                                    }`}
                            >
                                <span className="text-sm font-medium">
                                    Episode {episodeNumber}
                                </span>
                            </Link>
                        );
                    },
                )}
            </div>
        </div>
    )
}


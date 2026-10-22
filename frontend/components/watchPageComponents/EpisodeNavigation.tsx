
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Season } from "@/lib/services/titleDetailsApi";

type EpisodeNavigationProps = {
    seriesId: string;
    season: number;
    episode: number;
    seasons: Season[];
};

export function EpisodeNavigation({
    seriesId,
    season,
    episode,
    seasons,
}: EpisodeNavigationProps) {
    const router = useRouter();

    const currentSeason = seasons.find(
        (item) => item.seasonNumber === season
    );

    function handleSeasonChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        const selectedSeasonNumber = Number(event.target.value);

        const selectedSeason = seasons.find(
            (item) => item.seasonNumber === selectedSeasonNumber
        );

        // Select the first available episode in the chosen season.
        const firstEpisode = selectedSeason?.episodes[0];

        if (!firstEpisode) return;

        router.push(
            `/watch/tv/${seriesId}/${selectedSeasonNumber}/${firstEpisode.episodeNumber}`
        );
    }

    if (!currentSeason) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl">Episodes</h2>

                <select
                    value={season}
                    onChange={handleSeasonChange}
                    className="cursor-pointer rounded-lg border border-border bg-surface px-3 py-2 text-sm"
                >
                    {seasons.map((item) => (
                        <option
                            key={item.id}
                            value={item.seasonNumber}
                            className="bg-black"
                        >
                            Season {item.seasonNumber}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-2 sm:grid-cols-2">
                {currentSeason.episodes.map((item) => {
                    const active = item.episodeNumber === episode;

                    return (
                        <Link
                            key={item.id}
                            href={`/watch/tv/${seriesId}/${season}/${item.episodeNumber}`}
                            className={`rounded-lg border px-4 py-3 transition-colors ${active
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border hover:bg-surface-2"
                                }`}
                        >
                            <span className="text-sm font-medium">
                                Episode {item.episodeNumber}
                                {item.name ? `: ${item.name}` : ""}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

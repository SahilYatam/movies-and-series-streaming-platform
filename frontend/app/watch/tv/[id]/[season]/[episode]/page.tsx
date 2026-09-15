"use client";

import { use } from "react";

import { MediaWatchPage } from "@/components/watchPageComponents/index";
import { useGetTitleDetailsQuery } from "@/lib/services/titleDetailsApi";

type PageProps = {
    params: Promise<{
        id: string;
        season: string;
        episode: string;
    }>;
};

export default function TVWatchPage({ params }: PageProps) {
    const { id, season, episode } = use(params);

    const {
        data: titleDetails,
        isLoading,
        isError,
    } = useGetTitleDetailsQuery(id);

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
                Failed to load title details.
            </div>
        );
    }

    if (!titleDetails) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                No title details data available.
            </div>
        );
    }

    const seasonNumber = Number(season);
    const episodeNumber = Number(episode);

    let totalSeasons: number | undefined;
    let totalEpisodes: number | undefined;
    let episodeId: number | undefined;

    if (titleDetails.kind === "tv") {
        totalSeasons = titleDetails.seasons.length;

        const currentSeason = titleDetails.seasons.find(
            (s) => s.seasonNumber === seasonNumber,
        );
        totalEpisodes = currentSeason?.episodes.length;

        const currentEpisode = currentSeason?.episodes.find(
            (e) => e.episodeNumber === episodeNumber,
        );

        episodeId = currentEpisode?.id;
    }

    console.log("[TV Watch Page] id:", id);
    console.log("[TV Watch Page] season:", season);
    console.log("[TV Watch Page] episode:", episode);

    return (
        <MediaWatchPage
            title={titleDetails}
            season={seasonNumber}
            episode={episodeNumber}
            episodeId={episodeId}
            totalSeasons={totalSeasons}
            totalEpisodes={totalEpisodes}
        />
    );
}
import { redirect, notFound } from "next/navigation";
import type { TitleDetailsResponse } from "@/lib/services/titleDetailsApi";

type PageProps = {
    params: Promise<{
        id: string;
    }>;
};

export default async function TvWatchRedirectPage({ params }: PageProps) {
    const { id } = await params;

    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
    const url = `${baseUrl}/title/${id}`;

    console.log("[tv redirect] fetching:", url);

    const response = await fetch(url, {
        credentials: "include",
        cache: "no-store",
    });

    console.log("[tv redirect] response status:", response.status);

    if (!response.ok) {
        console.log("[tv redirect] fetch not ok, calling notFound()");
        notFound();
    }

    const result: TitleDetailsResponse = await response.json();
    const title = result.data;

    console.log("[tv redirect] title kind:", title?.kind);

    if (!title || title.kind !== "tv") {
        console.log("[tv redirect] not a tv title, calling notFound()");
        notFound();
    }

    const firstSeason = [...title.seasons].sort(
        (a, b) => a.seasonNumber - b.seasonNumber,
    )[0];

    console.log("[tv redirect] firstSeason:", firstSeason?.seasonNumber);

    if (!firstSeason || firstSeason.episodes.length === 0) {
        console.log("[tv redirect] no seasons/episodes, calling notFound()");
        notFound();
    }

    const firstEpisode = [...firstSeason.episodes].sort(
        (a, b) => a.episodeNumber - b.episodeNumber,
    )[0];

    console.log(
        "[tv redirect] redirecting to season/episode:",
        firstSeason.seasonNumber,
        firstEpisode.episodeNumber,
    );

    redirect(
        `/watch/tv/${id}/${firstSeason.seasonNumber}/${firstEpisode.episodeNumber}`,
    );
}

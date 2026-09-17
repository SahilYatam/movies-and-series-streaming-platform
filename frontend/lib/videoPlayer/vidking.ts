import type { HomeTitle } from "@/lib/services/homeApi";

export function getVidkingUrl(
    title: HomeTitle,
    season?: number,
    episode?: number,
) {
    if (title.kind === "movie") {
        return `${process.env.NEXT_PUBLIC_VIDLINK_MOVIE_URL}/${title.tmdbId}`;
    }

    if (season === undefined || episode === undefined) {
        throw new Error("Season and episode are required for TV");
    }

    return `${process.env.NEXT_PUBLIC_VIDLINK_TV_URL}/${title.tmdbId}/${season}/${episode}?color=e50914&autoPlay=true&nextEpisode=true&episodeSelector=true`;
}

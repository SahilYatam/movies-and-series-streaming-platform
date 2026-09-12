"use client";

import { getVidkingUrl } from "@/lib/videoPlayer/vidking";
import type { HomeTitle } from "@/lib/services/homeApi";

type VideoPlayerProps = {
    title: HomeTitle;
    season?: number;
    episode?: number;
}

export function VideoPlayer({
    title,
    season,
    episode,
}: VideoPlayerProps) {
    const playerUrl = getVidkingUrl(
        title,
        season,
        episode
    )

    console.log("[video player] tmdbId:", title.tmdbId);
    console.log("[video player] season/episode:", season, episode);
    console.log("[video player] final iframe URL:", playerUrl);

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-black">
            <div
                className="aspect-video"
            >
                <iframe
                    src={playerUrl}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    className="size-full"
                />
            </div>
        </div>
    )
}



"use client";

import { getVidlinkUrl } from "@/lib/videoPlayer/provider";
import type { HomeTitle } from "@/lib/services/homeApi";
import { useUpsertWatchHistoryMutation } from "@/lib/services/watchHistoryApi";
import { useEffect, useRef } from "react";

type VideoPlayerProps = {
    title: HomeTitle;
    season?: number;
    episode?: number;
    episodeId?: number;
};

export function VideoPlayer({
    title,
    season,
    episode,
    episodeId,
}: VideoPlayerProps) {
    const [upsertWatchHistory] = useUpsertWatchHistoryMutation();

    const iframeRef = useRef<HTMLIFrameElement>(null);

    const playerUrl = getVidlinkUrl(title, season, episode);

    useEffect(() => {
        const handleMessage = async (event: MessageEvent) => {
            
            // Only accept messages from vidlink
            if (event.origin !== process.env.NEXT_PUBLIC_VIDLINK_URL) {
                return;
            }

            // Only accept messages from iframe
            if (
                iframeRef.current &&
                event.source !== iframeRef.current.contentWindow
            ) {
                return;
            }

            // Only handle vidlink media data
            if (event.data?.type !== "MEDIA_DATA") return;

            const mediaData = event.data.data;

            console.log("[VidLink MEDIA_DATA]", event.data);

            if (!mediaData) return;

            const currentMedia = mediaData[String(title.tmdbId)] ?? mediaData;

            let progress: number | undefined;
            let duration: number | undefined;

            // TV: use episode-specific progress
            if (
                title.kind === "tv" &&
                season !== undefined &&
                episode !== undefined
            ) {
                const episodeKey = `s${season}e${episode}`;

                const episodeProgress =
                    currentMedia.show_progress?.[episodeKey];

                progress = episodeProgress?.progress?.watched;
                duration = episodeProgress?.progress?.duration;
            }

            // Movie / fallback
            if (progress === undefined || duration === undefined) {
                progress = currentMedia.progress?.watched;
                duration = currentMedia.progress?.duration;
            }

            if (
                typeof progress !== "number" ||
                typeof duration !== "number" ||
                duration <= 0 ||
                progress < 0
            ) {
                return;
            }

            await upsertWatchHistory({
                titleId: title.id,
                episodeId,
                progress,
                duration,
            });
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [
        title.id,
        title.tmdbId,
        title.kind,
        season,
        episode,
        episodeId,
        upsertWatchHistory,
    ]);

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-black">
            <div className="aspect-video">
                <iframe
                    ref={iframeRef}
                    src={playerUrl}
                    width="100%"
                    height="100%"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

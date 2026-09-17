"use client";

import { getVidkingUrl } from "@/lib/videoPlayer/vidking";
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

    const playerUrl = getVidkingUrl(title, season, episode);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Only accept messages coming from iframe
            if (
                iframeRef.current &&
                event.source !== iframeRef.current.contentWindow
            ) {
                return;
            }

            if (typeof event.data !== "string") return;

            let message;

            try {
                message = JSON.parse(event.data);
            } catch {
                return;
            }

            if (message?.type !== "PLAYER_EVENT") {
                return;
            }

            const {
                event: playerEvent,
                currentTime,
                duration,
            } = message.data ?? {};

            if (
                typeof currentTime !== "number" ||
                typeof duration !== "number" ||
                duration <= 0
            ) {
                return;
            }

            // Save progress when the player is paused or finished.
            if (playerEvent === "pause" || playerEvent === "ended") {
                upsertWatchHistory({
                    titleId: title.id,
                    episodeId,
                    progress: currentTime,
                    duration,
                });
            }
        };

        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [title.id, episodeId, upsertWatchHistory]);

    console.log("[video player] tmdbId:", title.tmdbId);
    console.log("[video player] season/episode:", season, episode);
    console.log("[video player] final iframe URL:", playerUrl);

    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-black">
            <div className="aspect-video">
                {/* <iframe
                    ref={iframeRef}
                    src={playerUrl}
                    width="100%"
                    height="100%"
                    allowFullScreen
                    className="size-full"
                /> */}

                <iframe
                    src={playerUrl}
                    width="100%"
                    height="100%"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

"use client";

import { Play } from "lucide-react";

import type { Title } from "@/lib/types";
import { posterStyle } from "@/lib/types";

import { VidoeControls } from "./VideoControls";
import Image from "next/image";

type VideoPlayerProps = {
    title: Title;
    progress: number;
    playing: boolean;
    onPlayingChange:(playing: boolean) => void;
    onProgressChange:(progress: number) => void;
}

export function VideoPlayer({
    title,
    progress,
    playing,
    onPlayingChange,
    onProgressChange
}: VideoPlayerProps) {
    return (
        <div className="overflow-hidden rounded-2xl border border-border bg-black">
            <div
                className="relative aspect-video"
                style={posterStyle(title)}
            >
                <Image 
                    src={title.backdrop} 
                    alt="" 
                    width={1920}
                    height={1080}
                    className="size-full object-cover opacity-70"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

                {!playing && (
                    <button
                        type="button"
                        onClick={() => onPlayingChange(true)}
                        aria-label="Play"
                        className="absolute inset-0 grid place-items-center"
                    >
                        <span className="glow grid size-20 place-items-center rounded-full bg-primary text-primary-foreground">
                        <Play className="size-8 fill-current" />
                        </span>
                    </button>
                )}

                <VidoeControls
                    progress={progress}
                    playing={playing}
                    duration={title.duration}
                    onPlayingChange={onPlayingChange}
                    onProgressChange={onProgressChange}
                />

            </div>
        </div>
    )
}



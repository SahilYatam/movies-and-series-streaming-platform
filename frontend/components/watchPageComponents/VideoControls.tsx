"use client";

import {
  Maximize2,
  Pause,
  Play,
  Volume2,
} from "lucide-react";
import React from "react";

type VideoControlsProps = {
    progress: number;
    playing: boolean;
    duration: string;
    onPlayingChange:(playing: boolean) => void;
    onProgressChange:(progress: number) => void;
}

export function VidoeControls({
    progress,
    playing,
    duration,
    onPlayingChange,
    onProgressChange
}: VideoControlsProps){
    function handleSeedk(e: React.MouseEvent<HTMLDivElement>){
        const rect = e.currentTarget.getBoundingClientRect();

        const percentage = ((e.clientX - rect.left) / rect.width) * 100;

        const value = Math.max(0, Math.min(100, percentage));

        onProgressChange(value);
    }

    return (
        <div className="absolute inset-x-0 bottom-0 space-y-2 p-4">
            <div
                className="h-1.5 w-full cursor-pointer rounded-full bg-foreground/20"
                onClick={handleSeedk}
            >
                <div 
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex items-center gap-4 text-foreground">
                <button
                    type="button"
                    onClick={() => onPlayingChange(!playing)}
                    aria-label={playing ? "Pause" : "Play"}
                >
                    {playing ? (
                        <Pause className="size-5"/>
                    ) : (
                        <Play className="size-5 fill-current"/>
                    )}
                </button>

                <Volume2 className="size-5"/>

                <span className="text-x text-muted-foreground">
                    {Math.round(progress)}% watched · {duration}
                </span>

                <Maximize2 className="ml-auto size-5" />

            </div>
        </div>
    )

}
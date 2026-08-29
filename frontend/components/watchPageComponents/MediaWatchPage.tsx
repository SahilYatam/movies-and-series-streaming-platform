/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import type { Title } from "@/lib/types";
import { suggestionsFor } from "@/lib/types";
import { useLibrary } from "@/lib/library";

import { 
    VideoPlayer, 
    TitleInfo, 
    MovieDetails,
    EpisodeNavigation 
} from "./index";

import { TitleRow } from "../TitleCard";
import { useEffect, useState } from "react";

type MediaWatchPageProps = {
    title: Title;
    season?: number;
    episode?: number;
}

export function MediaWatchPage({
    title,
    season,
    episode
}: MediaWatchPageProps){
    const { get, recordProgress } = useLibrary()

    const isTv = season !== undefined && episode !== undefined;

    const storedProgress = get(title.id)?.progress ?? 0;

    const [progress, setProgress] = useState(storedProgress)
    const [playing, setPlaying] = useState(true)

    const suggestions = suggestionsFor(title.id);

    useEffect(() => {
        setProgress(get(title.id)?.progress ?? 0);
        setPlaying(true)        
    }, [title.id, get]);

    useEffect(() => {
        if(!playing) return;

        const interval = window.setInterval(() => {
            setProgress((current) => {
                const next = Math.min(100, current + 0.5);
                
                recordProgress(title.id, next)

                return next;
            })
        }, 1200);

        return () => {
            window.clearInterval(interval);
        }
    },[playing, title.id, recordProgress])

    function handleProgressChange(value: number){
        setProgress(value)
        recordProgress(title.id, value)
    }

    return (
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 md:px-8">

            <VideoPlayer
                title={title}
                progress={progress}
                playing={playing}
                onPlayingChange={setPlaying}
                onProgressChange={handleProgressChange}
            />

            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                <div className="space-y-5">
                    <TitleInfo title={title}/>

                    {isTv && (
                        <EpisodeNavigation 
                            seriesId={title.id}
                            season={season}
                            episode={episode}
                        />
                    )}
                </div>
                
                <MovieDetails title={title}/>
            </div>
            
            <TitleRow
                heading="Suggested for you"
                items={suggestions}
            />
        </div>
    )

}



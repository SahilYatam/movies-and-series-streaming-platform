/* eslint-disable react-hooks/set-state-in-effect */
import {
    VideoPlayer,
    TitleInfo,
    MovieDetails,
    EpisodeNavigation,
} from "./index";

// import { TitleRow } from "../TitleCard";
import type { TitleDetails } from "@/lib/services/titleDetailsApi";

type MediaWatchPageProps = {
    title: TitleDetails;
    season?: number;
    episode?: number;
    totalEpisodes?: number;
    totalSeasons?: number;
};

export function MediaWatchPage({
    title,
    season,
    episode,
    totalEpisodes,
    totalSeasons,
}: MediaWatchPageProps) {
    const isTv =
        title.kind === "tv" &&
        season !== undefined &&
        episode !== undefined &&
        totalEpisodes !== undefined &&
        totalSeasons !== undefined;

    return (
        <div className="mx-auto max-w-6xl space-y-8 px-4 py-6 md:px-8">
            <VideoPlayer title={title} season={season} episode={episode} />

            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                <div className="space-y-5">
                    <TitleInfo title={title} />

                    {isTv && (
                        <EpisodeNavigation
                            seriesId={title.id.toString()}
                            season={season}
                            episode={episode}
                            totalEpisodes={totalEpisodes}
                            totalSeasons={totalSeasons}
                        />
                    )}
                </div>

                <MovieDetails title={title} />
            </div>

            {/* For now removing suggestions, later when i add the suggestion API then implement this again */}
            {/* <TitleRow
                heading="Suggested for you"
                items={suggestions}
            /> */}
        </div>
    );
}
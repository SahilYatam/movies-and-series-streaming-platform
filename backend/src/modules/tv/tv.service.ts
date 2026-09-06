/**
 tv.service.ts is the orchestrator. It coordinates different modules.
 
 
                 tv.service
                     │
        ┌────────────┼─────────────┐
        ↓            ↓             ↓
   tmdbService   seasonRepo    episodeRepo
        │            │             │
        ↓            ↓             ↓
      TMDB        Season DB     Episode DB

*/

import { tmdbService } from "../tmdb/tmdb.service.js";
import { seasonRepo } from "../season/season.repository.js";
import { episodeRepo } from "../episode/episode.repository.js";

const syncTvSeasonsAndEpisodes = async (titleId: number, tmdbTvId: number) => {
    const tvDetails = await tmdbService.getTvSeriesDetails(String(tmdbTvId));

    for (const season of tvDetails.seasons) {
        // Skip TMDB specials
        if(season.season_number === 0){
            continue;
        }

        const savedSeason = await seasonRepo.upsertSeason({
            titleId,
            tmdbId: season.id,
            seasonNumber: season.season_number,
            name: season.name,
            overview: season.overview,
            posterPath: season.poster_path,
            airDate: season.air_date ? new Date(season.air_date) : null,
        });

        const seasonDetails = await tmdbService.getTvSeasonDetails(
            String(tmdbTvId),
            String(season.season_number),
        );

        await Promise.all(
            seasonDetails.episodes.map((episode) =>
                episodeRepo.upsertEpisode({
                    seasonId: savedSeason.id,
                    tmdbId: episode.id,
                    episodeNumber: episode.episode_number,
                    name: episode.name,
                    overview: episode.overview,
                    stillPath: episode.still_path,
                    airDate: episode.air_date
                        ? new Date(episode.air_date)
                        : null,
                }),
            ),
        );
    }
};

const ensureTvMetadata = async(
    titleId: number,
    tmdbTvId: number
) => {
    const season = await seasonRepo.getSeasonsByTitleId(titleId);

    if(season.length > 0){
        return;
    }
    await syncTvSeasonsAndEpisodes(titleId, tmdbTvId);
}

export const tvService = {
    syncTvSeasonsAndEpisodes,
    ensureTvMetadata
}

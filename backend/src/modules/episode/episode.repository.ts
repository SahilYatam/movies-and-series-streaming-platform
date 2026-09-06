import { prisma } from "../../config/prisma.js";

interface EpisodeProps {
    seasonId: number;
    tmdbId: number;
    episodeNumber: number;
    name: string;
    overview?: string | null;
    stillPath?: string | null;
    airDate?: Date | null;
}

const upsertEpisode = async(data: EpisodeProps) => {
    return prisma.episode.upsert({
        where: {
            seasonId_episodeNumber: {
                seasonId: data.seasonId,
                episodeNumber: data.episodeNumber,
            }
        },

        update: {
            tmdbId: data.tmdbId,
            name: data.name,
            overview: data.overview,
            stillPath: data.stillPath,
            airDate: data.airDate,
        },

        create: data
    })
}

const getEpisodesBySeasonId = async(seasonId: number) => {
    return prisma.episode.findMany({
        where: {
            seasonId
        },
        orderBy: {
            episodeNumber: "asc"
        }
    })
}

export const episodeRepo = {
    upsertEpisode,
    getEpisodesBySeasonId,
};

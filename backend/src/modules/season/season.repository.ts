import { prisma } from "../../config/prisma.js";

interface SeasonProps {
    titleId: number;
    tmdbId: number;
    seasonNumber: number;
    name?: string | null;
    overview?: string | null;
    posterPath?: string | null;
    airDate?: Date | null;
}

const upsertSeason = async(data: SeasonProps) => {
    return prisma.season.upsert({
        where: {
            titleId_seasonNumber: {
                titleId: data.titleId,
                seasonNumber: data.seasonNumber
            }
        },

        update: {
            tmdbId: data.tmdbId,
            name: data.name,
            overview: data.overview,
            posterPath: data.posterPath,
            airDate: data.airDate
        },

        create: data
    })
}

const getSeasonsByTitleId = async(titleId: number) => {
    return prisma.season.findMany({
        where: {
            titleId,
        },
        orderBy: {
            seasonNumber: "asc",
        }
    })
}

export const seasonRepo = {
    upsertSeason,
    getSeasonsByTitleId,
};

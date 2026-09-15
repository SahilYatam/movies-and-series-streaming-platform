import { prisma } from "../../config/prisma.js";

export interface WatchHistoryProps {
    userId: string;
    titleId: number;
    episodeId?: number;
    progress?: number;
    duration?: number;
}

const getUserAllWatchHistory = async (userId: string) => {
    return await prisma.watchHistory.findMany({
        where: {
            userId,
        },
        include: {
            title: true,
            episode: {
                include: {
                    season: true,
                },
            },
        },
        orderBy: {
            lastWatchedAt: "desc",
        },
    });
};

const getUserOneWatchHistory = async (userId: string, titleId: number) => {
    return await prisma.watchHistory.findMany({
        where: {
            userId,
            titleId,
        },
        orderBy: {
            lastWatchedAt: "desc",
        },
    });
};

const upsertWatchHistory = async ({
    userId,
    titleId,
    episodeId,
    progress,
    duration,
}: WatchHistoryProps) => {
    const existingHistory = await prisma.watchHistory.findFirst({
        where: {
            userId,
            titleId,
            episodeId: episodeId ?? null,
        },
    });

    if (existingHistory) {
        return await prisma.watchHistory.update({
            where: {
                id: existingHistory.id,
            },
            data: {
                progress,
                duration,
                lastWatchedAt: new Date(),
            },
        });
    }

    return await prisma.watchHistory.create({
        data: {
            userId,
            titleId,
            episodeId,
            progress,
            duration,
            lastWatchedAt: new Date(),
        },
    });
};

const clearWatchHistory = async (userId: string) => {
    return await prisma.watchHistory.deleteMany({
        where: {
            userId,
        },
    });
};

// const deleteOneWatchHistory = async (userId: string, titleId: number) => {
//     return await prisma.watchHistory.deleteMany({
//         where: {
//             userId,
//             titleId,
//         },
//     });
// };


export const watchHistoryRepo = {
    getUserAllWatchHistory,
    getUserOneWatchHistory,
    upsertWatchHistory,
    clearWatchHistory,
    // deleteOneWatchHistory,
};

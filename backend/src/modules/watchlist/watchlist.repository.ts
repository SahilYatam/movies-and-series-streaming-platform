import { prisma } from "../../config/prisma.js";
import { WatchStatus } from "../../generated/prisma/client.js";

export interface WatchlistProps {
    userId: string;
    titleId: number;
    status?: WatchStatus;
}

const getUserWatchlist = async(userId: string) => {
    return await prisma.watchlist.findMany({
        where: {
            userId
        },
        include: {
            title: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

const upsertWatchlist = async ({ userId, titleId, status }: WatchlistProps) => {
    return await prisma.watchlist.upsert({
        where: {
            userId_titleId: {
                userId,
                titleId,
            },
        },

        update: {
            ...(status !== undefined && {
                status
            })
        },

        create: {
            userId,
            titleId,
            status,
        },
    });
};

export interface DeleteWatchlistProps {
    userId: string;
    titleId: number;
}

const deleteWatchlistTitle = async ({
    userId,
    titleId,
}: DeleteWatchlistProps) => {
    return await prisma.watchlist.delete({
        where: {
            userId_titleId: {
                userId,
                titleId,
            },
        },
    });
};

export const watchlistRepo = {
    getUserWatchlist,
    upsertWatchlist,
    deleteWatchlistTitle,
};

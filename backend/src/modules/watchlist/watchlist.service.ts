import { ApiError } from "../../shared/index.js";

import {
    watchlistRepo,
    WatchlistProps,
    DeleteWatchlistProps,
} from "./watchlist.repository.js";

const getUserWatchlist = async (userId: string) => {
    if (!userId) {
        throw new ApiError(400, "userId is required to fetch watchlist");
    }

    return await watchlistRepo.getUserWatchlist(userId);
};

const upsertWatchlist = async ({ userId, titleId, status }: WatchlistProps) => {
    if (!userId || !titleId) {
        throw new ApiError(
            400,
            "userId and titleId are required to save watchlist",
        );
    }

    return await watchlistRepo.upsertWatchlist({
        userId,
        titleId,
        status,
    });
};

const deleteWatchlistTitle = async ({
    userId,
    titleId,
}: DeleteWatchlistProps) => {
    if (!userId || !titleId) {
        throw new ApiError(
            400,
            "userId and titleId are required to delete watchlist title",
        );
    }

    return await watchlistRepo.deleteWatchlistTitle({
        userId,
        titleId,
    });
};

export const watchlistService = {
    getUserWatchlist,
    upsertWatchlist,
    deleteWatchlistTitle,
};

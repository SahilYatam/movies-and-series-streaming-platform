import {
    WatchHistoryProps,
    watchHistoryRepo,
} from "./watchhistory.repository.js";

const getUserAllWatchHistory = async (userId: string) => {
    return await watchHistoryRepo.getUserAllWatchHistory(userId);
};

const getUserOneWatchHistory = async (
    userId: string,
    titleId: number,
) => {
    return await watchHistoryRepo.getUserOneWatchHistory(
        userId,
        titleId,
    );
};

const upsertWatchHistory = async (data: WatchHistoryProps) => {
    return await watchHistoryRepo.upsertWatchHistory(data);
};

const deleteOneWatchHistory = async (
    userId: string,
    titleId: number,
) => {
    return await watchHistoryRepo.deleteOneWatchHistory(
        userId,
        titleId,
    );
};

const clearWatchHistory = async (userId: string) => {
    return await watchHistoryRepo.clearWatchHistory(userId);
};

export const watchHistoryService = {
    getUserAllWatchHistory,
    getUserOneWatchHistory,
    upsertWatchHistory,
    deleteOneWatchHistory,
    clearWatchHistory,
};
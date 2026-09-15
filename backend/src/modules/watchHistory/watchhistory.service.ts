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

const clearWatchHistory = async (userId: string) => {
    return await watchHistoryRepo.clearWatchHistory(userId);
};

// const deleteOneWatchHistory = async (
//     userId: string,
//     titleId: number,
// ) => {
//     return await watchHistoryRepo.deleteOneWatchHistory(
//         userId,
//         titleId,
//     );
// };

export const watchHistoryService = {
    getUserAllWatchHistory,
    getUserOneWatchHistory,
    upsertWatchHistory,
    clearWatchHistory,
    // deleteOneWatchHistory,
};
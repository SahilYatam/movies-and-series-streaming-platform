import { Request, Response } from "express";
import { asyncHandler, ApiResponse, ApiError } from "../../shared/index.js";
import { watchHistoryService } from "./watchhistory.service.js";

const getUserAllWatchHistory = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.session?.user.id;

        if (!userId || typeof userId !== "string") {
            throw new ApiError(400, "userId is required");
        }

        const data = await watchHistoryService.getUserAllWatchHistory(userId);

        return res.json(
            new ApiResponse(
                200,
                data,
                "User watch history fetched successfully",
            ),
        );
    },
);

const getUserOneWatchHistory = asyncHandler(
    async (req: Request, res: Response) => {
        const userId = req.session?.user.id;
        const { titleId } = req.params;

        if (!userId || typeof userId !== "string") {
            throw new ApiError(400, "userId is required");
        }

        const parsedTitleId = Number(titleId);

        if (!Number.isInteger(parsedTitleId)) {
            throw new ApiError(400, "titleId must be a valid number");
        }

        const data = await watchHistoryService.getUserOneWatchHistory(
            userId,
            parsedTitleId,
        );

        return res.json(
            new ApiResponse(200, data, "Watch history fetched successfully"),
        );
    },
);

const upsertWatchHistory = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.session?.user.id;
    const { titleId } = req.params;
    const { episodeId, progress, duration } = req.body;

    if (!userId || typeof userId !== "string") {
        throw new ApiError(400, "userId is required");
    }

    const parsedTitleId = Number(titleId);

    if (!Number.isInteger(parsedTitleId)) {
        throw new ApiError(400, "titleId must be a valid number");
    }

    let parsedEpisodeId: number | undefined;

    if (episodeId !== undefined && episodeId !== null) {
        parsedEpisodeId = Number(episodeId);

        if (!Number.isInteger(parsedEpisodeId)) {
            throw new ApiError(400, "episodeId must be a valid number");
        }
    }

    const parsedProgress =
        progress !== undefined ? Number(progress) : undefined;

    const parsedDuration =
        duration !== undefined ? Number(duration) : undefined;

    if (
        parsedProgress !== undefined &&
        (!Number.isFinite(parsedProgress) || parsedProgress < 0)
    ) {
        throw new ApiError(400, "progress must be a valid non-negative number");
    }

    if (
        parsedDuration !== undefined &&
        (!Number.isFinite(parsedDuration) || parsedDuration <= 0)
    ) {
        throw new ApiError(400, "duration must be a valid positive number");
    }

    if (
        parsedProgress !== undefined &&
        parsedDuration !== undefined &&
        parsedProgress > parsedDuration
    ) {
        throw new ApiError(400, "progress cannot be greater than duration");
    }

    const data = await watchHistoryService.upsertWatchHistory({
        userId,
        titleId: parsedTitleId,
        episodeId: parsedEpisodeId,
        progress: parsedProgress,
        duration: parsedDuration,
    });

    return res.json(
        new ApiResponse(200, data, "Watch history saved successfully"),
    );
});


const clearWatchHistory = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.session?.user.id;

    if (!userId || typeof userId !== "string") {
        throw new ApiError(400, "userId is required");
    }

    const data = await watchHistoryService.clearWatchHistory(userId);

    return res.json(
        new ApiResponse(200, data, "Watch history cleared successfully"),
    );
});

// const deleteOneWatchHistory = asyncHandler(
//     async (req: Request, res: Response) => {
//         const userId = req.session?.user.id;
//         const { titleId } = req.params;

//         if (!userId || typeof userId !== "string") {
//             throw new ApiError(400, "userId is required");
//         }

//         const parsedTitleId = Number(titleId);

//         if (!Number.isInteger(parsedTitleId)) {
//             throw new ApiError(400, "titleId must be a valid number");
//         }

//         const data = await watchHistoryService.deleteOneWatchHistory(
//             userId,
//             parsedTitleId,
//         );

//         return res.json(
//             new ApiResponse(200, data, "Watch history deleted successfully"),
//         );
//     },
// );

export const watchHistoryController = {
    getUserAllWatchHistory,
    getUserOneWatchHistory,
    upsertWatchHistory,
    clearWatchHistory,
    // deleteOneWatchHistory,
};

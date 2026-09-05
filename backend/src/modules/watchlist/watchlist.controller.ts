import { Request, Response } from "express";
import { asyncHandler, ApiResponse, ApiError } from "../../shared/index.js";
import { watchlistService } from "./watchlist.service.js";
import { WatchStatus } from "../../generated/prisma/enums.js";

const getUserWatchlist = asyncHandler(async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (typeof userId !== "string") {
        throw new ApiError(400, "userId is required");
    }

    const data = await watchlistService.getUserWatchlist(userId);

    return res.json(
        new ApiResponse(200, data, "Watchlist fetched successfully"),
    );
});

const upsertWatchlist = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.session?.user.id;
    const { titleId } = req.params;
    const { status } = req.query;

    if (!userId || typeof userId !== "string") {
        throw new ApiError(400, "userId is required");
    }

    const parsedTitleId = Number(titleId);

    if (!Number.isInteger(parsedTitleId)) {
        throw new ApiError(400, "titleId must be a valid number");
    }

    let watchStatus: WatchStatus | undefined;

    if (status !== undefined) {
        if (
            typeof status !== "string" ||
            !Object.values(WatchStatus).includes(status as WatchStatus)
        ) {
            throw new ApiError(400, "Invalid watch status");
        }

        watchStatus = status as WatchStatus;
    }

    const data = await watchlistService.upsertWatchlist({
        userId,
        titleId: parsedTitleId,
        status: watchStatus,
    });

    return res.json(
        new ApiResponse(200, data, "Watchlist save successfully"),
    );
});

const deleteWatchlistTitle = asyncHandler(
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

        await watchlistService.deleteWatchlistTitle({
            userId,
            titleId: parsedTitleId,
        });

        return res.json(
            new ApiResponse(200, null, "Watchlist title deleted successfully"),
        );
    },
);

export const watchlistController = {
    getUserWatchlist,
    upsertWatchlist,
    deleteWatchlistTitle,
};

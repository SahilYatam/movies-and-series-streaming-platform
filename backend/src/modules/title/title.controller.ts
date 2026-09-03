import { Request, Response } from "express";
import { asyncHandler, ApiResponse, ApiError } from "../../shared/index.js";
import { titleService } from "./title.service.js";
import { TitleKind } from "../../generated/prisma/enums.js";

const getTitleById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    const title = await titleService.getTitleById(Number(id));

    return res.json(
        new ApiResponse(200, title, "Title fetched successfully by Id"),
    );
});

const getTitleByTmdbId = asyncHandler(async (req: Request, res: Response) => {
    const { tmdbId } = req.params;
    const { kind } = req.query;

    if (typeof kind !== "string") {
        throw new ApiError(400, "Kind is required.");
    }

    const title = await titleService.getTitleByTmdbId(
        Number(tmdbId),
        kind as TitleKind,
    );

    return res.json(
        new ApiResponse(200, title, "Title fetched successfully by tmdbId"),
    );
});

const upsert = asyncHandler(async (req: Request, res: Response) => {
    const { data } = req.body;

    const title = await titleService.upsertTitle(data);

    return res.json(new ApiResponse(200, title, "Title saved successfully"));
});

const searchTitles = asyncHandler(async (req: Request, res: Response) => {
    const { q } = req.query;

    if (typeof q !== "string" || !q.trim()) {
        throw new ApiError(400, "Search title is required.");
    }

    const titles = await titleService.searchTitles(q);

    return res.json(
        new ApiResponse(200, titles, "Titles searched successfully"),
    );
});

export const titleController = {
    getTitleById,
    getTitleByTmdbId,
    upsert,
    searchTitles,
};

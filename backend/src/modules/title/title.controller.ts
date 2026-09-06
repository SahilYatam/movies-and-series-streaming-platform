import { Request, Response } from "express";
import { titleService } from "./title.service.js";
import { asyncHandler, ApiResponse, ApiError } from "../../shared/index.js";

const getTitleDetails = asyncHandler(async (req: Request, res: Response) => {
    const titleId = Number(req.params.titleId);

    if (!Number.isInteger(titleId)) {
        throw new ApiError(400, "titleId must be a valid number");
    }

    const title = await titleService.getTitleDetails(titleId);

    return res.json(
        new ApiResponse(200, title, "Title details fetched successfully"),
    );
});

export const titleController = {
    getTitleDetails,
};

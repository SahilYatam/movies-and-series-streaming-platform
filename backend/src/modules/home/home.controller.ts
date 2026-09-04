import { Request, Response } from "express";
import { ApiError, ApiResponse } from "../../shared/index.js";
import { asyncHandler } from "../../shared/index.js";
import { homeService } from "./home.service.js";

const homePage = asyncHandler(async (req: Request, res: Response) => {
    const data = await homeService.homePage();

    return res.json(
        new ApiResponse(200, data, "Home page data fetched sucessfully"),
    );
});

const search = asyncHandler(async (req: Request, res: Response) => {
    const { q } = req.query;

    if (typeof q !== "string") {
        throw new ApiError(400, "Search title is required.");
    }

    const data = await homeService.search(q);

    return res.json(new ApiResponse(200, data, "Titles searched successfully"));
});

export const homeController = {
    homePage,
    search
};

import { Request, Response } from "express";

import { ApiResponse, asyncHandler } from "../shared/index.js";
import { tmdbService } from "../services/tmdb.service.js";

const getTrendingTitles = asyncHandler(
    async (req: Request, res: Response) => {
        const data = await tmdbService.getTrendingTitles();

        return res.json(
            new ApiResponse(
                200,
                data,
                "Trending titles fetched successfully"
            )
        );
    }
);

const getPopularMovies = asyncHandler(
    async (req: Request, res: Response) => {
        const data = await tmdbService.getPopularMovies();

        return res.json(
            new ApiResponse(
                200,
                data,
                "Popular movies fetched successfully"
            )
        );
    }
);

const getPopularTv = asyncHandler(
    async (req: Request, res: Response) => {
        const data = await tmdbService.getPopularTv();

        return res.json(
            new ApiResponse(
                200,
                data,
                "Popular TV series fetched successfully"
            )
        );
    }
);

const getTopRatedMovies = asyncHandler(
    async (req: Request, res: Response) => {
        const data = await tmdbService.getTopRatedMovies();

        return res.json(
            new ApiResponse(
                200,
                data,
                "Top rated movies fetched successfully"
            )
        );
    }
);

const getTopRatedTv = asyncHandler(
    async (req: Request, res: Response) => {
        const data = await tmdbService.getTopRatedTv();

        return res.json(
            new ApiResponse(
                200,
                data,
                "Top rated TV series fetched successfully"
            )
        );
    }
);

export const tmdbController = {
    getTrendingTitles,
    getPopularMovies,
    getPopularTv,
    getTopRatedMovies,
    getTopRatedTv,
};
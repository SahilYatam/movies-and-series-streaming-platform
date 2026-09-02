import { Request, Response } from "express";

import { ApiError, ApiResponse, asyncHandler } from "../../shared/index.js";
import { tmdbService } from "./tmdb.service.js";

const getTrendingTitles = asyncHandler(async (req: Request, res: Response) => {
    const data = await tmdbService.getTrendingTitles();

    return res.json(
        new ApiResponse(200, data, "Trending titles fetched successfully"),
    );
});

const getPopularMovies = asyncHandler(async (req: Request, res: Response) => {
    const data = await tmdbService.getPopularMovies();

    return res.json(
        new ApiResponse(200, data, "Popular movies fetched successfully"),
    );
});

const getPopularTv = asyncHandler(async (req: Request, res: Response) => {
    const data = await tmdbService.getPopularTv();

    return res.json(
        new ApiResponse(200, data, "Popular TV series fetched successfully"),
    );
});

const getTopRatedMovies = asyncHandler(async (req: Request, res: Response) => {
    const data = await tmdbService.getTopRatedMovies();

    return res.json(
        new ApiResponse(200, data, "Top rated movies fetched successfully"),
    );
});

const getTopRatedTv = asyncHandler(async (req: Request, res: Response) => {
    const data = await tmdbService.getTopRatedTv();

    return res.json(
        new ApiResponse(200, data, "Top rated TV series fetched successfully"),
    );
});

const searchTitles = asyncHandler(async (req: Request, res: Response) => {
    const { title } = req.query;

    if(typeof title !== "string" || !title.trim()){
        throw new ApiError(400, "Search title is required.");
    }

    const data = await tmdbService.searchTitles(title?.toString() || "");

    return res.json(
        new ApiResponse(200, data, "Searched titles fetched successfully"),
    );
});

const getMovieDetails = asyncHandler(async (req: Request, res: Response) => {
    const { movie_id } = req.params;
    const data = await tmdbService.getMovieDetails(movie_id.toString());

    return res.json(
        new ApiResponse(200, data, "Movie details fetched successfully"),
    );
});

const getTvSeriesDetails = asyncHandler(async (req: Request, res: Response) => {
    const { series_id } = req.params;
    const data = await tmdbService.getTvSeriesDetails(series_id.toString());

    return res.json(
        new ApiResponse(200, data, "Tv series details fetched successfully"),
    );
});

const getTvSeasonDetails = asyncHandler(async (req: Request, res: Response) => {
    const { series_id, season_number } = req.params;
    const data = await tmdbService.getTvSeasonDetails(
        series_id.toString(),
        season_number.toString(),
    );

    return res.json(
        new ApiResponse(
            200,
            data,
            "Tv series season details fetched successfully",
        ),
    );
});

const getTvEpisodeDetails = asyncHandler(
    async (req: Request, res: Response) => {
        const { series_id, season_number, episode_number } = req.params;
        const data = await tmdbService.getTvEpisodeDetails(
            series_id.toString(),
            season_number.toString(),
            episode_number.toString(),
        );

        return res.json(
            new ApiResponse(
                200,
                data,
                "Tv series season episode details fetched successfully",
            ),
        );
    },
);

export const tmdbController = {
    getTrendingTitles,
    getPopularMovies,
    getPopularTv,
    getTopRatedMovies,
    getTopRatedTv,
    searchTitles,
    getMovieDetails,
    getTvSeriesDetails,
    getTvSeasonDetails,
    getTvEpisodeDetails,
};

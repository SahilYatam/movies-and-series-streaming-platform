import { tmdbClient } from "./tmdb.client.js";
import {
    TmdbEpisodeDetails,
    TmdbPaginatedResponse,
    TmdbSeasonDetails,
    TmdbTitle,
    TmdbTvDetails,
} from "./tmdb.types.js";

const getTrendingTitles = async () => {
    const res =
        await tmdbClient.get<TmdbPaginatedResponse<TmdbTitle>>(
            "/trending/all/week",
        );

    return res.data.results.slice(0, 10);
};

const getPopularMovies = async () => {
    const res =
        await tmdbClient.get<TmdbPaginatedResponse<TmdbTitle>>(
            "/movie/popular",
        );

    return res.data.results;
};

const getPopularTv = async () => {
    const res =
        await tmdbClient.get<TmdbPaginatedResponse<TmdbTitle>>("/tv/popular");

    return res.data.results;
};

const getTopRatedMovies = async () => {
    const res =
        await tmdbClient.get<TmdbPaginatedResponse<TmdbTitle>>(
            "/movie/top_rated",
        );

    return res.data.results;
};

const getTopRatedTv = async () => {
    const res =
        await tmdbClient.get<TmdbPaginatedResponse<TmdbTitle>>("/tv/top_rated");

    return res.data.results;
};

const searchTitles = async (title: string) => {
    const res = await tmdbClient.get<TmdbPaginatedResponse<TmdbTitle>>(
        "/search/multi",
        {
            params: {
                query: title
            },
        },
    );

    return res.data.results;
};

const getMovieDetails = async (movie_id: string) => {
    const res = await tmdbClient.get<TmdbPaginatedResponse<TmdbTitle>>(
        `/movie/${movie_id}`,
    );

    return res.data;
};

const getTvSeriesDetails = async (series_id: string) => {
    const res = await tmdbClient.get<TmdbTvDetails>(`/tv/${series_id}`);

    return res.data;
};

const getTvSeasonDetails = async (series_id: string, season_number: string) => {
    const res = await tmdbClient.get<TmdbSeasonDetails>(
        `/tv/${series_id}/season/${season_number}`,
    );

    return res.data;
};

const getTvEpisodeDetails = async (
    series_id: string,
    season_number: string,
    episode_number: string,
) => {
    const res = await tmdbClient.get<TmdbEpisodeDetails>(
        `/tv/${series_id}/season/${season_number}/episode/${episode_number}`,
    );

    return res.data;
};

export const tmdbService = {
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

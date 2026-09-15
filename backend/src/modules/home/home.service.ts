import { redis } from "../../config/redis.js";
import { Prisma } from "../../generated/prisma/client.js";
import { titleService } from "../title/title.service.js";
import { normalizeTitle } from "../tmdb/tmdb.mapper.js";
import { tmdbService } from "../tmdb/tmdb.service.js";

const saveTitles = (titles: Prisma.TitleCreateInput[]) => {
    return Promise.all(titles.map((title) => titleService.upsertTitle(title)));
};

const homePage = async () => {
    const cacheKey = "home:page";

    // 1. Check redis
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
        return cachedData
    }

    // 2. Get all home page related titles from TMDB
    const [
        trendingTitles,
        popularMovies,
        popularTvSeries,
        topRatedMovies,
        topRatedTvSeries,
    ] = await Promise.all([
        tmdbService.getTrendingTitles(),
        tmdbService.getPopularMovies(),
        tmdbService.getPopularTv(),
        tmdbService.getTopRatedMovies(),
        tmdbService.getTopRatedTv(),
    ]);

    // 3. Convert TMDB data in application format
    const trendingData = trendingTitles.map((title) => normalizeTitle(title));
    const popularMoviesData = popularMovies.map((title) =>
        normalizeTitle(title, "movie"),
    );

    const popularTvData = popularTvSeries.map((title) =>
        normalizeTitle(title, "tv"),
    );

    const topRatedMoviesData = topRatedMovies.map((title) =>
        normalizeTitle(title, "movie"),
    );

    const topRatedTvData = topRatedTvSeries.map((title) =>
        normalizeTitle(title, "tv"),
    );

    // 4. Save the data into db
    const [
        trending,
        popularMoviesTitles,
        popularTvTitles,
        topRatedMoviesTitles,
        topRatedTvTitles,
    ] = await Promise.all([
        saveTitles(trendingData),
        saveTitles(popularMoviesData),
        saveTitles(popularTvData),
        saveTitles(topRatedMoviesData),
        saveTitles(topRatedTvData),
    ]);

    // 5. Build the exact same response
    const data = {
        trending,
        popularMovies: popularMoviesTitles,
        popularTv: popularTvTitles,
        topRatedMovies: topRatedMoviesTitles,
        topRatedTv: topRatedTvTitles,
    };

    // 6. Store in Redis
    await redis.set(
        cacheKey,
        data,
        { ex: 60 * 60 * 24 }, // 24 hours
    );

    return data;
};

const search = async (query: string) => {
    const q = query.trim();

    if (!q) {
        return [];
    }

    // 1. Search existing titles in DB
    const dbTitles = await titleService.searchTitles(q);

    // 2. Search TMDB for fresh/additional results
    const tmdbTitles = await tmdbService.searchTitles(q);

    // 3. Keep only movies and TV shows
    const filteredTitles = tmdbTitles.filter(
        (title) => title.media_type === "movie" || title.media_type === "tv",
    );

    // 4. Normalize + save TMDB results
    const savedTitles = await Promise.all(
        filteredTitles.map((title) =>
            titleService.upsertTitle(normalizeTitle(title)),
        ),
    );

    // 5. Merge without duplicate DB titles
    const existingIds = new Set(
        dbTitles.map((title) => `${title.tmdbId}-${title.kind}`),
    );

    const newTitles = savedTitles.filter(
        (title) => !existingIds.has(`${title.tmdbId}-${title.kind}`),
    );

    return [...dbTitles, ...newTitles];
};
export const homeService = {
    homePage,
    search,
};

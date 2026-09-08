import { redis } from "../../config/redis.js";
import { titleService } from "../title/title.service.js";
import { normalizeTitle } from "../tmdb/tmdb.mapper.js";
import { tmdbService } from "../tmdb/tmdb.service.js";

const homePage = async () => {
    const cacheKey = "home:page";

    // 1. Check redis
    const cachedData = await redis.get(cacheKey);

    if(cachedData) {
        return JSON.parse(cachedData);
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
    const trendingData = trendingTitles.map((title) =>
        normalizeTitle(title)
    );
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
        Promise.all(
            trendingData.map((title) => titleService.upsertTitle(title)),
        ),

        Promise.all(
            popularMoviesData.map((title) => titleService.upsertTitle(title)),
        ),

        Promise.all(
            popularTvData.map((title) => titleService.upsertTitle(title)),
        ),

        Promise.all(
            topRatedMoviesData.map((title) => titleService.upsertTitle(title)),
        ),

        Promise.all(
            topRatedTvData.map((title) => titleService.upsertTitle(title)),
        ),
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
        JSON.stringify(data),
        {EX: 60 * 60} // 1 hour
    )
    
    return data
};

const search = async (query: string) => {
    query.trim();
    // 1. First search the title in db
    const dbTitles = await titleService.searchTitles(query);

    if (dbTitles.length > 0) return dbTitles;

    // 2. If not found in db then search TMDB
    const tmdbTitles = await tmdbService.searchTitles(query);

    // 3. Convert TMDB data into application format
    const titles = tmdbTitles.map((title) => normalizeTitle(title));

    // 4. Store TMDB results in db
    const savedTitles = await Promise.all(
        titles.map((t) => titleService.upsertTitle(t)),
    );

    return savedTitles;
};

export const homeService = {
    homePage,
    search,
};

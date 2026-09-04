import { Prisma } from "../../generated/prisma/client.js";
import { titleService } from "../title/title.service.js";
import { normalizeTitle } from "../tmdb/tmdb.mapper.js";
import { tmdbService } from "../tmdb/tmdb.service.js";
import { TmdbPaginatedResponse } from "../tmdb/tmdb.types.js";

const homePage = async () => {
    // 1. Get all home page related titles from TMDB
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

    // 2. Convert TMDB data in application format
    const trendingData = trendingTitles.map(normalizeTitle);
    const popularMoviesData = popularMovies.map(normalizeTitle);
    const popularTvData = popularTvSeries.map(normalizeTitle);
    const topRatedMoviesData = topRatedMovies.map(normalizeTitle);
    const topRatedTvData = topRatedTvSeries.map(normalizeTitle);


    // 3. Save the data into db
    const [
        trending,
        popularMoviesTitles,
        popularTvTitles,
        topRatedMoviesTitles,
        topRatedTvTitles,
    ] = await Promise.all([
        Promise.all(
            trendingData.map((title: Prisma.TitleCreateInput) => titleService.upsertTitle(title))
        ),

        Promise.all(
            popularMoviesData.map((title: Prisma.TitleCreateInput) => titleService.upsertTitle(title))
        ),
        
        Promise.all(
            popularTvData.map((title: Prisma.TitleCreateInput) => titleService.upsertTitle(title))
        ),

        Promise.all(
            topRatedMoviesData.map((title:  Prisma.TitleCreateInput) => titleService.upsertTitle(title))
        ),

        Promise.all(
            topRatedTvData.map((title:  Prisma.TitleCreateInput) => titleService.upsertTitle(title))
        ),
    ]);

    // 4. Return
    return {
        trending,
        popularMovies: popularMoviesTitles,
        popularTv: popularTvTitles,
        topRatedMovies: topRatedMoviesTitles,
        topRatedTv: topRatedTvTitles,
    };
};

const search = async(query: string) => {
    query.trim();
    // 1. First search the title in db
    const dbTitles = await titleService.searchTitles(query);

    if(dbTitles.length > 0) return dbTitles;

    // 2. If not found in db then search TMDB
    const tmdbTitles = await tmdbService.searchTitles(query);

    // 3. Convert TMDB data into application format
    const titles = tmdbTitles.map(normalizeTitle);

    // 4. Store TMDB results in db 
    const savedTitles = await Promise.all(
        titles.map((t: Prisma.TitleCreateInput) =>  titleService.upsertTitle(t))
    )

    return savedTitles;
}

export const homeService = {
    homePage,
    search
}

import { tmdbClient } from "./tmdb.client.js";


const getTrendingTitles = async () => {
    const res = await tmdbClient.get("/trending/all/week")
    
    return res.data.results.slice(0, 10);
}

const getPopularMovies = async () => {
    const res = await tmdbClient.get("/movie/popular");

    return res.data.results;
};

const getPopularTv = async() => {
    const res = await tmdbClient.get("/tv/popular");

    return res.data.results;
}

const getTopRatedMovies = async() => {
    const res = await tmdbClient.get("/movie/top_rated");

    return res.data.results;
}

const getTopRatedTv = async() => {
    const res = await tmdbClient.get("/tv/top_rated");

    return res.data.results;
}



export const tmdbService = {
    getTrendingTitles,
    getPopularMovies,
    getPopularTv,
    getTopRatedMovies,
    getTopRatedTv
}
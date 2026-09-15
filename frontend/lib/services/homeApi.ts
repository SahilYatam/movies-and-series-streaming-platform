import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface HomeTitle {
    id: number;
    tmdbId: number;
    kind: "movie" | "tv";
    title: string;
    originalTitle: string | null;
    overview: string | null;
    posterPath: string | null;
    backdropPath: string | null;
    originalLanguage: string | null;
    releaseDate: string | null;
    firstAirDate: string | null;
    rating: number | null;
    adult: boolean;
}

interface HomeResponse {
    statusCode: number;
    data: {
        trending: HomeTitle[];
        popularMovies: HomeTitle[];
        popularTv: HomeTitle[];
        topRatedMovies: HomeTitle[];
        topRatedTv: HomeTitle[];
    };
    message: string;
    success: boolean;
}

export interface SearchTitle {
    id: number;
    tmdbId: number;
    kind: "movie" | "tv";
    title: string;
    posterPath: string | null;
    releaseDate: string | null;
    firstAirDate: string | null;
    rating: number | null;
}

interface SearchResponse {
    statusCode: number;
    data: SearchTitle[];
    message: string;
    success: boolean;
}
console.log("API URL:", process.env.NEXT_PUBLIC_API_URL ? true : false)
export const homeApi = createApi({
    reducerPath: "homeApi",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: "include",
    }),

    endpoints: (builder) => ({
        getHome: builder.query<HomeResponse["data"], void>({
            query: () => "/home",
            transformResponse: (response: HomeResponse) => response.data,
        }),

        searchTitles: builder.query<SearchTitle[], string>({
            query: (query) => ({
                url: "/home/search",
                params: {
                    q: query,
                },
            }),
            transformResponse: (response: SearchResponse) => response.data,
        }),
    }),
});

export const { useGetHomeQuery, useSearchTitlesQuery } = homeApi;

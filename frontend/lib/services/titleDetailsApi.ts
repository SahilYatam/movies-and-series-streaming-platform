import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Episode {
    id: number;
    seasonId: number;
    tmdbId: number;
    episodeNumber: number;
    name: string;
    overview: string | null;
    stillPath: string | null;
    airDate: string | null;
}

export interface Season {
    id: number;
    titleId: number;
    tmdbId: number;
    seasonNumber: number;
    name: string | null;
    overview: string | null;
    posterPath: string | null;
    airDate: string | null;
    episodes: Episode[];
}

interface BaseTitleDetails {
    id: number;
    tmdbId: number;
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
    createdAt: string;
    updatedAt: string;
}

export interface MovieDetails extends BaseTitleDetails {
    kind: "movie";
}

export interface TvDetails extends BaseTitleDetails {
    kind: "tv";
    seasons: Season[];
}

export type TitleDetails = MovieDetails | TvDetails;

export interface TitleDetailsResponse {
    statusCode: number;
    data: TitleDetails;
    message: string;
    success: boolean;
}

export const titleDetailsApi = createApi({
    reducerPath: "titleDetailsApi",

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, ""),
        credentials: "include",
    }),

    endpoints: (builder) => ({
        getTitleDetails: builder.query<TitleDetailsResponse["data"], string>({
            query: (id) => `/title/${id}`,

            transformResponse: (response: TitleDetailsResponse) =>
                response.data,
        }),
    }),
});
export const { useGetTitleDetailsQuery } = titleDetailsApi;

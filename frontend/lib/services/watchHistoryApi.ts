import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { HomeTitle } from "./homeApi";

export interface WatchHistoryEpisode {
    id: number;
    episodeNumber: number;
    season: {
        id: number;
        seasonNumber: number;
    };
}

export interface WatchHistoryItem {
    id: number;
    userId: string;
    titleId: number;
    episodeId: number | null;
    progress: number | null;
    duration: number | null;
    lastWatchedAt: string;
    title: HomeTitle;
    episode: WatchHistoryEpisode | null;
}

interface WatchHistoryListResponse {
    statusCode: number;
    data: WatchHistoryItem[];
    message: string;
    success: boolean;
}

interface WatchHistoryResponse {
    statusCode: number;
    data: WatchHistoryItem;
    message: string;
    success: boolean;
}

export interface UpsertWatchHistoryRequest {
    titleId: number;
    episodeId?: number;
    progress?: number;
    duration?: number;
}

export const watchHistoryApi = createApi({
    reducerPath: "watchHistoryApi",

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: "include",
    }),

    tagTypes: ["WatchHistory"],

    endpoints: (builder) => ({
        getAllWatchHistory: builder.query<WatchHistoryItem[], void>({
            query: () => "/watchHistory/all",

            transformResponse: (
                response: WatchHistoryListResponse,
            ) => response.data,

            providesTags: ["WatchHistory"],
        }),

        getWatchHistoryByTitle: builder.query<
            WatchHistoryItem[],
            number
        >({
            query: (titleId) => `/watchHistory/${titleId}`,

            transformResponse: (
                response: WatchHistoryListResponse,
            ) => response.data,

            providesTags: ["WatchHistory"],
        }),

        upsertWatchHistory: builder.mutation<
            WatchHistoryItem,
            UpsertWatchHistoryRequest
        >({
            query: ({
                titleId,
                episodeId,
                progress,
                duration,
            }) => ({
                url: `/watchHistory/${titleId}`,
                method: "PUT",
                body: {
                    episodeId,
                    progress,
                    duration,
                },
            }),

            transformResponse: (
                response: WatchHistoryResponse,
            ) => response.data,

            invalidatesTags: ["WatchHistory"],
        }),

        clearWatchHistory: builder.mutation<void, void>({
            query: () => ({
                url: "/watchHistory",
                method: "DELETE",
            }),

            invalidatesTags: ["WatchHistory"],
        }),
    }),
});

export const {
    useGetAllWatchHistoryQuery,
    useGetWatchHistoryByTitleQuery,
    useUpsertWatchHistoryMutation,
    useClearWatchHistoryMutation,
} = watchHistoryApi;
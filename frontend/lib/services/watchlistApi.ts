import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { HomeTitle } from "./homeApi";

export type WatchlistStatus = "planning" | "watching" | "completed";

export interface WatchlistEntry {
    id: number;
    userId: string;
    titleId: number;
    status: WatchlistStatus | null;
    title: HomeTitle;
    createdAt: string;
}

export interface WatchlistResponse {
    statusCode: number;
    data: WatchlistEntry[];
    message: string;
    success: boolean;
}

export const watchlistApi = createApi({
    reducerPath: "watchlistApi",

    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_URL,
        credentials: "include",
    }),

    tagTypes: ["Watchlist"],

    endpoints: (builder) => ({
        getUserWatchlist: builder.query<WatchlistEntry[], void>({
            query: () => "/watchlist",

            transformResponse: (response: WatchlistResponse) => response.data,

            providesTags: ["Watchlist"],
        }),

        upsertWatchlist: builder.mutation<
            WatchlistEntry,
            {
                titleId: number;
                status: WatchlistStatus;
            }
        >({
            query: ({ titleId, status }) => ({
                url: `/watchlist/${titleId}?status=${status}`,
                method: "PUT",
            }),

            invalidatesTags: ["Watchlist"],
        }),

        deleteWatchlistTitle: builder.mutation<null, number>({
            query: (titleId) => ({
                url: `/watchlist/${titleId}`,
                method: "DELETE",
            }),

            transformResponse: (response: {
                statusCode: number;
                data: null;
                message: string;
                success: boolean;
            }) => response.data,

            invalidatesTags: ["Watchlist"],
        }),
    }),
});

export const {
    useGetUserWatchlistQuery,
    useUpsertWatchlistMutation,
    useDeleteWatchlistTitleMutation,
} = watchlistApi;

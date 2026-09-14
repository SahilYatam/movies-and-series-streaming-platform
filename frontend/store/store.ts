import { configureStore } from "@reduxjs/toolkit";
import { homeApi } from "../lib/services/homeApi";
import { titleDetailsApi } from "@/lib/services/titleDetailsApi";
import { watchlistApi } from "@/lib/services/watchlistApi";

export const store = configureStore({
    reducer: {
        [homeApi.reducerPath]: homeApi.reducer,
        [titleDetailsApi.reducerPath]: titleDetailsApi.reducer,
        [watchlistApi.reducerPath]: watchlistApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(homeApi.middleware)
        .concat(titleDetailsApi.middleware)
        .concat(watchlistApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

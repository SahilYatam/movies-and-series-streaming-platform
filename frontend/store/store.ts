import { configureStore } from "@reduxjs/toolkit";
import { homeApi } from "../lib/services/homeApi";
import { titleDetailsApi } from "@/lib/services/titleDetailsApi";

export const store = configureStore({
    reducer: {
        [homeApi.reducerPath]: homeApi.reducer,
        [titleDetailsApi.reducerPath]: titleDetailsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
        .concat(homeApi.middleware)
        .concat(titleDetailsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

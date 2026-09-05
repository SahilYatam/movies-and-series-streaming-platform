export interface TmdbPaginatedResponse<T>{
    page: number;
    results: T[];
    total_pages: number;
    total_results: number;
}

export interface TmdbTitle {
    id: number;
    media_type: "movie" | "tv";
    title?: string;
    name?: string;
    original_title?: string;
    original_name?: string;
    overview: string | null;
    poster_path: string | null;
    backdrop_path: string | null;
    original_language: string;
    vote_average: number;
    adult: boolean;
}
export interface TmdbPaginatedResponse<T> {
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

export interface TmdbTvSeasonSummary {
    id: number;

    name: string;
    overview: string | null;

    poster_path: string | null;

    air_date: string | null;

    season_number: number;
    episode_count: number;
}

export interface TmdbTvDetails {
    id: number;

    name: string;
    original_name: string;

    overview: string | null;

    poster_path: string | null;
    backdrop_path: string | null;

    original_language: string;

    first_air_date: string | null;

    vote_average: number;

    adult: boolean;

    seasons: TmdbTvSeasonSummary[];
}

export interface TmdbSeasonDetails {
    id: number;

    name: string;
    overview: string | null;

    poster_path: string | null;

    air_date: string | null;

    season_number: number;

    episodes: TmdbEpisode[];
}

export interface TmdbEpisode {
    id: number;

    name: string;
    overview: string | null;

    episode_number: number;
    season_number: number;

    still_path: string | null;

    air_date: string | null;

    vote_average: number;
}

export interface TmdbEpisodeDetails extends TmdbEpisode {
    production_code: string | null;
}
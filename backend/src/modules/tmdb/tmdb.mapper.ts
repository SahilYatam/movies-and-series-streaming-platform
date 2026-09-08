import { Prisma } from "../../generated/prisma/client.js";


interface TmdbTitle {
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
// This function convert TMDB's data into application format
export function normalizeTitle(data: TmdbTitle, kind?: "movie" | "tv",): Prisma.TitleCreateInput {
    const title = data.title ?? data.name;

    const titleKind =
        kind ??
        (data.media_type === "movie" ? "movie" : "tv");

    if(!title){
        throw new Error(`TMDB title ${data.id} has no title/name`);
    }

    return {
        tmdbId: data.id,
        kind:titleKind,
        title,
        originalTitle: data.original_title ?? data.original_name,
        overview: data.overview,
        posterPath: data.poster_path,
        backdropPath: data.backdrop_path,
        originalLanguage: data.original_language,
        rating: data.vote_average,
        adult: data.adult,
    };
}
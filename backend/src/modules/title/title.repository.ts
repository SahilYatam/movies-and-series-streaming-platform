import { prisma } from "../../config/prisma.js"
import { Prisma, Title, TitleKind } from "../../generated/prisma/client.js"

const getTitleById = async(id: number): Promise<Title | null> => {
    const title = await prisma.title.findUnique({
        where: { id }
    })

    return title
}

const getTitleByTmdbId = async (
    tmdbId: number,
    kind: TitleKind
): Promise<Title | null> => {
    const title = await prisma.title.findUnique({
        where: { 
            tmdbId_kind: {
                tmdbId,
                kind
            }    
        }
    })

    return title
}

const getTmdbId = async(id: number): Promise<{ tmdbId: number } | null> => {
    return await prisma.title.findUnique({
        where: {
            id,
        },
        select: {
            tmdbId: true
        }
    });
}

/**
an upsert operation is a database action that either updates an existing record if a match is found, or inserts a new record if it does not exist.

    where: The query criteria used to locate a unique record.
    update: The object defining what to modify if the record exists.
    create: The object defining the full fields required to build a new record if it is absent.
*/

/*
TMDB
  │
  │ fetch movie 550
  ↓
normalizeTitle()
  │
  │ { tmdbId: 550, kind: MOVIE, ... }
  ↓
upsertTitle()
  │
  ├── exists? → UPDATE
  │
  └── doesn't exist? → CREATE
  ↓
PostgreSQL
*/

/**

TMDB service
    ↓
fetch TMDB data

normalizeTitle()
    ↓
TMDB shape → application/DB shape

Title repository
    ↓
talks to Prisma/PostgreSQL

Title service
    ↓
business logic / orchestration

Title controller
    ↓
HTTP request/response

*/

const upsertTitle = async(data: Prisma.TitleCreateInput) => {
    return prisma.title.upsert({
        where: {
            tmdbId_kind: {
                tmdbId: data.tmdbId,
                kind: data.kind
            }
        },

        update: {
            title: data.title,
            originalTitle: data.originalTitle,
            overview: data.overview,
            posterPath: data.posterPath,
            backdropPath: data.backdropPath,
            originalLanguage: data.originalLanguage,
            rating: data.rating,
            adult: data.adult
        },

        create: data
    })
}

const searchTitles = async(
    query: string,
    limit: number = 20
) => {
    const titles = await prisma.title.findMany({
        where: {
            title: {
                contains: query,
                mode: "insensitive"
            }
        },

        select: {
            id: true,
            tmdbId: true,
            kind: true,
            title: true,
            posterPath: true,
            releaseDate: true,
            firstAirDate: true,
            rating: true,
        },

        orderBy: {
            title: "asc"
        },

        take: limit
    });

    return titles;
}


export const titleRepo = {
    getTitleById,
    getTitleByTmdbId,
    getTmdbId,
    upsertTitle,
    searchTitles,
}
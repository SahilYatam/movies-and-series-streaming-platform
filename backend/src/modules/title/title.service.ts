import { Prisma } from "../../generated/prisma/client.js";
import { TitleKind } from "../../generated/prisma/enums.js";
import { ApiError } from "../../shared/index.js";
import { titleRepo } from "./title.repository.js";

const getTitleById = async(id: number) => {
    const title = await titleRepo.getTitleById(id);
    if(!title){
        throw new ApiError(404, "Title not found");
    }

    return title
}

const getTitleByTmdbId = async(tmdbId: number, kind: TitleKind) => {
    const title = await titleRepo.getTitleByTmdbId(tmdbId, kind)

    if(!title){
        throw new ApiError(404, "Title not found");
    }

    return title
}

const upsertTitle = async(data: Prisma.TitleCreateInput) => {
    return titleRepo.upsertTitle(data)
}

const searchTitles = async (query: string) => {
    const q = query.trim();

    return titleRepo.searchTitles(q);
};

export const titleService = {
    getTitleById,
    getTitleByTmdbId,
    upsertTitle,
    searchTitles
}


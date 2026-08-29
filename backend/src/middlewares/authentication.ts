import type { Request, Response, NextFunction } from "express";
import { getSession } from "../lib/get-session.js";
import { ApiError } from "../shared/index.js";

export async function authentication(req: Request, res: Response, next: NextFunction) {
    const session = await getSession(req);

    if(!session) {
        throw new ApiError(401, "Unauthorized");
    }

    req.session = session;
    next();
}


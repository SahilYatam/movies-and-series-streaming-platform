import { fromNodeHeaders } from "better-auth/node"
import type { Request } from "express"
import { auth } from "./auth.js"

export async function getSession(req: Request){
    return auth.api.getSession({
        headers: fromNodeHeaders(req.headers)
    })
}


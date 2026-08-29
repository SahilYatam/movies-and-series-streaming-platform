import type { Session } from "../../lib/auth.ts";

declare global {
    namespace Express {
        interface Request {
            session?: Session
        }
    }
}

export {};

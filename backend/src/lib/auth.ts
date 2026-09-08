import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../config/prisma.js";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:8000",
    
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: [
        process.env.BETTER_AUTH_URL || "http://localhost:3000",
    ],
    session: {
        cookieCache: { enabled: true, maxAge: 60 * 60 },
    },
    advanced: {
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
            partitioned: true,
        }
    }
});

export type Session = typeof auth.$Infer.Session;


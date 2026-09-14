import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { errorHandler, notFoundHandler } from "./middlewares/globalErrorHandler.js";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";



export const app = express();

import homeRouter from "../src/modules/home/home.routes.js"
import titleRouter from "../src/modules/title/title.route.js"
import watchlistRouter from "../src/modules/watchlist/watchlist.routes.js"
// import watchHistoryRouter from "../src/modules/watchHistory/watchhistory.routes.js"


app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
}));
app.use(morgan("dev"));
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json({ limit: "20kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Cache-Control", "no-store");
    next();
});

app.get("/health", (req: Request, res: Response) => {
    return res.status(200).json({ status: "OK" });
});

function limiter(windowMs: number, max: number) {
    return rateLimit({
        windowMs,
        max,
        message: "Too many requests, please try again later.",
        standardHeaders: true,
        legacyHeaders: false,
    });
}

const globalRateLimiting = limiter(15 * 60 * 1000, 1000); // 15 minutes, 1000 requests
app.use(globalRateLimiting);

app.get("/api/v1/home-test", (req, res) => {
    res.json({
        success: true,
        message: "Home route is reachable",
    });
});

app.use("/api/v1/home", homeRouter);
app.use("/api/v1/title", titleRouter)
app.use("/api/v1/watchlist", watchlistRouter)
// app.use("/watchHistory", watchHistoryRouter)


app.use(notFoundHandler);
app.use(errorHandler);


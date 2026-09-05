import { Router } from "express";
import { authentication } from "../../middlewares/authentication.js";
import { watchlistController } from "./watchlist.controller.js";

const router = Router();

router.use(authentication);

router.get("/", watchlistController.getUserWatchlist);
router.put("/:titleId", watchlistController.upsertWatchlist);
router.delete("/:titleId", watchlistController.deleteWatchlistTitle);

export default router;

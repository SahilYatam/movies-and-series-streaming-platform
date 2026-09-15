import { Router } from "express";
import { authentication } from "../../middlewares/authentication.js";
import { watchHistoryController } from "./watchhistory.controller.js";

const router = Router();

router.use(authentication);

router.get("/all", watchHistoryController.getUserAllWatchHistory)
router.get("/:titleId", watchHistoryController.getUserOneWatchHistory)
router.put("/:titleId", watchHistoryController.upsertWatchHistory)
router.delete("/", watchHistoryController.clearWatchHistory)



import { Router } from "express";
import { titleController } from "./title.controller.js";

const router = Router();

router.get(
    "/:titleId",
    titleController.getTitleDetails,
);

export default router;
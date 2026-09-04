import { Router } from "express";
import { homeController } from "./home.controller.js";

const router = Router();

router.get("/", homeController.homePage);
router.get("/search", homeController.search);


export default router
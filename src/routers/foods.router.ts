import { Router } from "express";
import * as controller from "~/controllers/foods.controller";
import auth from "~/middlewares/auth.middleware";

const router = Router({ mergeParams: true });

router.get("/", auth, controller.getFoods);
router.get("/:id", auth,  controller.getFoodById);

export default router;
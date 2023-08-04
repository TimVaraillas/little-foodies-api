import { Router } from "express";
import * as controller from "~/controllers/categories.controller";
import auth from "~/middlewares/auth.middleware";

const router = Router({ mergeParams: true });

router.get("/", auth, controller.getCategories);
router.get("/:id", auth, controller.getCategoryById);

export default router;
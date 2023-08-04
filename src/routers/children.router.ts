import { Router } from "express";
import * as controller from "~/controllers/children.controller";
import * as Joi from 'joi'
import { createValidator } from 'express-joi-validation'
import auth from "~/middlewares/auth.middleware";

const router = Router({ mergeParams: true });
const validator = createValidator({ passError: true });

const postChildJoiSchema = Joi.object({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  gender: Joi.string().valid('masculine', 'feminine').required(),
  birthday: Joi.date().iso(),
  user_id: Joi.string().required(),
});

router.get("/:userId", auth, controller.getChildrenByUserId);
router.post("/", auth, validator.body(postChildJoiSchema), controller.postChild);

export default router;
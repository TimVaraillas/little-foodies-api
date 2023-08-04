import { Router } from "express";
import * as Joi from 'joi';
import { createValidator } from 'express-joi-validation';

import * as controller from "~/controllers/auth.controller";
import auth from "~/middlewares/auth.middleware";

const router = Router({ mergeParams: true });
const validator = createValidator({ passError: true });

const logInJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


router.get("/", auth, controller.getLoggedInUser);
router.post("/", validator.body(logInJoiSchema), controller.authenticateUser);

export default router;
import { Router } from "express";
import * as controller from "~/controllers/users.controller";
import * as Joi from 'joi'
import { createValidator } from 'express-joi-validation'

const router = Router({ mergeParams: true });
const validator = createValidator({ passError: true });

const registerUserJoiSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

router.post("/", validator.body(registerUserJoiSchema), controller.registerUser);

export default router;
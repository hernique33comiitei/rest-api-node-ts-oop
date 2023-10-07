import { Router } from "express";
import * as yup from "yup";
import ControllerUser from "../../controllers/user";
import { Validation } from "../../shared/validation";
import { Auth } from "../../shared/auth";

const userRouter = Router();

userRouter.post(
  "/create",
  Validation.validation({
    body: yup.object({
      email: yup.string().required(),
      name: yup.string().required(),
      password: yup.string().required(),
    }),
  }),
  ControllerUser.create
);

userRouter.post(
  "/login",
  Validation.validation({
    body: yup.object({
      email: yup.string().required(),
      name: yup.string().required(),
      password: yup.string().required(),
    }),
  }),
  ControllerUser.auth
);

userRouter.get(
  "/profile",
  Validation.validation({
    headers: yup.object({
      "x-access-token": yup.string().required(),
    }),
  }),
  Auth.auth(),
  ControllerUser.profile
);

export default userRouter;

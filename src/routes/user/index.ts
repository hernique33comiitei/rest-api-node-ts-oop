import { Router } from "express";
import * as yup from "yup";
import ControllerUser from "../../controllers/user";
import { Validation } from "../../shared/validation";

const userRouter = Router();

userRouter.post(
  "/create",
  new Validation().validation({
    body: yup.object({
      name: yup.string().required(),
      password: yup.string().required(),
    }),
  }),
  ControllerUser.create
);

userRouter.post(
  "/auth",
  new Validation().validation({
    body: yup.object({
      name: yup.string().required(),
      password: yup.string().required(),
    }),
  }),
  ControllerUser.auth
);

export default userRouter;

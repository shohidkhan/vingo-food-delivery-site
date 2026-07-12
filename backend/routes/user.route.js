import express from "express";
import isAuth from "../middlewares/IsAuth.js";
import {
  getCurrentUser,
  userUpdateLocation,
} from "../controllers/user.controller.js";
const userRouter = express.Router();

userRouter.get("/current-user", isAuth, getCurrentUser);
userRouter.put("/update-location", isAuth, userUpdateLocation);
export default userRouter;

import express from "express";
import {
  resetPassword,
  sendOtp,
  singIn,
  singOut,
  singUp,
  verifyOtp,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", singUp);
authRouter.post("/signin", singIn);
authRouter.get("/signout", singOut);
authRouter.post("/send-otp", sendOtp);
authRouter.post("/verify-otp", verifyOtp);
authRouter.post("/reset-password", resetPassword);

export default authRouter;

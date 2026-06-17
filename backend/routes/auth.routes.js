import express from "express";
import { singIn, singOut, singUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", singUp);
authRouter.post("/signin", singIn);
authRouter.post("/signout", singOut);

export default authRouter;

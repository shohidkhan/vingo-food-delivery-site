import express from "express";
import authController from "../controllers/auth.controller.js";

const authRouter = express.Router();

router.post("/signup", authController.singUp);
router.post("/signin", authController.singIn);
router.post("/signout", authController.singOut);

export default authRouter;

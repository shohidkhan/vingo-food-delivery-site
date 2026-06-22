import express from "express";
import { createEditShop, createShop } from "../controllers/shop.controller.js";
import isAuth from "../middlewares/IsAuth";
import { upload } from "../middlewares/multer";

const shopRouter = express.Router();

shopRouter.get("/create-edit", isAuth, upload.single("image"), createEditShop);

export default shopRouter;

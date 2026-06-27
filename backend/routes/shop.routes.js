import express from "express";
import {
  createEditShop,
  createShop,
  getShop,
} from "../controllers/shop.controller.js";
import isAuth from "../middlewares/IsAuth.js";
import { upload } from "../middlewares/multer.js";

const shopRouter = express.Router();

shopRouter.post("/create-edit", isAuth, upload.single("image"), createEditShop);
shopRouter.get("/get-shop", isAuth, getShop);

export default shopRouter;

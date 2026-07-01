import express from "express";
import {
  createEditShop,
  createShop,
  getShop,
  getShopByCity,
} from "../controllers/shop.controller.js";
import isAuth from "../middlewares/IsAuth.js";
import { upload } from "../middlewares/multer.js";
import isOwner from "../middlewares/isOwner.js";

const shopRouter = express.Router();

shopRouter.post(
  "/create-edit",
  isAuth,
  isOwner,
  upload.single("image"),
  createEditShop,
);
shopRouter.get("/get-shop", isAuth, getShop);
shopRouter.get("/get-shop-by-city/:city", isAuth, getShopByCity);

export default shopRouter;

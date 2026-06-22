import express from "express";
import { editItem, storeItem } from "../controllers/item.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), storeItem);
itemRouter.post(
  "/edit-item/:itemId",
  isAuth,
  upload.single("image"),
  storeItem,
);

export default itemRouter;

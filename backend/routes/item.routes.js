import express from "express";
import { editItem, storeItem } from "../controllers/item.controller";
import isAuth from "../middlewares/isAuth";
import { upload } from "../middlewares/multer";

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), storeItem);
itemRouter.post(
  "/edit-item/:itemId",
  isAuth,
  upload.single("image"),
  storeItem,
);

export default itemRouter;

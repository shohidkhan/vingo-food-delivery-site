import express from "express";
import {
  deleteItem,
  editItem,
  getItemByCity,
  getItemById,
  storeItem,
} from "../controllers/item.controller.js";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import isOwner from "../middlewares/isOwner.js";

const itemRouter = express.Router();

itemRouter.post(
  "/add-item",
  isAuth,
  isOwner,
  upload.single("image"),
  storeItem,
);
itemRouter.post("/edit-item/:itemId", isAuth, upload.single("image"), editItem);
itemRouter.get("/get-item/:itemId", isAuth, getItemById);
itemRouter.delete("/delete-item/:itemId", isAuth, deleteItem);
itemRouter.get("/get-item-by-city/:city", isAuth, getItemByCity);

export default itemRouter;

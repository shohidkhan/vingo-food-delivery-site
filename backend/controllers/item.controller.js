import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utilities/cloudinary.js";

export const storeItem = async (rew, res) => {
  try {
    const { name, category, price, foodType } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    const item = await shop.items.create({
      name,
      category,
      price,
      foodType,
      image,
      shop: shop._id,
    });
    res.status(200).json({ message: "Item stored successfully", item });
  } catch (error) {
    res.status(500).json(`store item error: ${error.message}`);
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, category, price, foodType } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const item = await Item.findByIdAndUpdate(itemId, {
      name,
      category,
      price,
      foodType,
      image,
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item edited successfully", item });
  } catch (error) {
    res.status(500).json(`edit item error: ${error.message}`);
  }
};

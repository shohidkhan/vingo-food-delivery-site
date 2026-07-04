import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utilities/cloudinary.js";

export const storeItem = async (req, res) => {
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
    const item = await Item.create({
      name,
      category,
      price,
      foodType,
      image,
      shop: shop._id,
    });
    await shop.items.push(item._id);
    await shop.save();
    await shop.populate("items owner");
    res.status(200).json({ message: "Item stored successfully", shop });
  } catch (error) {
    res.status(500).json(`store item error: ${error.message}`);
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, price, foodType } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    console.log(image, category, foodType, name, price);

    const item = await Item.findByIdAndUpdate(itemId, {
      name,
      category,
      price,
      foodType,
      image,
    });
    console.log(item);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const shop = await Shop.findOne({ owner: req.userId }).populate("items");

    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json(`edit item error: ${error.message}`);
  }
};

export const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json(`get item error: ${error.message}`);
  }
};

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findByIdAndDelete(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    let shop = await Shop.findOne({ owner: req.userId });

    shop.items = shop.items.filter((i) => i._id.toString() !== itemId);
    await shop.save();
    await shop.populate({
      path: "items",
      options: { sort: { updatedAt: -1 } },
    });

    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json(`delete item error: ${error.message}`);
  }
};

export const getItemByCity = async (req, res) => {
  try {
    const city = req.params.city;
    const shops = await Shop.find({ city }).populate("items");
    if (!shops) {
      return res.status(404).json({ message: "Shops not found" });
    }
    const shopIds = shops.map((shop) => shop._id);
    const items = await Item.find({
      shop: { $in: shopIds },
    });
    res.status(200).json({ shops, items });
  } catch (error) {
    res.status(500).json(`get item by city error: ${error.message}`);
  }
};

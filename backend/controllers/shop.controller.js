import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utilities/cloudinary.js";

export const createShop = async (req, res) => {
  try {
    const { name, city, address, state } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const shop = await Shop.create({
      name,
      city,
      address,
      state,
      image,
      owner: req.userId,
    });
    await shop.populate("owner");

    res.status(201).json({
      message: "Shop created successfully",
      shop,
    });
  } catch (error) {
    res.status(500).json(`create shop error: ${error.message}`);
  }
};

export const createEditShop = async (req, res) => {
  try {
    const { name, city, address, state } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    let shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      shop = await Shop.create({
        name,
        city,
        address,
        state,
        image,
        owner: req.userId,
      });
    } else {
      shop = await Shop.findByIdAndUpdate(
        shop._id,
        {
          name,
          city,
          address,
          state,
          image,
        },
        { new: true },
      );
    }
  } catch (error) {
    res.status(500).json(`edit shop error: ${error.message}`);
  }
};

export const getShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate(
      "owner items",
    );
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json(`get shop error: ${error.message}`);
  }
};

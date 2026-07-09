import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import User from "../models/user.model.js";

export const placeOrder = async (req, res) => {
  try {
    const { cartItems, paymentMethod, deliveryAddress, deliveryFee } = req.body;
    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }
    if (
      !deliveryAddress.text ||
      !deliveryAddress.latitude ||
      !deliveryAddress.longitude
    ) {
      return res.status(400).json({ message: "Invalid delivery address" });
    }

    const groupItemsByShop = {};
    cartItems.forEach((item) => {
      const shopId = item.shop;

      if (!groupItemsByShop[shopId]) {
        groupItemsByShop[shopId] = [];
      }
      groupItemsByShop[shopId].push(item);
    });
    const shopOrder = await Promise.all(
      Object.keys(groupItemsByShop).map(async (shopId) => {
        const shop = await Shop.findById(shopId).populate("owner");
        if (!shop) {
          return res.status(404).json({ message: "Shop not found" });
        }
        const items = groupItemsByShop[shopId];
        const subTotal = items.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0,
        );
        return {
          shop: shop._id,
          owner: shop.owner._id,
          subtotal: subTotal,
          shopOrderItems: items.map((item) => ({
            item: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        };
      }),
    );

    const totalAmount = shopOrder.reduce((sum, shop) => sum + shop.subtotal, 0);

    if (deliveryFee) {
      totalAmount += Number(deliveryFee);
    }

    const newOrder = await Order.create({
      user: req.userId,
      paymentMethod,
      deliveryAddress,
      totalAmount,
      shopOrder,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json(`place order error: ${err.message}`);
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "user") {
      const orders = await Order.find({ user: req.userId })
        .sort({ createdAt: -1 })
        .populate("shopOrder.shop", "name")
        .populate("shopOrder.owner", "name email mobile")
        .populate("shopOrder.shopOrderItems.item", "name image price");

      return res.status(200).json(orders);
    }

    if (user.role === "owner") {
      const orders = await Order.find({ "shopOrder.owner": req.userId })
        .sort({ createdAt: -1 })
        .populate("shopOrder.shop", "name")
        .populate("user", "name email mobile") // Added specific fields to keep it compact
        .populate("shopOrder.shopOrderItems.item", "name image price");

      // Convert Mongoose documents to plain objects so we can mutate the arrays safely
      const cleanedOrders = orders.map((order) => {
        const orderObj = order.toObject();

        // Filter out shopOrders that do NOT belong to this shop owner
        orderObj.shopOrder = orderObj.shopOrder.filter(
          (subOrder) => subOrder.owner.toString() === req.userId.toString(),
        );

        return orderObj;
      });

      return res.status(200).json(cleanedOrders);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `get user orders error: ${error.message}` });
  }
};

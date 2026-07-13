import DeliveryAssignment from "../models/deliveryAssign.model.js";
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
        // Include deliveryAddress, latitude, longitude if stored on the user document
        .populate(
          "user",
          "fullName email mobile deliveryAddress latitude longitude",
        )
        .populate("shopOrder.shopOrderItems.item", "name image price");

      const filterOrders = orders.map((order) => {
        // 1. Convert Mongoose document to a plain object
        const orderObj = order.toObject();

        // 2. Filter array instead of using find(), and use .toString() to compare IDs safely
        const filteredShopOrders = orderObj.shopOrder.filter(
          (o) => o.owner.toString() === req.userId.toString(),
        );

        return {
          _id: orderObj._id, // Match frontend expected property (data._id)
          createdAt: orderObj.createdAt,
          paymentMethod: orderObj.paymentMethod,
          deliveryAddress: orderObj.deliveryAddress, // If stored on the order level
          user: orderObj.user,
          shopOrder: filteredShopOrders, // Remains an array so .map() works in the component
        };
      });

      return res.status(200).json(filterOrders);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `get user orders error: ${error.message}` });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, shopId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    // console.log(shopId);
    const shopOrder = order.shopOrder.find((o) => o.shop.toString() === shopId);

    if (!shopOrder) {
      return res.status(404).json({ message: "Shop order not found" });
    }

    shopOrder.status = status;
    let deliveryBoyPayload = [];
    if (status === "out of delivery" || !shopOrder.assignment) {
      const { latitude, longitude } = order.deliveryAddress;
      // const users = await User.find({ role: "deliveryBoy" });
      // console.log(users[0].location);
      console.log(latitude, longitude);
      const nearByDeliveryBoys = await User.find({
        role: "deliveryBoy",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Number(longitude), Number(latitude)],
            },
            $maxDistance: 5000,
          },
        },
      });
      // console.log(nearByDeliveryBoys);
      const nearByIds = nearByDeliveryBoys.map((user) => user._id);
      const busyIds = await DeliveryAssignment.find({
        assignedTo: { $in: nearByIds },
        status: { $nin: ["broadcasted", "completed"] },
      }).distinct("assignedTo");

      const busyIdsSet = new Set(busyIds.map((id) => id.toString()));
      const availableDeliveryBoys = nearByDeliveryBoys.filter(
        (b) => !busyIdsSet.has(b._id.toString()),
      );
      const candidates = availableDeliveryBoys.map((b) => b._id);

      if (candidates.length === 0) {
        await order.save();
        return res.status(404).json({ message: "No delivery boy available" });
      }

      const deliveryAssignment = await DeliveryAssignment.create({
        order: order._id,
        shop: shopOrder.shop,
        shopOrderId: shopOrder._id,
        broadcastedTo: candidates,
        status: "broadcasted",
      });

      shopOrder.assignedDeliveryBoy = deliveryAssignment.assignedTo;
      shopOrder.assignment = deliveryAssignment._id;
      deliveryBoyPayload = availableDeliveryBoys.map((b) => ({
        _id: b._id,
        fullName: b.fullName,
        mobile: b.mobile,
        longitude: b.location.coordinates[0],
        latitude: b.location.coordinates[1],
      }));
    }
    await order.save();
    await shopOrder.save();
    const updateShopOrder = await order.shopOrder.find(
      (o) => o.shop.toString() === shopId,
    );
    await order.populate("shopOrder.shop", "name");
    await order.populate(
      "shopOrder.assignedDeliveryBoy",
      "fullName email mobile",
    );

    return res.status(200).json({
      shopOrder: updateShopOrder,
      assignedDeliveryBoys: updateShopOrder?.assignedDeliveryBoy,
      availableDeliveryBoys: deliveryBoyPayload,
      assignment: updateShopOrder?.assignment._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `update order status error: ${error.message}` });
  }
};

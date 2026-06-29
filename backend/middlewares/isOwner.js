import User from "../models/user.model.js";

const isOwner = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role !== "owner") {
      return res
        .status(401)
        .json({ message: "you do not have permission here" });
    }

    next();
  } catch (error) {
    return res.status(500).json(`is owner error: ${error.message}`);
  }
};

export default isOwner;

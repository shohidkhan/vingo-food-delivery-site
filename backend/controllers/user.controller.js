import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`get current user error: ${error.message}`);
  }
};

export const userUpdateLocation = async (req, res) => {
  try {
    const { lat, lon } = req.body;

    const userId = req.userId;

    const user = await User.findByIdAndUpdate(userId, {
      location: {
        type: "Point",
        coordinates: [lat, lon],
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`user update location error: ${error.message}`);
  }
};

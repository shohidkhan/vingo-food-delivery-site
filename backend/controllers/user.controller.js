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

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        location: {
          type: "Point",
          coordinates: [lon, lat], // [longitude, latitude]
        },
      },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Location updated successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

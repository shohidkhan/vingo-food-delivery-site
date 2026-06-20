import User from "../models/user.model.js";

export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    // console.log(userId);

    const user = await User.findById("6a36696f238846aab1c27ae8");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(`get current user error: ${error.message}`);
  }
};

import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    // console.log(token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(decoded);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json(` Auth error: ${error.message}`);
  }
};

export default isAuth;

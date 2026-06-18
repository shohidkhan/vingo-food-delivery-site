import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/db.js";
import dns from "dns";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
dns.setServers(["0.0.0.0", "8.8.8.8"]);
dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  dbConnect();
});

import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "owner", "deliveryBoy"],
      required: true,
    },
    resetOtp: {
      type: String,
      default: null,
      required: false,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
      required: false,
    },
    optExpires: {
      type: Date,
    },
    location: {
      type: String,
      enum: ["point"],
      default: "point",
    },
    coordinates: {
      type: [Number],
      default: [0, 0],
    },
  },
  { timestamps: true },
);

userSchema.index({ location: "2dsphere" });

const User = new mongoose.model("User", userSchema);
export default User;

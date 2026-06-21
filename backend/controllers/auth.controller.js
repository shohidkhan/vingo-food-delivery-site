import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import getToken from "../utilities/token.js";
import { sendOtpMail } from "../utilities/mail.js";

export const singUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    if (mobile.length < 10) {
      return res
        .status(400)
        .json({ message: "Mobile number must be at least 10 digits" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      mobile,
      role,
    });

    const token = await getToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json(`sign up error: ${error.message}`);
    console.log(error.message);
  }
};
export const singIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = await getToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "User signed in successfully", user });
  } catch (error) {
    res.status(500).json(`sign in error: ${error.message}`);
    console.log(error.message);
  }
};
export const singOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User signed out successfully" });
  } catch (error) {
    res.status(500).json(`sign out error: ${error.message}`);
    console.log(error.message);
  }
};
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;
    user.isOtpVerified = false;
    user.optExpires = Date.now() + 5 * 60 * 1000;

    await user.save();
    await sendOtpMail(email, otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json(`send otp error: ${error.message}`);
    console.log(error.message);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }

    if (user.optExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired." });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    user.isOtpVerified = true;
    user.resetOtp = null;
    user.optExpires = null;
    await user.save();
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json(`verify otp error: ${error.message}`);
    console.log(error.message);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User does not exist." });
    }
    if (user.isOtpVerified === false) {
      return res.status(400).json({ message: "OTP not verified." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.isOtpVerified = false;
    await user.save();
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).json(`reset password error: ${error.message}`);
    console.log(error.message);
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role } = req.body;
    let user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      const hashedPassword = await bcrypt.hash("123456", 10);
      user = await User.create({
        fullName,
        email,
        mobile,
        role,
        password: hashedPassword,
      });
    }

    const token = getToken(user._id);
    // console.log(token);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "User signed in successfully", user });
  } catch (error) {
    res.status(500).json(`google auth error: ${error.message}`);
    console.log(error.message);
  }
};

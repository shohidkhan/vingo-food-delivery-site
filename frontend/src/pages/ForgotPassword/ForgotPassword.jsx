import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#FAF6F3] flex items-center justify-center p-4 antialiased font-sans">
      {/* Forgot Password Card Container */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 w-full max-w-md p-8 md:p-10">
        {/* Header Section with Back Arrow */}
        <div className="flex items-center gap-3 mb-6">
          <button
            type="button"
            className="text-[#FF4C24] hover:opacity-80 transition duration-150 focus:outline-none"
            aria-label="Go back"
          >
            {/* Left Back Arrow SVG */}
            <IoMdArrowRoundBack onClick={() => navigate("/signin")} />
          </button>

          <h1 className="text-2xl font-extrabold text-[#FF4C24] tracking-tight">
            Forgot Password
          </h1>
        </div>

        {/* Form Section */}
        <form className="space-y-5">
          {/* Email Input */}
          {step == 1 && (
            <div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4C24]/20 focus:border-[#FF4C24] transition duration-200"
                />
              </div>

              {/* Submit Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  className="w-full bg-[#FF4C24] text-white font-medium py-3 px-4 rounded-xl hover:bg-[#e03d16] transition-all duration-150"
                >
                  Send Otp
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <div>
                <input
                  type="number"
                  id="otp"
                  placeholder="Enter your otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4C24]/20 focus:border-[#FF4C24] transition duration-200"
                />
              </div>

              {/* Submit Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  className="w-full bg-[#FF4C24] text-white font-medium py-3 px-4 rounded-xl hover:bg-[#e03d16] transition-all duration-150"
                >
                  Verify Otp
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4C24]/20 focus:border-[#FF4C24] transition duration-200"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your confirm password"
                  className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4C24]/20 focus:border-[#FF4C24] transition duration-200"
                />
              </div>

              {/* Submit Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  className="w-full bg-[#FF4C24] text-white font-medium py-3 px-4 rounded-xl hover:bg-[#e03d16] transition-all duration-150"
                >
                  Reset Password
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

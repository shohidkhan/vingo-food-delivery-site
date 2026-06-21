import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { googleSignIn, setLoading } from "../../redux/authSlice.js";
import { setUserData } from "../../redux/userSlice.js";
import useCurrentUser from "../../hooks/useCurrentUser.jsx";

const Signup = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [role, setRole] = useState("user");
  const [mobile, setMobile] = useState("");
  const dispatch = useDispatch();
  const { serverUrl, loading } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const { currentUser } = useCurrentUser();

  if (loading) return "loading.....";

  if (userData) {
    return <Navigate to="/" />;
  }

  const handleSingUp = async (e) => {
    dispatch(setLoading(true));
    try {
      e.preventDefault();
      // alert("clicked");
      const fullName = e.target.fullName.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const mobile = e.target.mobile.value;

      const result = await axios.post(
        `${serverUrl}/auth/signup`,
        {
          fullName,
          email,
          password,
          mobile,
          role,
        },
        { withCredentials: true },
      );

      // console.log(result.data);
      dispatch(setUserData(result.data.user));
      dispatch(setLoading(false));
      <Navigate to="/" />;
      // reset the form
      e.target.fullName.value = "";
      e.target.email.value = "";
      e.target.password.value = "";
      e.target.mobile.value = "";

      // console.log(result);
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(setLoading(false));
        alert(error.response.data.message);
      }
      // console.error(error);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!mobile) {
      alert("Please enter mobile number");
      return;
    }
    if (!role) {
      alert("Please select role number");
      return;
    }
    const result = await dispatch(googleSignIn()).unwrap();
    // console.log(result);
    try {
      const data = await axios.post(
        `${serverUrl}/auth/google-auth`,
        {
          fullName: result.displayName,
          email: result.email,
          mobile: mobile,
          role,
        },
        { withCredentials: true },
      );

      dispatch(setUserData(data.data.user));
      <Navigate to="/" />;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-[#FAF6F3] flex items-center justify-center p-4 antialiased font-sans">
      {/* Sign Up Card Container */}
      <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 w-full max-w-xl p-8 md:p-10">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-[#FF4C24] tracking-tight mb-2">
            Vingo
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            Create an account to start enjoying delicious food deliveries.
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-5" onSubmit={handleSingUp}>
          {/* Row 1: Full Name and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name Input */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4C24]/20 focus:border-[#FF4C24] transition duration-200"
              />
            </div>

            {/* Email Input */}
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
                name="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4C24]/20 focus:border-[#FF4C24] transition duration-200"
              />
            </div>
          </div>

          {/* Row 2: Mobile and Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mobile Input */}
            <div>
              <label
                htmlFor="mobile"
                className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
                className="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4C24]/20 focus:border-[#FF4C24] transition duration-200"
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={togglePassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Create a password"
                  className="w-full px-4 py-3 pr-11 text-sm rounded-xl border border-gray-200 bg-gray-50/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4C24]/20 focus:border-[#FF4C24] transition duration-200"
                />
                {/* Eye Icon */}
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                  onClick={() => setTogglePassword(!togglePassword)}
                >
                  {togglePassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
          </div>

          {/* Row 3: Role Input */}
          <div className="pt-1">
            <label
              htmlFor="role"
              className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2"
            >
              Role
            </label>
            <div className="flex gap-2">
              {["user", "deliveryBoy"].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 border rounded-xl px-3 py-2 text-center text-sm font-semibold transition-all duration-150 ${
                    role === r
                      ? "bg-[#FF4C24] text-white border-[#FF4C24] shadow-md shadow-orange-600/10"
                      : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {r === "user" ? "User" : "Delivery Boy"}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            {/* Main Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF4C24] text-white font-medium py-3 px-4 rounded-xl hover:bg-[#e03d16] transition-all duration-150"
            >
              {loading ? (
                <ClipLoader color="white" colo="white" size={20}></ClipLoader>
              ) : (
                "Sign Up"
              )}
            </button>

            {/* Google Sign Up Button */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-white text-gray-700 font-medium py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-150"
            >
              {loading ? (
                <ClipLoader color="white" size={20}></ClipLoader>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span className="text-sm font-semibold text-gray-600">
                    Sign up with Google
                  </span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Section */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 font-medium">
            Already have an account?
            <Link
              to="/signin"
              className="text-[#FF4C24] font-semibold hover:underline transition duration-150"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

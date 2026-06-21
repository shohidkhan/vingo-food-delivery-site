import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader, FadeLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import { googleSignIn, setLoading } from "../../redux/authSlice.js";
import { setUserData } from "../../redux/userSlice.js";
import useCurrentUser from "../../hooks/useCurrentUser.jsx";

const Signin = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  const serverUrl = useSelector((state) => state.auth.serverUrl);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const { currentUser } = useCurrentUser();

  if (loading) return "loading.....";

  if (userData) {
    return <Navigate to="/" />;
  }
  const handleSignIn = async (e) => {
    dispatch(setLoading(true));
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const result = await axios.post(
        `${serverUrl}/auth/signin`,
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      dispatch(setLoading(false));

      dispatch(setUserData(result.data.user));
      <Navigate to="/" />;

      if (result.status === 200) {
        alert(result.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        dispatch(setLoading(false));
        alert(error.response.data.message);
      }
      console.error(error);
    }
  };

  const handleGoogleSignUp = async () => {
    const user = await dispatch(googleSignIn()).unwrap();
    // console.log(user);
    try {
      const data = await axios.post(
        `${serverUrl}/auth/google-auth`,
        {
          email: user.email,
        },
        { withCredentials: true },
      );
      // console.log(data.data.user);
      dispatch(setUserData(data.data.user));
      <Navigate to="/" />;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div class="min-h-screen bg-[#FAF6F3] flex items-center justify-center p-4 antialiased font-sans">
      {/* <!-- Login Card Container --> */}
      <div class="bg-white rounded-2xl shadow-xl shadow-gray-200/50 w-full max-w-md p-8 md:p-10">
        {/* <!-- Header Section --> */}
        <div class="mb-8">
          <h1 class="text-3xl font-extrabold text-[#FF4C24] tracking-tight mb-2">
            Vingo
          </h1>
          <p class="text-sm text-gray-500 leading-relaxed max-w-[280px]">
            Welcome back! Please sign in to continue enjoying delicious food
            deliveries.
          </p>
        </div>

        {/* <!-- Form Section --> */}
        <form class="space-y-5" onSubmit={handleSignIn}>
          {/* <!-- Email Input --> */}
          <div>
            <label
              for="email"
              class="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              class="w-full px-4 py-3 text-sm rounded-xl border border-gray-200 bg-gray-50/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4C24]/20 focus:border-[#FF4C24] transition duration-200"
            />
          </div>

          {/* <!-- Password Input --> */}
          <div>
            <label
              for="password"
              class="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2"
            >
              Password
            </label>
            <div class="relative">
              <input
                type={togglePassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                class="w-full px-4 py-3 pr-11 text-sm rounded-xl border border-gray-200 bg-gray-50/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4C24]/20 focus:border-[#FF4C24] transition duration-200"
              />
              {/* <!-- Eye Icon (Show/Hide Password) --> */}
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                onClick={() => setTogglePassword(!togglePassword)}
              >
                {togglePassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* <!-- Forgot Password Link --> */}
          <div class="flex justify-end text-right">
            <Link
              to="/forgot-password"
              class="text-xs font-semibold text-[#FF4C24] hover:underline transition duration-150"
            >
              Forgot Password?
            </Link>
          </div>

          {/* <!-- Action Buttons --> */}
          <div class="space-y-3 pt-2">
            {/* <!-- Main Sign In Button --> */}
            <button
              type="submit"
              disabled={loading}
              class="w-full bg-[#FF4C24] text-white font-medium py-3 px-4 rounded-xl hover:bg-[#e03d16] focus:outline-none focus:ring-2 focus:ring-[#FF4C24] focus:ring-offset-2 transform active:scale-[0.98] transition-all duration-150"
            >
              {loading ? (
                <ClipLoader color="white" size={20}></ClipLoader>
              ) : (
                "Sign In"
              )}
            </button>

            {/* <!-- Google Sign In Button --> */}
            <button
              type="button"
              onClick={handleGoogleSignUp}
              class="w-full flex items-center justify-center gap-2 bg-white text-gray-700 font-medium py-3 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transform active:scale-[0.98] transition-all duration-150"
            >
              {/* <!-- Custom Inline Google 'G' Icon --> */}
              <svg class="w-5 h-5" viewBox="0 0 24 24">
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
              <span class="text-sm font-semibold text-gray-600">
                Sign in with Google
              </span>
            </button>
          </div>
        </form>

        {/* <!-- Footer Section --> */}
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500 font-medium">
            Don't have an account?
            <Link
              to="/signup"
              class="text-[#FF4C24] font-semibold hover:underline transition duration-150"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;

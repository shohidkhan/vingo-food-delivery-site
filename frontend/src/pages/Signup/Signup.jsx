import React from "react";

const Signup = () => {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
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
        <form class="space-y-5" onsubmit="event.preventDefault();">
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
                type="password"
                id="password"
                placeholder="Enter your password"
                class="w-full px-4 py-3 pr-11 text-sm rounded-xl border border-gray-200 bg-gray-50/30 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF4C24]/20 focus:border-[#FF4C24] transition duration-200"
              />
              {/* <!-- Eye Icon (Show/Hide Password) --> */}
              <button
                type="button"
                class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition duration-150"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* <!-- Forgot Password Link --> */}
          <div class="flex justify-end text-right">
            <a
              href="#"
              class="text-xs font-semibold text-[#FF4C24] hover:underline transition duration-150"
            >
              Forgot Password?
            </a>
          </div>

          {/* <!-- Action Buttons --> */}
          <div class="space-y-3 pt-2">
            {/* <!-- Main Sign In Button --> */}
            <button
              type="submit"
              class="w-full bg-[#FF4C24] text-white font-medium py-3 px-4 rounded-xl hover:bg-[#e03d16] focus:outline-none focus:ring-2 focus:ring-[#FF4C24] focus:ring-offset-2 transform active:scale-[0.98] transition-all duration-150"
            >
              Sign In
            </button>

            {/* <!-- Google Sign In Button --> */}
            <button
              type="button"
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
            <a
              href="#"
              class="text-[#FF4C24] font-semibold hover:underline transition duration-150"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import { createBrowserRouter } from "react-router-dom";
import FrontendLayout from "../layouts/FrontendLayout";
import Signup from "../pages/Signup/Signup";
import Signin from "../pages/Signin/Signin";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontendLayout></FrontendLayout>,
    children: [
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
      {
        path: "/signin",
        element: <Signin></Signin>,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
    ],
  },
]);

export default router;

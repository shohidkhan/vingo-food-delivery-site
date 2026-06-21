import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Signin from "../pages/Signin/Signin";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import BackendLayout from "../layouts/BackendLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <BackendLayout />
      </PrivateRoute>
    ),
    children: [{ path: "/", element: <Home /> }],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

export default router;

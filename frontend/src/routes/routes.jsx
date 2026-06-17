import { createBrowserRouter } from "react-router";
import FrontendLayout from "../layouts/FrontendLayout";
import Signup from "../pages/Signup/Signup";
import Signin from "../pages/Signin/Signin";

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
    ],
  },
]);

export default router;

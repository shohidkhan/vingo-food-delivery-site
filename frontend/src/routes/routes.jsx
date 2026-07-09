import { createBrowserRouter } from "react-router-dom";
import Signup from "../pages/Signup/Signup";
import Signin from "../pages/Signin/Signin";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import Home from "../pages/Home/Home";
import PrivateRoute from "./PrivateRoute";
import BackendLayout from "../layouts/BackendLayout";
import CreateEditShop from "../pages/CreateEditShop/CreateEditShop";

import AddItem from "../pages/Item/AddItem";
import EditItem from "../pages/EditItem/EditItem";
import Cart from "../pages/Cart/Cart";
import CheckOut from "../pages/CheckOut/CheckOut";
import PlaceOrder from "../pages/PlaceOrder/PlaceOrder";
import MyOrders from "../pages/MyOrders/MyOrders";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <BackendLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-edit-shop",
        element: <CreateEditShop />,
      },
      {
        path: "/add-item",
        element: <AddItem />,
      },
      {
        path: "/edit-item/:itemId",
        element: <EditItem />,
      },
      {
        path: "/carts",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <CheckOut />,
      },
      {
        path: "/order-success",
        element: <PlaceOrder />,
      },
      {
        path: "/my-orders",
        element: <MyOrders />,
      },
    ],
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

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import CartItem from "../../components/CartItem";
import { addToCart, removeFromCart } from "../../redux/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.user);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleIncrease = (id) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    if (item) {
      dispatch(addToCart({ ...item, quantity: 1 }));
    }
  };

  const handleDecrease = (id) => {
    const item = cartItems.find((cartItem) => cartItem.id === id);
    if (!item) return;

    if (item.quantity <= 1) {
      const filteredItems = cartItems.filter((cartItem) => cartItem.id !== id);
      dispatch(removeFromCart(filteredItems));
      return;
    }

    dispatch(addToCart({ ...item, quantity: -1 }));
  };

  const handleRemove = (id) => {
    const filteredItems = cartItems.filter((cartItem) => cartItem.id !== id);
    dispatch(removeFromCart(filteredItems));
  };

  return (
    <div className="min-h-screen bg-[#fffaf7] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#ff4d2d]">
              Your cart
            </p>
            <h1 className="text-3xl font-bold text-gray-800">Cart Items</h1>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-[#ff4d2d] transition hover:bg-orange-50"
          >
            Continue shopping
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex min-h-90 flex-col items-center justify-center rounded-[28px] border border-dashed border-orange-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mb-4 rounded-full bg-orange-50 p-4 text-[#ff4d2d]">
              <FiShoppingBag size={28} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Your cart is empty
            </h2>
            <p className="mt-2 max-w-md text-sm text-gray-500">
              Add some delicious items from the home page to start building your
              order.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 rounded-full bg-[#ff4d2d] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e63e1f]"
            >
              Browse food
            </button>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                  onRemove={handleRemove}
                />
              ))}
            </div>

            <div className="rounded-[28px] border border-orange-100 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-800">
                Order Summary
              </h2>
              <div className="mt-5 space-y-3 text-sm text-gray-600">
                <div className="flex items-center justify-between">
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className="flex items-center justify-between border-t border-dashed border-orange-100 pt-3 text-base font-semibold text-gray-800">
                  <span>Total</span>
                  <span>৳{totalAmount}</span>
                </div>
              </div>

              <button className="mt-6 w-full rounded-full bg-[#ff4d2d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#e63e1f]">
                Proceed to checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import { TbCurrentLocation } from "react-icons/tb";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { FaCodepen } from "react-icons/fa";
import { SiVisa } from "react-icons/si";

import "leaflet/dist/leaflet.css";
import { setAddress, setLocation } from "../../redux/mapSlice";
import axios from "axios";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems, currentAddress, userData } = useSelector(
    (state) => state.user,
  );
  const { serverUrl } = useSelector((state) => state.auth);
  //   console.log(userData);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const { location, address } = useSelector((state) => state.map);
  const [addressInput, setAddressInput] = useState("");
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  // console.log(parseInt(subtotal) < 500 ? "delivery fee lgbe na" : "lgbe");
  const deliveryFee = subtotal > 500 ? 0 : 50; // Free delivery
  const total = subtotal + deliveryFee;

  const [markerLocation, setMarkerLocation] = useState({
    lat: location.lat,
    lng: location.lng,
  });

  const RecenterMap = () => {
    const map = useMap();
    map.setView([location.lat, location.lng], 16, { animate: true });
  };
  const onDragEnd = (event) => {
    // console.log(event);
    const marker = event.target;
    const position = marker.getLatLng();
    setMarkerLocation({ lat: position.lat, lng: position.lng });
    dispatch(setLocation({ lat: position.lat, lng: position.lng }));
    getAddressByLatLng(position.lat, position.lng);
    // console.log("Marker dragged to:", position);
  };

  const getLatLngByAddress = async (addressInput) => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(
          addressInput,
        )}&apiKey=${import.meta.env.VITE_GEOAPIKEY}`,
      );
      const { lat, lon } = result?.data?.features[0]?.properties;
      dispatch(setLocation({ lat, lng: lon }));
      console.log(lat, lon);
    } catch (error) {
      console.error("Error fetching latitude and longitude:", error);
    }
  };

  const getAddressByLatLng = async (lat, lng) => {
    try {
      const result = await axios.get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&format=json&apiKey=${import.meta.env.VITE_GEOAPIKEY}`,
      );
      console.log(result?.data?.results[0]?.address_line2);
      dispatch(setAddress(result?.data?.results[0]?.address_line2));
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      //   console.log(position);
      const { latitude, longitude } = position.coords;
      dispatch(setLocation({ lat: latitude, lng: longitude }));
      await getAddressByLatLng(latitude, longitude);
    });
  };

  const handlePlaceOrder = async () => {
    try {
      const result = await axios.post(
        `${serverUrl}/order/place-order`,
        {
          items: cartItems,
          paymentMethod,
          deliveryAddress: {
            text: addressInput,
            latitude: location.lat,
            longitude: location.lng,
          },
          cartItems,
          deliveryFee,
        },
        { withCredentials: true },
      );

      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setMarkerLocation({ lat: location.lat, lng: location.lng });
  }, [location.lat, location.lng]);
  useEffect(() => {
    if (address) {
      setAddressInput(address);
    }
  }, [address]);

  if (cartItems.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#fffaf7]">
        <div className="text-center">
          <h2 className="mb-2 text-2xl font-semibold text-gray-800">
            No items in cart
          </h2>
          <button
            onClick={() => navigate("/carts")}
            className="mt-4 rounded-full bg-[#ff4d2d] px-6 py-2 text-white font-semibold transition hover:bg-[#ff4d2d]"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fffaf7] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
          <p className="mt-2 text-gray-600">
            Complete your order and have it delivered to your door
          </p>
        </div>

        {/* Main Checkout Section */}
        <div className="space-y-5">
          {/* Delivery Location */}
          <div className="rounded-2xl border border-orange-100 bg-white shadow-sm overflow-hidden">
            {/* Header with Location Info */}
            <div className="bg-white px-5 py-4 border-b border-gray-100">
              <div className=" flex gap-4 my-4 p-1.5 text-[#ff4d2d]">
                <FiMapPin size={18} />
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Delivery Location
                </p>
              </div>
              <div className="flex gap-1 items-center justify-between">
                <input
                  type="text"
                  value={addressInput}
                  onChange={(e) => setAddressInput(e.target.value)}
                  placeholder="Enter delivery address"
                  className="w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-1.5 text-sm font-medium outline-none transition focus:border-[#ff4d2d] placeholder:text-gray-400"
                />

                <button
                  onClick={() => getLatLngByAddress(addressInput)}
                  className="p-2 cursor-pointer rounded-md bg-[#ff4d2d] text-white hover:bg-[#e63e1f] transition"
                >
                  <IoSearchOutline size={16} />
                </button>
                <button
                  onClick={getCurrentLocation}
                  className="p-2 cursor-pointer rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                >
                  <TbCurrentLocation size={16} />
                </button>
              </div>
              <div className="rounded-xl mt-4 overflow-hidden border border-gray-200">
                <div className="flex justify-center items-center w-full h-56">
                  <MapContainer
                    className={"w-full h-full"}
                    center={[markerLocation.lat, markerLocation.lng]}
                    zoom={16}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <RecenterMap location={location} />
                    <Marker
                      position={[markerLocation.lat, markerLocation.lng]}
                      draggable={true}
                      eventHandlers={{ dragend: onDragEnd }}
                    />
                  </MapContainer>
                </div>
              </div>
            </div>

            {/* Map Area */}

            {/* Address Input Section */}

            {/* Contact Info */}
            <div className="px-5 py-4 border-t border-gray-100 flex items-center gap-3">
              <div className="rounded-full bg-orange-100 p-2 text-[#ff4d2d]">
                <FiPhone size={16} />
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500">Contact Number</p>
                <p className="font-semibold text-gray-800">
                  {userData?.mobile || "Not provided"}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Payment Method
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {/* cod on Delivery */}
              <label
                className="flex cursor-pointer items-center gap-2 rounded-xl border-2 p-3 transition"
                style={{
                  borderColor: paymentMethod === "cod" ? "#ff4d2d" : "#e5e7eb",
                  backgroundColor:
                    paymentMethod === "cod" ? "#fff9f6" : "#ffffff",
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 cursor-pointer"
                />
                <div className="flex flex-col">
                  <div className="rounded-full bg-green-100 p-1.5 text-green-600 w-fit">
                    <FaCodepen size={16} />
                  </div>
                  <p className="text-xs font-semibold text-gray-800 mt-1">
                    Cash on Delivery
                  </p>
                </div>
              </label>

              {/* UPI / Card Payment */}
              <label
                className="flex cursor-pointer items-center gap-2 rounded-xl border-2 p-3 transition"
                style={{
                  borderColor: paymentMethod === "card" ? "#ff4d2d" : "#e5e7eb",
                  backgroundColor:
                    paymentMethod === "card" ? "#fff9f6" : "#ffffff",
                }}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 cursor-pointer"
                />
                <div className="flex flex-col">
                  <div className="rounded-full bg-blue-100 p-1.5 text-blue-600 w-fit">
                    <SiVisa size={16} />
                  </div>
                  <p className="text-xs font-semibold text-gray-800 mt-1">
                    Card/UPI
                  </p>
                  <p className="text-xs text-gray-500">Secure Pay</p>
                </div>
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-gray-800">
              Order Summary
            </h2>

            <div className="space-y-3 border-b border-gray-200 pb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-700">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium text-gray-900">
                    ৳{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 text-sm">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Delivery Fee</span>
                <span className="font-semibold text-green-600">
                  {subtotal > 500 ? "Free" : "৳50"}
                </span>
              </div>
              <div className="mt-3 border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-[#ff4d2d]">
                  ৳{total}
                </span>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full rounded-full bg-[#ff4d2d] px-6 py-3 text-center font-semibold text-white shadow-md transition hover:bg-[#e63e1f] disabled:bg-gray-400"
          >
            {paymentMethod === "cod" ? "Place Order" : "Pay Now & Place Order"}
          </button>

          {/* Back to Cart Link */}
          <button
            onClick={() => navigate("/carts")}
            className="w-full rounded-full border border-gray-300 px-6 py-3 text-center font-semibold text-gray-700 transition hover:bg-gray-50"
          >
            Back to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;

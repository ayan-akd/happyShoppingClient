import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

/* eslint-disable react/prop-types */
const CartCard = ({ cartItem, updateCart }) => {
  const { productId, name, photo, price, brand } = cartItem;
  const [quantity, setQuantity] = useState(cartItem.quantity || 1); // Set initial quantity from cartItem
  const { setCartCount } = useContext(AuthContext);
  // Update the quantity in localStorage
  const updateCartInLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    if (updateCart) {
      updateCart(updatedCart); // Update the parent component with the new cart state
    }
    setCartCount(updatedCart.length);
  };

  // Handle item removal from localStorage
  const handleDelete = (id) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = existingCart.filter((item) => item.productId !== id);
    updateCartInLocalStorage(updatedCart);

    // Show toast notification
    toast.success("Item removed from cart!", {
      icon: "🗑️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  // Handle quantity change
  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    // Update the quantity in the cart stored in localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = existingCart.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    updateCartInLocalStorage(updatedCart);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      // Update the quantity in the cart stored in localStorage
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = existingCart.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      updateCartInLocalStorage(updatedCart);
    }
  };

  return (
    <div>
      <div className="rounded-lg border border-gray-200 p-4 shadow-sm md:p-6">
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <a href="#" className="shrink-0 md:order-1">
            <img
              className="hidden h-20 w-20 dark:block"
              src={photo}
              alt="product"
            />
          </a>

          <div className="flex items-center justify-between md:order-3 md:justify-end">
            <div className="flex items-center">
              <button
                type="button"
                id="decrement-button"
                onClick={handleDecrement}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
              >
                <svg
                  className="h-2.5 w-2.5 text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 2"
                >
                  <path stroke="currentColor" d="M1 1h16" />
                </svg>
              </button>
              <input
                type="text"
                id="counter-input"
                value={quantity}
                readOnly
                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none"
              />
              <button
                type="button"
                id="increment-button"
                onClick={handleIncrement}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
              >
                <svg
                  className="h-2.5 w-2.5 text-gray-900"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 18"
                >
                  <path stroke="currentColor" d="M9 1v16M1 9h16" />
                </svg>
              </button>
            </div>
            <div className="text-end md:order-4 md:w-32">
              <p className="text-base font-bold text-gray-900">
                ${price * quantity} {/* Display price * quantity */}
              </p>
            </div>
          </div>

          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <a
              href="#"
              className="text-base font-medium text-gray-900 hover:underline"
            >
              {name}
            </a>
            <p className="text-sm text-gray-500">{brand}</p>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="inline-flex items-center text-sm font-medium text-red-600 hover:underline"
                onClick={() => handleDelete(productId)}
              >
                <svg
                  className="me-1.5 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path stroke="currentColor" d="M6 18 17.94 6M18 18 6.06 6" />
                </svg>
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

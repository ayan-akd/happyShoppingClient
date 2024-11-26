import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import CartCard from "../Component/CartCard";
import PaymentModal from "../Component/Shared/PaymentModal";

const Cart = () => {
  const { user, userData } = useContext(AuthContext);
  const name = user?.displayName?.toUpperCase() || "USER";
  const [cartItems, setCartItems] = useState([]);
  const [voucher, setVoucher] = useState("");
  const [isVoucherApplied, setIsVoucherApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [voucherError, setVoucherError] = useState(""); // State for error message
  const [show, setShow] = useState(false);

  // Fetch cart items from localStorage on component mount
  useEffect(() => {
    const getCartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(getCartItems);
  }, []);

  // Update cart items after removal
  const handleRemoveItem = (updatedCart) => {
    setCartItems(updatedCart);
  };

  // Calculate summary details
  const originalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const savings = cartItems.length ? originalPrice * 0.05 : 0; // 5% savings for example
  const storePickup = cartItems.length ? 9 : 0; // Flat pickup charge
  const tax = cartItems.length ? originalPrice * 0.1 : 0; // 10% tax
  const total = originalPrice - savings + storePickup + tax - discount;

  // Handle voucher code submission
  const handleApplyVoucher = (e) => {
    e.preventDefault();
    if (voucher === "HAPPY10") {
      setDiscount(originalPrice * 0.1); // 10% discount
      setIsVoucherApplied(true);
      setVoucherError(""); // Clear any previous error
    } else {
      setVoucherError("Invalid voucher code"); // Set error message
    }
  };

  const handleConfirmAddress = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const email = userData?.email;
    const state = formData.get("state");
    const zip = formData.get("zip");
    const street = formData.get("street");
    const cardNumber = formData.get("cardNumber");
    const city = formData.get("city");

    const newAddress = {
      email,
      state,
      zip,
      street,
      cardNumber,
      city,
    };
    localStorage.setItem("newAddress", JSON.stringify(newAddress));
    document.getElementById("confirmAddress").close();
    setShow(true);
  };

  const handleCheckOut = () => {
    document.getElementById("confirmAddress").showModal();
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/bg-tips.jpg)",
        }}
      >
        <div className="max-w-screen-xl mx-auto">
          {cartItems.length > 0 ? (
            <section className="py-8 antialiased md:py-16">
              <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h1 className="text-3xl md:text-5xl text-center my-12">
                  {name}&apos;S <span className="text-ylw">Cart</span>
                </h1>
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                  {/* Cart Items */}
                  <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                    <div className="space-y-6">
                      {cartItems.map((item) => (
                        <CartCard
                          key={item.productId}
                          cartItem={item}
                          updateCart={handleRemoveItem}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Summary Section */}
                  <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                    <div className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm sm:p-6">
                      <p className="text-xl font-semibold text-gray-900">
                        Order Summary
                      </p>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500">
                              Original Price
                            </dt>
                            <dd className="text-base font-medium text-gray-900">
                              ${originalPrice.toFixed(2)}
                            </dd>
                          </dl>

                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500">
                              Savings
                            </dt>
                            <dd className="text-base font-medium text-green-600">
                              -${savings.toFixed(2)}
                            </dd>
                          </dl>

                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500">
                              Shipping
                            </dt>
                            <dd className="text-base font-medium text-gray-900">
                              ${storePickup.toFixed(2)}
                            </dd>
                          </dl>

                          <dl className="flex items-center justify-between gap-4">
                            <dt className="text-base font-normal text-gray-500">
                              Tax
                            </dt>
                            <dd className="text-base font-medium text-gray-900">
                              ${tax.toFixed(2)}
                            </dd>
                          </dl>

                          {isVoucherApplied && (
                            <dl className="flex items-center justify-between gap-4">
                              <dt className="text-base font-normal text-gray-500">
                                Voucher Discount
                              </dt>
                              <dd className="text-base font-medium text-green-600">
                                -${discount.toFixed(2)}
                              </dd>
                            </dl>
                          )}
                        </div>

                        <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                          <dt className="text-base font-bold text-gray-900">
                            Total
                          </dt>
                          <dd className="text-base font-bold text-gray-900">
                            ${total.toFixed(2)}
                          </dd>
                        </dl>
                      </div>

                      <button
                        className="flex w-full items-center justify-center rounded-lg bg-ylw px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
                        onClick={() => handleCheckOut()}
                      >
                        Proceed to Checkout
                      </button>
                    </div>

                    {/* Voucher Section */}
                    <div className="space-y-4 rounded-lg border border-gray-200 p-4 shadow-sm sm:p-6">
                      <form className="space-y-4" onSubmit={handleApplyVoucher}>
                        <div>
                          <label
                            htmlFor="voucher"
                            className="mb-2 block text-sm font-medium text-gray-900"
                          >
                            Do you have a voucher or gift card?
                          </label>
                          <input
                            type="text"
                            id="voucher"
                            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500"
                            value={voucher}
                            onChange={(e) => setVoucher(e.target.value)}
                            placeholder="Enter voucher code"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white bg-ylw focus:outline-none focus:ring-4 focus:ring-primary-300"
                        >
                          Apply Code
                        </button>
                      </form>
                      {isVoucherApplied && (
                        <p className="text-green-600 text-sm">
                          Voucher applied successfully!
                        </p>
                      )}
                      {voucherError && (
                        <p className="text-red-600 text-sm">{voucherError}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ) : (
            <div className="max-w-screen-xl w-screen mx-auto">
              <h1 className="text-center font-bold text-5xl my-80">
                No Product Added to Cart Yet!!!
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* payment modal  */}
      {show && (
        <PaymentModal
          total={total}
          setShow={setShow}
          open={true}
        ></PaymentModal>
      )}

      {/* modal here  */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={"confirmAddress"} className="modal">
        <div className="modal-box">
          <h1 className="text-center text-4xl italic font-semibold mb-12">
            Confirm <span className="text-ylw">Shipping Address</span>
          </h1>
          <form
            className="flex flex-col form-control"
            onSubmit={handleConfirmAddress}
          >
            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
              <div className="w-full">
                <h3 className=" mb-2">State</h3>
                <input
                  type="text"
                  name="state"
                  className="text-grey p-4 w-full border-2 rounded-lg "
                  defaultValue={userData?.state}
                />
              </div>
              <div className="w-full">
                <h3 className=" mb-2">City</h3>
                <input
                  name="city"
                  className="text-grey p-4 w-full border-2 rounded-lg"
                  defaultValue={userData?.city}
                />
              </div>
            </div>

            {/* fourth row  */}
            <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
              <div className="w-full">
                <h3 className=" mb-2">Street</h3>
                <input
                  type="text"
                  name="street"
                  className="text-grey p-4 w-full border-2 rounded-lg "
                  defaultValue={userData?.street}
                />
              </div>
              <div className="w-full">
                <h3 className=" mb-2">Zip</h3>
                <input
                  name="zip"
                  className="text-grey p-4 w-full border-2 rounded-lg"
                  defaultValue={userData?.zip}
                />
              </div>
            </div>

            {/* fifth row  */}
            <div className="w-full">
              <h3 className=" mb-2">Card Number</h3>
              <input
                name="cardNumber"
                className="text-grey p-4 w-full border-2 rounded-lg"
                defaultValue={userData?.cardNumber}
              />
            </div>
            <button
              type="submit"
              className="bg-ylw w-fit text-white rounded-md p-2 mt-4 mx-auto"
            >
              Confirm Address
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Cart;

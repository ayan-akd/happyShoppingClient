/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Component/Loading";
import Loader from "../Hooks/Loader";
import CartCard from "../Component/CartCard";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const name = user?.displayName.toUpperCase();
  const {
    data: cartItems,
    isLoading,
    refetch
  } = Loader(`/cart/${user?.email}`, 'cartItems')
  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div
          style={{
            backgroundImage: "url(/bg-tips.jpg)",
          }}
        >
          <div className="max-w-screen-xl mx-auto">
            {cartItems?.length > 0 ? (
              <>
                <h1 className="text-3xl md:text-5xl text-center my-12">
                  {name}'S <span className="text-ylw">Cart</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                  {cartItems.map((item) => (
                    <CartCard
                      key={item._id}
                      cartItem={item}
                      refetch={refetch}
                    ></CartCard>
                  ))}
                </div>
              </>
            ) : (
              <div className=" max-w-screen-xl w-screen mx-auto">
                <h1 className="text-center font-bold text-5xl my-80">
                  No Product Added to Cart Yet!!!
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

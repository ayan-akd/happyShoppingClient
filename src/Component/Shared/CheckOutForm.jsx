/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import axiosPublic from "../../Hooks/axiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import toast from "react-hot-toast";

const CheckOutForm = ({ total, closeModal }) => {
  const { user, userData } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const newAddress = JSON.parse(localStorage.getItem("newAddress")) || [];
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const price = total;
  useEffect(() => {
    axiosPublic
      .post("/payment", {
        price: price,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setError(error.message);
    } else {
      setError("");
    }

    // confirm card payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "dummy@email.com",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      setError(confirmError.message);
    } else {
      if (paymentIntent.status === "succeeded") {
        toast.success(
          `Payment Successful. Transaction ID: ${paymentIntent.id}`,
          {
            icon: "✅",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );

        // post order into database
        const order = {
          email: userData?.email,
          products: cartItems?.map((item) => ({
            productId: item?.productId,
            productName: item?.name,
            price: item?.price,
            quantity: item?.quantity,
          })),
          state: newAddress?.state || userData?.state,
          zip: newAddress?.zip || userData?.zip,
          street: newAddress?.street || userData?.street,
          cardNumber: newAddress?.cardNumber || userData?.cardNumber,
          city: newAddress?.city || userData?.city,
          total: total,
          transactionId: paymentIntent?.id,
        };

        if (user) {
          axiosPublic.post("/orders", order).then((res) => {
            if (res.status === 201) {
              toast.success("Order Placed Successfully", {
                icon: "✅",
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              });
              closeModal();
              setTimeout(() => {
                localStorage.removeItem("cart");
                window.location.reload();
              }, 1000);
            }
          });
        }
        closeModal();
        setTimeout(() => {
          localStorage.removeItem("cart");
          window.location.reload();
        }, 1000);
      }
    }
    setLoading(false);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        ></CardElement>
        <p className="text-red-600 text-center mt-4">{error}</p>

        <div className="text-center my-8">
          <button
            className="btn text-white bg-ylw"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            {loading ? "Processing..." : `PAY $${total.toFixed(2)}`}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckOutForm;

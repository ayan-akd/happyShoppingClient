import { loadStripe } from "@stripe/stripe-js";
import CustomContainer from "../shared/CustomContainer";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../shared/CheckOutForm";
import { useParams } from "react-router-dom";
import Loader from "../shared/Loader";
import useAuth from "../shared/useAuth";
import CustomSpinner from "../shared/CustomSpinner";

const Payment = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { isLoading, data: bookings } = Loader(
    `/bookings?email=${user?.email}`,
    `bookings?email=${user?.email}`
  );

  if (isLoading) {
    return <CustomSpinner></CustomSpinner>;
  }

  const filteredBooking = bookings.find((booking) => booking._id == id);

  const stripePromise = loadStripe(
    import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY
  );

  return (
    <CustomContainer className={`mt-10`}>
      <Elements stripe={stripePromise}>
        <CheckOutForm rowData={filteredBooking}></CheckOutForm>
      </Elements>
    </CustomContainer>
  );
};

export default Payment;

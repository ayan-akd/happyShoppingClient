/* eslint-disable react/prop-types */
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PhotoView } from "react-photo-view";
import Loading from "./Loading";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import ConfirmToast from "./Shared/ConfirmToast";
import axiosPublic from "../Hooks/axiosPublic";
import Loader from "../Hooks/Loader";
import ReviewCard from "./ReviewCard";

const ProductDetailsCard = ({ productDetails }) => {
  const {
    _id,
    name,
    photo,
    description,
    price,
    brand,
    rating,
    department,
    availability,
  } = productDetails;
  const { user, userData, refetch } = useContext(AuthContext);
  const productId = _id;
  const currentTime = new Date().getTime();
  const fullName =
    `${userData?.name?.firstName} ${userData?.name?.middleName} ${userData?.name?.lastName}`.trim();
  const navigate = useNavigate();
  const currentUserPhoto =
    user?.photoURL || "https://images2.imgbox.com/2f/46/t0HrsZQn_o.png";
  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#FAC827",
    inactiveFillColor: "#dcfce7",
  };
  const handleDelete = () => {
    axiosPublic
      .delete(`/products/${_id}`)
      .then((res) => {
        if (res.status === 200) {
          toast("Product Deleted", {
            icon: "✅",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          refetch();
          navigate(-1);
        }
      })
      .catch((error) => {
        toast(error.message, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };
  const confirmDelete = () => {
    const confirmToastId = ConfirmToast({
      message: "Are you sure you want to delete this Product?",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      onConfirm: () => handleDelete(),
      onCancel: () => toast.dismiss(confirmToastId),
    });
  };

  const {
    data: reviews,
    isLoading,
    refetch: reviewRefetch,
  } = Loader(`/reviews/${productId}`, `reviews${productId}`);

  const handleReview = (e) => {
    e.preventDefault();
    const review = e.target.review.value;
    const rating = e.target.rating.value;
    const newReview = {
      review,
      rating,
      date: currentTime,
      productId,
      userName: fullName,
      photo: currentUserPhoto,
      email: user?.email,
    };

    axiosPublic.post("/reviews", newReview).then((res) => {
      const insertedId = parseInt(res.data.insertedId);
      if (insertedId > 0) {
        toast("Review Added", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      reviewRefetch();
    });
  };
  const location = useLocation();
  return (
    <div>
      <div className="max-w-screen-xl mx-auto my-12">
        <main className="mt-10 px-4">
          <div className="mb-4 md:mb-0 w-full mx-auto relative flex lg:flex-row flex-col-reverse justify-between items-center gap-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 leading-tight">
                {name}
              </h2>
              <p className="text-ylw mt-2">By {brand?.toUpperCase()}</p>
              <a
                href="#"
                className="py-2  inline-flex items-center justify-center mb-2"
              >
                {department?.toUpperCase()}
              </a>
              <p className="pb-6 text-gray-700 text-lg leading-relaxed">
                {description}
              </p>
              <p>Price : ${price}</p>
              <p className="mb-2">
                Availability : {availability > 0 ? "In Stock" : "Out Of Stock"}
              </p>
              <Rating
                style={{ maxWidth: 130 }}
                value={rating}
                itemStyles={myStyles}
              ></Rating>
              <div className="flex gap-4 mt-12 text-lg leading-relaxed w-full">
                <button className="btn bg-ylw text-white ">Add To Cart</button>
                <div>
                  {userData?.role === "admin" ? (
                    <Link to={`/update/${productId}`}>
                      <button className="btn bg-ylw text-white ">
                        Edit Product
                      </button>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {userData?.role === "admin" ? (
                    <button
                      onClick={confirmDelete}
                      className="btn bg-ylw text-white "
                    >
                      Delete
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <PhotoView src={photo}>
              <img src={photo} className="w-1/2 rounded" alt="" />
            </PhotoView>
          </div>
          <div className="px-4 mt-10">
            {user ? (
              <h2 className="text-3xl font-semibold">Post A Review:</h2>
            ) : (
              <div>
                <h1 className="text-xl font-semibold mb-10">
                  You Need to{" "}
                  <Link
                    state={location.pathname}
                    className="font-semibold text-ylw"
                    to={"/login"}
                  >
                    Login
                  </Link>{" "}
                  To Review
                </h1>
              </div>
            )}

            <div className="md:w-8/12">
              {user ? (
                <form onSubmit={handleReview} className="flex flex-col">
                  <textarea
                    name="review"
                    className="border-2 border-gray-300 p-2 rounded-md mt-4 h-52"
                    placeholder="Write Your Review Here . . ."
                  ></textarea>
                  {/* rating select */}
                  <select
                    name="rating"
                    className="select select-bordered w-full"
                    required
                    defaultValue="" // Set default value for the select
                  >
                    <option disabled value="">
                      Select Rating...
                    </option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button
                    type="submit"
                    className="bg-ylw w-fit text-white rounded-md p-2 mt-4"
                  >
                    Post Review
                  </button>
                </form>
              ) : (
                ""
              )}
              <div>
                {isLoading ? (
                  <Loading></Loading>
                ) : reviews?.length > 0 ? (
                  <div>
                    <h2 className="text-3xl font-semibold mt-10">Reviews:</h2>
                    <div>
                      {reviews.map((review) => (
                        <ReviewCard
                          key={review._id}
                          review={review}
                          refetch={reviewRefetch}
                        ></ReviewCard>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="mt-12 text-2xl">No Reviews Yet</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductDetailsCard;

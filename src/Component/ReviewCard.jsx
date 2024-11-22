/* eslint-disable react/prop-types */
import { Rating, RoundedStar } from "@smastrom/react-rating";
import ConfirmToast from "./Shared/ConfirmToast";
import toast from "react-hot-toast";
import axiosPublic from "../Hooks/axiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
const ReviewCard = ({ review, refetch }) => {
  const { user } = useContext(AuthContext);
  const formattedDate = new Intl.DateTimeFormat("en-GB").format(
    new Date(review?.date)
  );
  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#000000",
    inactiveFillColor: "#dcfce7",
  };
  const handleEdit = (e) => {
    e.preventDefault();
    const updatedReviewText = e.target.review.value;
    const updatedRating = e.target.rating.value;
    const updatedReview = {
      review: updatedReviewText,
      rating: updatedRating,
      date: new Date().getTime(),
    };
    axiosPublic.put(`/reviews/${review?._id}`, updatedReview).then((res) => {
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
      refetch();
      document.getElementById(review?._id).close();
    });
  };
  const handleDelete = () => {
    axiosPublic
      .delete(`/reviews/${review?._id}`)
      .then((res) => {
        if (res.status === 200) {
          refetch();
          const toastId = toast.success("Review Deleted", {
            icon: "✅",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          setTimeout(() => {
            toast.dismiss(toastId);
          }, 3000);
        }
      })
      .catch((error) => {
        toast.error(error.message, {
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
      message: "Are you sure you want to delete this Review?",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      onConfirm: () => handleDelete(),
      onCancel: () => toast.dismiss(confirmToastId),
    });
  };
  return (
    <div className="mt-12 flex justify-between">
      <div className="chat chat-start">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={review?.photo}></img>
          </div>
        </div>
        <div className="chat-header">{review?.userName}</div>
        <div className="chat-bubble bg-ylw text-white">
          <p className="text-xs">On {formattedDate}</p>
          {review?.review}
          <Rating
            className="mt-2"
            style={{ maxWidth: 130 }}
            value={review?.rating}
            itemStyles={myStyles}
          ></Rating>
        </div>
      </div>
      <div>
        {user?.email === review?.email ? (
          <>
            <button
              onClick={() => document.getElementById(review?._id).showModal()}
              className="btn btn-xs bg-ylw text-white"
            >
              Edit
            </button>
            <button
              onClick={confirmDelete}
              className="btn btn-xs bg-ylw text-white"
            >
              Delete
            </button>
          </>
        ) : (
          ""
        )}
      </div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <dialog id={review?._id} className="modal">
        <div className="modal-box">
          <h1 className="text-center text-4xl italic font-semibold mb-12">
            Update <span className="text-ylw">Review</span>
          </h1>
          <form className="flex flex-col" onSubmit={handleEdit}>
            <textarea
              name="review"
              className="border-2 border-gray-300 p-2 rounded-md mt-4 h-52"
              placeholder="Write Your Review Here . . ."
              defaultValue={review?.review}
            ></textarea>
            {/* rating select */}
            <select
              name="rating"
              className="select select-bordered w-full"
              defaultValue={review?.rating}
              required
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
              className="bg-ylw w-fit text-white rounded-md p-2 mt-4 mx-auto"
            >
              Update Review
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

export default ReviewCard;

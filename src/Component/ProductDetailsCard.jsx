/* eslint-disable react/prop-types */
import { useContext } from "react";
import CommentCard from "./CommentCard";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PhotoView } from "react-photo-view";
import Loading from "./Loading";
import { Rating, RoundedStar } from "@smastrom/react-rating";
import ConfirmToast from "./Shared/ConfirmToast";
import axiosPublic from "../Hooks/axiosPublic";

const ProductDetailsCard = ({ productDetails }) => {
  const { _id, name, photo, description, price, brand, rating, department } =
    productDetails;
  const { user, userData, refetch } = useContext(AuthContext);
  const productId = _id;
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

  // const axiosSecure = useAxios();
  // const {
  //   data: commentsData,
  //   isLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["comments", productId],
  //   queryFn: async () => {
  //     const response = await axiosSecure.get(`/comments/${productId}`);
  //     return response.data;
  //   },
  // });
  // const handleComment = (e) => {
  //   e.preventDefault();
  //   const comment = e.target.comment.value;
  //   const newComment = {
  //     comment,
  //     productId,
  //     currentUserName,
  //     currentUserPhoto,
  //     email: currentEmail,
  //   };

  //   axiosSecure.post("/comments", newComment).then((res) => {
  //     const insertedId = parseInt(res.data.insertedId);
  //     if (insertedId > 0) {
  //       toast("Comment Added", {
  //         icon: "✅",
  //         style: {
  //           borderRadius: "10px",
  //           background: "#333",
  //           color: "#fff",
  //         },
  //       });
  //     }
  //     refetch();
  //   });
  // };
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

            {/* <div className="md:w-8/12">
              { user ? (
                <form 
                onSubmit={handleComment} 
                className="flex flex-col">
                  <textarea
                    name="comment"
                    className="border-2 border-gray-300 p-2 rounded-md mt-4 h-52"
                    placeholder="Write Your Comment Here . . ."
                  ></textarea>
                  <button
                    type="submit"
                    className="bg-ylw w-fit text-white rounded-md p-2 mt-4"
                  >
                    Post Comment
                  </button>
                </form>
              ) : (
                ""
              )}
              <div>
                {isLoading ? (
                  <Loading></Loading>
                ) : commentsData?.length > 0 ? (
                  <div>
                    <h2 className="text-3xl font-semibold mt-10">Comments:</h2>
                    <div>
                      {commentsData.map((comment) => (
                        <CommentCard
                          key={comment._id}
                          comment={comment}
                          refetch={refetch}
                        ></CommentCard>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="mt-12 text-2xl">No Comments Yet</p>
                )}
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductDetailsCard;

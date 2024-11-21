/* eslint-disable react/prop-types */
import { useContext } from "react";
import CommentCard from "./CommentCard";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";
import { PhotoView } from "react-photo-view";
import Loading from "./Loading";

const ProductDetailsCard = ({ productDetails }) => {
  const { _id, name, category, shortDis, longDis, photo, email, userName } =
    productDetails;
  const { user } = useContext(AuthContext);
  const productId = _id;
  const currentEmail = user?.email;
  const currentUserName = user?.displayName;
  const currentUserPhoto =
    user?.photoURL || "https://images2.imgbox.com/2f/46/t0HrsZQn_o.png";

  let cat = category;
  if (category === "destinations") {
    cat = "Destinations";
  } else if (category === "tips") {
    cat = "Tips & Advice";
  } else if (category === "stories") {
    cat = "Stories & Experiences";
  } else if (category === "food") {
    cat = "Food & Cuisine";
  } else if (category === "culture") {
    cat = "Culture & Insights";
  }
  const axiosSecure = useAxios();
  const {
    data: commentsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["comments", productId],
    queryFn: async () => {
      const response = await axiosSecure.get(`/comments/${productId}`);
      return response.data;
    },
  });
  const handleComment = (e) => {
    e.preventDefault();
    const comment = e.target.comment.value;
    const newComment = {
      comment,
      productId,
      currentUserName,
      currentUserPhoto,
      email: currentEmail,
    };

    axiosSecure.post("/comments", newComment).then((res) => {
      const insertedId = parseInt(res.data.insertedId);
      if (insertedId > 0) {
        toast("Comment Added", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
      refetch();
    });
  };
  const location = useLocation();
  return (
    <div>
      <div className="max-w-screen-xl mx-auto my-12">
        <main className="mt-10 px-4">
          <div className="mb-4 md:mb-0 w-full mx-auto relative">
            <div>
              <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 leading-tight">
                {name}
              </h2>
              <p>by {userName}</p>
              <a
                href="#"
                className="py-2 text-ylw inline-flex items-center justify-center mb-2"
              >
                {cat}
              </a>
            </div>

            <PhotoView src={photo}>
              <img src={photo} className="w-full rounded" alt="" />
            </PhotoView>
          </div>

          <div>
            <div className="px-4 mt-12 text-gray-700 text-lg leading-relaxed w-full">
              <p className="pb-6">
                <span className="font-bold">About this Blog:</span> {shortDis}
              </p>
              <p className="pb-6">
                <span className="font-bold">Full Blog:</span> {longDis}
              </p>
              {email === currentEmail ? (
                <div className="flex justify-end">
                  <Link to={`/update/${productId}`}>
                    <button className="btn bg-ylw text-white ">
                      Edit Blog
                    </button>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="px-4 mt-10">
            {user ? (
              email !== currentEmail ? (
                <h2 className="text-3xl font-semibold">Post A Comment:</h2>
              ) : (
                <div>
                  <h1 className="text-xl font-semibold mb-10">
                    Cannot comment on your own Post.
                  </h1>
                </div>
              )
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
                  To Comment
                </h1>
              </div>
            )}

            <div className="md:w-8/12">
              {email !== currentEmail && user ? (
                <form onSubmit={handleComment} className="flex flex-col">
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductDetailsCard;

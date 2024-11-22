import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";
import { PhotoView } from "react-photo-view";

/* eslint-disable react/prop-types */
const CartCard = ({ cartItem, refetch }) => {
  const { _id, name, photo } = cartItem;
  // let cat = category;
  // if (category === "destinations") {
  //   cat = "Destinations";
  // } else if (category === "tips") {
  //   cat = "Tips & Advice";
  // } else if (category === "stories") {
  //   cat = "Stories & Experiences";
  // } else if (category === "food") {
  //   cat = "Food & Cuisine";
  // } else if (category === "culture") {
  //   cat = "Culture & Insights";
  // }
  const axiosSecure = useAxios();
  const handleDelete = (id) => {
    axiosSecure.delete(`/wishlists/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        toast("Deleted From Your Bookmarks", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        refetch();
      }
    });
  };
  return (
    <div>
      <div className="card card-compact bg-base-100 md:h-[500px]">
        <figure>
          <PhotoView src={photo}>
            <img className="md:h-[400px]" src={photo} alt="Shoes" />
          </PhotoView>
        </figure>
        <div className="card-body">
          <div className="card-actions mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

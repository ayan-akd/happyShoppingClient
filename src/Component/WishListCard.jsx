import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";
import { PhotoView } from "react-photo-view";

/* eslint-disable react/prop-types */
const WishListCard = ({ Wishlist,refetch }) => {
  const { _id, name, category, shortDis, photo ,blogId} = Wishlist;
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
  const handleDelete = id => {
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
         <Link to={`/blogs/${blogId}`}>
         <div title={name} className="card-title">
            {name.length > 62 ? <p>{name.slice(0, 55)}. . . . </p> : name}
          </div>
          <p className="text-grn font-semibold">{cat}</p>
          <div title={shortDis}>
            {shortDis.length > 100 ? (
              <p>{shortDis.slice(0, 75)}. . . . . .</p>
            ) : (
              shortDis
            )}
          </div>
         </Link>
          <div className="card-actions mt-2">
            <Link to={`/blogs/${blogId}`}>
              <motion.button
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
                className="btn hover:bg-grn bg-grn text-white btn-sm md:btn-md"
              >
                Details
              </motion.button>
            </Link>
            <motion.button
              onClick={() => handleDelete(_id)}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              className="btn hover:bg-grn bg-grn text-white btn-sm md:btn-md"
            >
              Delete
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishListCard;

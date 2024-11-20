import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { PhotoView } from "react-photo-view";

/* eslint-disable react/prop-types */
const BlogCard = ({ blog }) => {
  const { _id, name, category, shortDis, longDis, photo, timestamp, userName } =
    blog;
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
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const blogId = _id;
  const newWishlist = {
    name,
    category,
    shortDis,
    longDis,
    email,
    photo,
    timestamp,
    userName,
    blogId,
  };
  const axiosSecure = useAxios();
  const handleAddToWishlist = () => {
    if(user){
      axiosSecure
      .post("/wishlists", newWishlist)
      .then((res) => {
        const insertedId = parseInt(res.data.insertedId);
        if (insertedId > 0) {
          toast("Bookmarked", {
            icon: "✅",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          toast("Duplicate Entry: This blog is already in your Bookmark", {
            icon: "❌",
            style: {
              borderRadius: "10px",
              background: "#f00",
              color: "#fff",
            },
          });
        } else {
          console.error(error);
        }
      });
    }
    else{
      toast("Please Login First", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#f00",
          color: "#fff",
        },
      });
    }
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
          <Link to={`/blogs/${_id}`}>
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
            <Link to={`/blogs/${_id}`}>
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
              onClick={handleAddToWishlist}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              className="btn hover:bg-grn bg-grn text-white btn-sm md:btn-md"
            >
              Add To Bookmark
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

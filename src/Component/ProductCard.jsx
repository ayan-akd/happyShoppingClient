import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PhotoView } from "react-photo-view";
import { FaDollarSign, FaStar } from "react-icons/fa6";
import toast from "react-hot-toast";

/* eslint-disable react/prop-types */
const ProductCard = ({ product }) => {
  const { _id, name, photo, description, price, brand, rating } = product;

  const handleAddToCart = () => {
   const cartItem = {
      productId: _id,
      name,
      photo,
      price,
      brand,
      quantity: 1,
    };
    //add to local storage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the item is already in the cart
    const isItemInCart = existingCart.some((item) => item.productId === _id);
  
    if (!isItemInCart) {
      // Add the new item to the cart
      existingCart.push(cartItem);
  
      // Save the updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(existingCart));
  
      // Show success toast
      toast("Product Added To Cart", {
        icon: "✅",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      // Item is already in the cart, show a message
      toast("Product Already Added To Cart", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }

  return (
    <div>
      <div className="card card-compact bg-base-100 md:h-[500px]">
        <motion.figure
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.3 },
          }}
          className=""
        >
          <PhotoView src={photo}>
            <img
              className="md:h-[400px] w-full object-contain"
              src={photo}
              alt="images"
            />
          </PhotoView>
        </motion.figure>
        <div className="card-body">
          <Link to={`/products/${_id}`}>
            <div title={name} className="card-title">
              <div>
                {name.length > 62 ? <p>{name.slice(0, 55)}. . . . </p> : name}
              </div>
              <div className="absolute right-0 flex items-center pr-3 text-ylw">
                <FaDollarSign className="text-rose-600" />
                {price}
              </div>
            </div>
            <div className="flex items-center gap-1 text-lg">
              <p className="text-ylw font-semibold">{brand}</p>
              <FaStar className="text-ylw" />
              {rating}
            </div>
            <div title={description}>
              {description.length > 100 ? (
                <p>{description.slice(0, 75)}. . . . . .</p>
              ) : (
                description
              )}
            </div>
          </Link>
          <div className="card-actions mt-2">
            <Link to={`/products/${_id}`}>
              <motion.button
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.1 },
                }}
                whileTap={{ scale: 0.9 }}
                className="btn hover:bg-ylw bg-ylw text-white btn-sm md:btn-md"
              >
                Details
              </motion.button>
            </Link>
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              onClick={handleAddToCart}
              whileTap={{ scale: 0.9 }}
              className="btn hover:bg-ylw bg-ylw text-white btn-sm md:btn-md"
            >
              Add To Cart
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

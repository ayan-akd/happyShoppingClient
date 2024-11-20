import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PhotoView } from "react-photo-view";
import { FaDollarSign, FaStar } from "react-icons/fa6";

/* eslint-disable react/prop-types */
const ProductCard = ({ product }) => {
  const { _id, name, photo, description, price, brand, rating } = product;

  return (
    <div>
      <div className="card card-compact bg-base-100 md:h-[500px]">
        <figure className="">
          <PhotoView src={photo}>
            <img className="md:h-[400px]" src={photo} alt="images" />
          </PhotoView>
        </figure>
        <div className="card-body">
          <Link to={`/products/${_id}`}>
            <div title={name} className="card-title">
              <dv>
                {name.length > 62 ? <p>{name.slice(0, 55)}. . . . </p> : name}
              </dv>
              <div className="absolute right-0 flex items-center pr-3 text-grn">
                <FaDollarSign className="text-rose-600" />
                {price}
              </div>
            </div>
            <div className="flex items-center gap-1 text-lg">
              <p className="text-grn font-semibold">{brand}</p>
              <FaStar className="text-grn" />
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
                className="btn hover:bg-grn bg-grn text-white btn-sm md:btn-md"
              >
                Details
              </motion.button>
            </Link>
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              className="btn hover:bg-grn bg-grn text-white btn-sm md:btn-md"
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

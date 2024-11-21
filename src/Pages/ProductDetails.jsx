import { useParams } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ProductDetailsCard from "../Component/ProductDetailsCard";
import Loading from "../Component/Loading";
import Loader from "../Hooks/Loader";

const ProductDetails = () => {
  const axiosSecure = useAxios();
  const { id } = useParams();
  console.log(id);

  // const { data: productDetails, isLoading } = Loader(
  //   `/products/${id}`,
  //   "productDetails"
  // );
  // console.log(productDetails);

  // return (
  //   <div
  //     style={{
  //       backgroundImage: "url(/bg-tips.jpg)",
  //     }}
  //   >
  //     <div className="max-w-screen-xl mx-auto">
  //       {isLoading ? (
  //         <Loading></Loading>
  //       ) : (
  //         <div>
  //           <ProductDetailsCard
  //             productDetails={productDetails}
  //           ></ProductDetailsCard>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default ProductDetails;

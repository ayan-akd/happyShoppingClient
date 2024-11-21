import { useParams } from "react-router-dom";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ProductDetailsCard from "../Component/ProductDetailsCard";
import Loading from "../Component/Loading";

const ProductDetails = () => {
  const axiosSecure = useAxios();
  const { id } = useParams();
  console.log(id);
  const { data: productDetails, isLoading } = useQuery({
    queryKey: ["productDetails"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/products/${id}`);
      return response.data;
    },
  });
  console.log(productDetails);

  return (
    <div
      style={{
        backgroundImage: "url(/bg-tips.jpg)",
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <div>
            <ProductDetailsCard productDetails={productDetails}></ProductDetailsCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

import { useParams } from "react-router-dom";
import ProductDetailsCard from "../Component/ProductDetailsCard";
import Loading from "../Component/Loading";
import Loader from "../Hooks/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: productDetails, isLoading } = Loader(
    `/products/${id}`,
    "productDetails"
  );
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
            <ProductDetailsCard
              productDetails={productDetails}
            ></ProductDetailsCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

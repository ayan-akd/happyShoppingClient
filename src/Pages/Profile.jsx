import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import ProfileCard from "../Component/ProfileCard";
import Loading from "../Component/Loading";
import Loader from "../Hooks/Loader";

const Profile = () => {
  const { userData, roleLoading } = useContext(AuthContext);
  const {
    data: orders,
    isLoading,
  } = Loader(`/orders?email=${userData?.email}`, "orders");

  return (
    <div>
      {roleLoading ? (
        <Loading></Loading>
      ) : (
        <div className="max-w-screen-xl mx-auto p-10">
          <ProfileCard userData={userData}></ProfileCard>
          <div>
            <h1 className="text-3xl md:text-5xl text-center pt-16 my-12">
              Purchase <span className="text-ylw">History</span>
            </h1>
            {!isLoading && orders?.length > 0 ? (
              <div>
                {orders?.map((order) => (
                  <div
                    key={order._id}
                    className="bg-yellow-50 shadow-lg rounded-lg p-6 mb-6 border border-yellow-300"
                  >
                    {/* Order Total */}
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-2xl font-bold text-yellow-800">
                        Order Total: ${order?.total}
                      </h2>
                      <p className="text-sm text-yellow-600">
                        Transaction ID: {order?.transactionId}
                      </p>
                    </div>

                    {/* Products List */}
                    <div className="bg-white shadow-md rounded-lg p-4 border border-yellow-200">
                      <h3 className="text-xl font-semibold text-yellow-700 mb-3">
                        Products
                      </h3>
                      {order?.products?.map((product, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center mb-2 bg-yellow-100 rounded-lg p-3"
                        >
                          <p className="text-yellow-800 font-medium">
                            {product.productName}
                          </p>
                          <p className="text-yellow-700">
                            Price: ${product.price}
                          </p>
                          <p className="text-yellow-700">
                            Quantity: {product.quantity}
                          </p>
                          <p className="text-yellow-900 font-bold">
                            Subtotal: ${product.price * product.quantity}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order Details */}
                    <div className="mt-4 flex justify-between items-center">
                      {/* Left: Email and Address */}
                      <div>
                        <p className="text-yellow-700">
                          <span className="font-medium">Email:</span>{" "}
                          {order?.email}
                        </p>
                        <p className="text-yellow-700">
                          <span className="font-medium">Address:</span>{" "}
                          {order?.street}, {order?.city}, {order?.state} -{" "}
                          {order?.zip}
                        </p>
                      </div>

                      {/* Right: Ordered At */}
                      <div>
                        <p className="text-yellow-700 text-sm text-right">
                          <span className="font-medium">Ordered At:</span>{" "}
                          {new Date(order?.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h1 className="text-center font-bold text-3xl text-yellow-700">
                No History Found!!!
              </h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

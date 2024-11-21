/* eslint-disable react/no-unescaped-entities */
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import WishListCard from "../Component/WishListCard";
import Loading from "../Component/Loading";

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const name = user?.displayName.toUpperCase();
  const axiosSecure = useAxios();
  const {
    data: wishlists,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["wishlists"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/wishlists?email=${user?.email}`);
      return response.data;
    },
  });

  return (
    <div>
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div
          style={{
            backgroundImage: "url(/bg-tips.jpg)",
          }}
        >
          <div className="max-w-screen-xl mx-auto">
            {wishlists?.length > 0 ? (
              <>
                <h1 className="text-3xl md:text-5xl text-center my-12">
                  {name}'S <span className="text-ylw">Bookmarks</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                  {wishlists.map((Wishlist) => (
                    <WishListCard
                      key={Wishlist._id}
                      Wishlist={Wishlist}
                      refetch={refetch}
                    ></WishListCard>
                  ))}
                </div>
              </>
            ) : (
              <div className=" max-w-screen-xl w-screen mx-auto">
                <h1 className="text-center font-bold text-5xl my-80">
                  No Bookmarks Found!!!
                </h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;

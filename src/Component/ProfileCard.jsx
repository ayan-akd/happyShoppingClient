import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import userLogo from "/user.png";
/* eslint-disable react/prop-types */
const ProfileCard = ({ userData }) => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {/* profile card section */}
      <div className="w-full mt-12 flex justify-center pb-44">
        <div className="h-56 w-72 absolute flex justify-center items-center">
          <img
            className="object-cover h-20 w-20 rounded-full"
            src={userLogo}
            alt=""
          />
        </div>

        <div
          className="
          h-56
          mx-4
          w-5/6
          bg-rose
          rounded-3xl
          shadow-md
          sm:w-80 sm:mx-0
        "
        >
          <div className="h-1/2 w-full flex justify-between items-baseline px-3 py-5"></div>

          <div
            className="
            bg-white
            h-auto
            w-full
            rounded-3xl
            flex flex-col
            justify-around
            items-center
            shadow-xl
          "
          >
            <div className="w-full h-1/2 mt-12 mb-6 px-2 flex flex-col justify-center items-center space-y-1">
              <h1 className="font-bold">Name: {user?.displayName}</h1>
              <h1 className="font-bold">Role: {userData?.role?.toUpperCase()}</h1>
              <h1 className="font-bold">Email: {userData?.email}</h1>
              <h1 className="font-bold text-center">
                Address
              </h1>
              <h1 className="text-gray-700 text-sm">State: {userData?.state}</h1>
              <h1 className="text-gray-700 text-sm">City: {userData?.city}</h1>
              <h1 className="text-gray-700 text-sm">Street Address: {userData?.street}</h1>
              <h1 className="text-gray-700 text-sm">Zip Code: {userData?.zip}</h1>
              <h1 className="text-gray-700 text-sm">Card Number: {userData?.cardNumber}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

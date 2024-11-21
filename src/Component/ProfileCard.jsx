import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { IoCameraOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import axiosPublic from "../Hooks/axiosPublic";

/* eslint-disable react/prop-types */
const ProfileCard = ({ userData }) => {
  const { user } = useContext(AuthContext);

  const handleUpdateData = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const firstName = formData.get("firstName");
    const middleName = formData.get("middleName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const role = formData.get("role");
    const state = formData.get("state");
    const zip = formData.get("zip");
    const street = formData.get("street");
    const cardNumber = formData.get("cardNumber");
    const city = formData.get("city");

    if (!/^\d{16}$/.test(cardNumber)) {
      toast("Card number must be exactly 16 digits", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    }

    const updatedUser = {
      name: {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
      },
      email: email,
      role: role,
      state: state,
      zip: zip,
      street: street,
      cardNumber: cardNumber,
      city: city,
    };

    axiosPublic.put(`/users?email=${user?.email}`, updatedUser).then((res) => {
      if (res.status === 201) {
        toast("User Updated", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });

        window.location.reload();
      }
    });
  };

  return (
    <div>
      <section className="py-10 my-auto ">
        <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
          <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center ">
            <div className="">
              <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 ">
                Profile
              </h1>
              <h2 className="text-grey text-sm mb-4 ">Your Profile</h2>
              <form onSubmit={handleUpdateData} className="form-control">
                {/* Cover Image */}
                <div className="w-full rounded-sm bg-[url('https://images.unsplash.com/photo-1449844908441-8829872d2607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHxob21lfGVufDB8MHx8fDE3MTA0MDE1NDZ8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat items-center">
                  {/* Profile Image */}
                  <div className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-[url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxwcm9maWxlfGVufDB8MHx8fDE3MTEwMDM0MjN8MA&ixlib=rb-4.0.3&q=80&w=1080')] bg-cover bg-center bg-no-repeat">
                    <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">
                      <input
                        type="file"
                        name="profile"
                        id="upload_profile"
                        hidden
                      />
                      <label htmlFor="upload_profile">
                        <IoCameraOutline className="text-blue-600 mx-auto text-xl" />
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <input type="file" name="cover" id="upload_cover" hidden />
                    <label
                      htmlFor="upload_cover"
                      className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold cursor-pointer"
                    >
                      Cover
                      <IoCameraOutline className="text-blue-600 mx-auto text-xl" />
                    </label>
                  </div>
                </div>
                <h2 className="text-center mt-1 font-semibold ">
                  Upload Profile and Cover Image
                </h2>

                {/* name  */}
                <div className="flex lg:flex-row flex-col gap-2 justify-center w-full">
                  <div className="w-full mb-4 lg:mt-6">
                    {/* first name  */}
                    <label htmlFor="firstName" className="mb-2 ">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="mt-2 p-4 w-full border-2 rounded-lg "
                      defaultValue={userData?.name?.firstName}
                      placeholder="Enter your first name"
                    />
                  </div>

                  {/* middle name  */}
                  <div className="w-full mb-4 lg:mt-6">
                    <label htmlFor="middleName" className="">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      className="mt-2 p-4 w-full border-2 rounded-lg "
                      defaultValue={userData?.name?.middleName}
                      placeholder="Enter your middle name"
                    />
                  </div>

                  {/* last name  */}
                  <div className="w-full mb-4 lg:mt-6">
                    <label htmlFor="lastName" className="">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="mt-2 p-4 w-full border-2 rounded-lg "
                      defaultValue={userData?.name?.lastName}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full">
                    <h3 className=" mb-2">Role</h3>
                    <input
                      type="text"
                      name="role"
                      className="text-grey p-4 w-full border-2 rounded-lg "
                      defaultValue={
                        userData?.role
                          ? userData?.role.charAt(0).toUpperCase() +
                            userData?.role.slice(1)
                          : ""
                      }
                      readOnly
                    />
                  </div>
                  <div className="w-full">
                    <h3 className=" mb-2">Email</h3>
                    <input
                      name="email"
                      className="text-grey p-4 w-full border-2 rounded-lg"
                      defaultValue={userData?.email}
                    />
                  </div>
                </div>

                {/* Third row */}
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full">
                    <h3 className=" mb-2">State</h3>
                    <input
                      type="text"
                      name="state"
                      className="text-grey p-4 w-full border-2 rounded-lg "
                      defaultValue={userData?.state}
                    />
                  </div>
                  <div className="w-full">
                    <h3 className=" mb-2">City</h3>
                    <input
                      name="city"
                      className="text-grey p-4 w-full border-2 rounded-lg"
                      defaultValue={userData?.city}
                    />
                  </div>
                </div>

                {/* fourth row  */}
                <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                  <div className="w-full">
                    <h3 className=" mb-2">Street</h3>
                    <input
                      type="text"
                      name="street"
                      className="text-grey p-4 w-full border-2 rounded-lg "
                      defaultValue={userData?.street}
                    />
                  </div>
                  <div className="w-full">
                    <h3 className=" mb-2">Zip</h3>
                    <input
                      name="zip"
                      className="text-grey p-4 w-full border-2 rounded-lg"
                      defaultValue={userData?.zip}
                    />
                  </div>
                </div>

                {/* fifth row  */}
                <div className="w-full">
                  <h3 className=" mb-2">Card Number</h3>
                  <input
                    name="cardNumber"
                    className="text-grey p-4 w-full border-2 rounded-lg"
                    defaultValue={userData?.cardNumber}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full p-4 rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileCard;

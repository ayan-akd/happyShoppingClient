import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../Provider/AuthProvider";
import { motion } from "framer-motion";
import axiosPublic from "../Hooks/axiosPublic";

const Register = () => {
  const { createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleRegister = (e) => {
    e.preventDefault();
    const firstName = e.target.fName.value;
    const middleName = e.target.mName.value;
    const lastName = e.target.lName.value;
    const name = middleName
      ? `${firstName} ${middleName} ${lastName}`
      : `${firstName} ${lastName}`;
    const state = e.target.state.value;
    const city = e.target.city.value;
    const zip = e.target.zip.value;
    const street = e.target.street.value;
    const cardNumber = e.target.cardNumber.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const userInfo = {
      name: {
        firstName,
        middleName,
        lastName,
      },
      state,
      city,
      zip,
      street,
      cardNumber,
      email,
      role: "guest",
    };

    // validation
    if (password.length < 6) {
      toast("Password must be at least 6 characters", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast("Password must contain at least one capital letter", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    } else if (!/[!@#$%^&*()_+]/.test(password)) {
      toast("Password must contain at least one special characters", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      return;
    } else if (!/^\d{16}$/.test(cardNumber)) {
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

    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
        });
        navigate(location?.state ? location.state : "/");
        axiosPublic.post("/users", userInfo);
        toast("Registered successfully", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((error) => {
        toast(error.message, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      });
  };

  return (
    <div className="bg-base-200">
      <div className="max-w-screen-xl mx-auto">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col gap-10">
            <div className="text-center">
              <h1 className="text-5xl font-bold">
                Be A <span className="font-semibold text-grn">Member</span>
              </h1>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleRegister} className="p-5">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">First Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="First Name....."
                    name="fName"
                    required
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">Middle Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Middle Name (Optional)"
                    name="mName"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">Last Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name....."
                    name="lName"
                    required
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">Mailing Address</span>
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="State....."
                      name="state"
                      required
                      className="input input-bordered"
                    />
                    <input
                      type="text"
                      placeholder="City....."
                      name="city"
                      required
                      className="input input-bordered"
                    />
                    <input
                      type="number"
                      placeholder="Zip Code....."
                      name="zip"
                      required
                      className="input input-bordered"
                    />
                    <input
                      type="text"
                      placeholder="Street Address....."
                      name="street"
                      required
                      className="input input-bordered col-span-3"
                    />
                    <input
                      type="number"
                      placeholder="Card Number....."
                      name="cardNumber"
                      required
                      className="input input-bordered col-span-3"
                    />
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email....."
                    name="email"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password....."
                    name="password"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <p className="label-text-alt mt-3 text-lg">
                      Already have an account?{" "}
                      <Link to={"/login"}>
                        <span className="font-semibold text-grn">Sign in</span>
                      </Link>
                    </p>
                  </label>
                </div>
                <div className="form-control mt-6 space-y-5">
                  <motion.button
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.1 },
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="btn bg-grn text-white hover:bg-grn"
                  >
                    Register
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

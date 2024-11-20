import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiLogoGoogle } from "react-icons/bi";
import { useContext } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../Provider/AuthProvider";
import { motion } from "framer-motion";

const Register = () => {
  const { googleLogin, createUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

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
    }

    createUser(email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        });
        navigate(location?.state ? location.state : "/");
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

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        navigate(location?.state ? location.state : "/");
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
              <form onSubmit={handleRegister} className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">Your Name</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Your Name....."
                    name="name"
                    required
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-xl">Photo</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Photo Url....."
                    name="photo"
                    className="input input-bordered"
                  />
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
                  <p className="text-center">Or</p>
                </div>
              </form>
              <div className="flex items-center justify-center mb-5 px-8">
                <motion.button
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleGoogleLogin}
                  className="w-full btn bg-grn text-white hover:bg-grn"
                >
                  <BiLogoGoogle></BiLogoGoogle>Register with Google
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { Link, useNavigate } from "react-router-dom";
// import { BiLogoGoogle } from "react-icons/bi";
import { useContext } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInUser(email, password)
      .then(() => {
        navigate("/");
        toast("Login Successful", {
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
        <div className="hero min-h-screen ">
          <div className="hero-content flex-col gap-10">
            <div className="text-center">
              <h1 className="text-5xl font-bold">Welcome Back</h1>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form onSubmit={handleLogin} className="card-body">
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
                      Do not have an account?{" "}
                      <Link to={"/register"}>
                        <span className="font-semibold text-ylw">Sign up</span>
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
                    className="btn bg-ylw text-white hover:bg-ylw"
                  >
                    Login
                  </motion.button>
                  {/* <p className="text-center">Or</p> */}
                </div>
              </form>
              {/* <div className="flex items-center justify-center mb-5 px-8">
                <motion.button
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.1 },
                  }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleGoogleLogin}
                  className="btn w-full bg-ylw text-white hover:bg-ylw"
                >
                  <BiLogoGoogle></BiLogoGoogle>Login with Google
                </motion.button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

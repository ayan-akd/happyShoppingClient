import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion } from "framer-motion";
// import { MdOutlineDarkMode, MdDarkMode } from "react-icons/md";

import toast from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const logOut = () => {
    signOutUser()
      .then(() => {
        toast("Logout Successful", {
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
  //   const [theme, setTheme] = useState("light");
  //   const toggleTheme = () => {
  //     setTheme(theme === "dark" ? "light" : "dark");
  //   };
  //   useEffect(() => {
  //     document.querySelector("html").setAttribute("data-theme", theme);
  //   }, [theme]);

  const navLinks = (
    <>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "font-extrabold bg-grn text-white mr-1"
              : "mr-1"
          }
          to={"/"}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "font-extrabold bg-grn text-white mr-1"
              : "mr-1"
          }
          to={"/add"}
        >
          Add Products
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "font-extrabold bg-grn text-white mr-1"
              : "mr-1"
          }
          to={"/blogs"}
        >
          All Blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "font-extrabold bg-grn text-white mr-1"
              : "mr-1"
          }
          to={"/featured"}
        >
          Featured Blogs
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive, isPending }) =>
            isPending
              ? "pending"
              : isActive
              ? "font-extrabold bg-grn text-white mr-1"
              : "mr-1"
          }
          to={"/wishlist"}
        >
          Bookmarks
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="bg-cyan-100 bg-opacity-50 backdrop-blur-lg left-0 right-0 sticky top-0 z-10">
      <div className="navbar max-w-screen-xl mx-auto p-4">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link to={"/"}>
            <div className="flex items-center ">
              <img
                className="md:w-3/12 w-6/12 mr-1 md:mr-3"
                src="/logo2.png"
                alt=""
              />
              <span className="text-lg md:text-2xl">Wander</span>{" "}
              <span className="text-grn text-lg md:text-2xl font-semibold">
                land
              </span>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-bottom dropdown-end flex items-center">
              <div className="md:visible invisible">
                <p className="text-lg md:mr-5">{user?.displayName}</p>
              </div>
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {user?.photoURL ? (
                    <img src={user.photoURL} />
                  ) : (
                    <img src="/user.png" />
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box"
              >
                <li>
                  <p className="text-xl md:hidden">{user?.displayName}</p>
                </li>
                <li>
                  <a className="text-xl" onClick={logOut}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row text-center items-center">
              <Link to={"/login"}>
                <motion.button
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.1 },
                  }}
                  className="btn bg-grn text-white btn-xs md:btn-md hover:bg-grn border-none"
                >
                  Login
                </motion.button>
              </Link>
              <p className="text-lg mx-2">or</p>
              <Link to={"/register"}>
                <motion.button
                  whileHover={{
                    scale: 1.2,
                    transition: { duration: 0.1 },
                  }}
                  className="btn bg-grn text-white btn-xs md:btn-md hover:bg-grn border-none"
                >
                  Register
                </motion.button>
              </Link>
            </div>
          )}
          {/* <div className="ml-2 flex items-center justify-center">
            <label className="swap swap-rotate">
              <input onClick={toggleTheme} type="checkbox" />
              <div className="swap-on">
                {" "}
                <MdDarkMode className="md:text-3xl text-yellow-500"></MdDarkMode>{" "}
              </div>
              <div className="swap-off">
                {" "}
                <MdOutlineDarkMode className="md:text-3xl text-black"></MdOutlineDarkMode>{" "}
              </div>
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

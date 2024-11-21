import { Link } from "react-router-dom";
import Navbar from "../Component/Shared/NavBar";
import Footer from "../Component/Shared/Footer";

const NotFound = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/404.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center">
          <div>
            <h2 className="md:text-6xl text-3xl text-white font-bold">
              WHOOPS… PAGE NOT FOUND
            </h2>
            <p className="text-white font-semibold my-3">
              Page does not exist or some other error occurred. Go to our{" "}
              <span className="text-ylw">
                <Link to={"/"}>Home page</Link>
              </span>
            </p>
            <a href="/" className="btn bg-ylw text-white border-none">
              Back to Home
            </a>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default NotFound;

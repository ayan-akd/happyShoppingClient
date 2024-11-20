import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { PhotoView } from "react-photo-view";
const NewsLetter2 = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    toast("Thank you for subscribing to our newsletter.", {
      icon: "✅",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };
  return (
    <div
      className="hero min-h-screen my-12"
      style={{
        backgroundImage: "url(/bg.jpg)",
      }}
    >
      <div className="flex flex-col md:flex-row justify-center max-w-screen-xl mx-auto gap-10 p-4 md:p-10 lg:p-12">
        <div className="md:w-1/2">
          <PhotoView src="/newsletter.png">
          <img src="/newsletter.png" alt="" />
          </PhotoView>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-5 lg:mt-5">
            FINDING THE PERFECT TRAILS TO HIKE IS EASY WITH <span className="text-grn">NEWSLETTER</span>
          </h1>
          <p>
            Join our newsletter to receive the latest travel tips, inspiring
            stories, and exclusive offers. Start your journey to new adventures
            with us.
          </p>
          <form onSubmit={handleSubscribe} className="flex items-center mt-12">
            <input
            required
              type="email"
              placeholder="Enter your email"
              className="input input-bordered input-success w-full max-w-xs "
            />
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="btn bg-grn text-white hover:bg-grn"
            >
              Subscribe
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter2;

import { motion } from "framer-motion";

const Banner = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: "url(/banner.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold text-white">
              Explore the World
            </h1>
            <p className="mb-5 text-white">
              Embark on a journey to discover the most breathtaking
              destinations. Let your wanderlust guide you to new horizons,
              cultures, and experiences.
            </p>
            <motion.a
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              href="/products"
              className="btn bg-ylw hover:bg-ylw text-white border-none"
            >
              Start Exploring
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

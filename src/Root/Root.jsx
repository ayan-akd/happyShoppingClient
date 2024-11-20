import { Outlet } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Navbar from "../Component/Shared/NavBar";
import Footer from "../Component/Shared/Footer";

import { motion, useScroll, useSpring } from "framer-motion";

const Root = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
    top: '5rem',
  });
  return (
    <div>
      <Navbar></Navbar>
      <motion.div className="fixed top-18 left-0 right-0 h-3 bg-grn origin-[0] z-50" style={{ scaleX }} />
      <Outlet></Outlet>
      <Footer></Footer>
      <Toaster></Toaster>
    </div>
  );
};

export default Root;

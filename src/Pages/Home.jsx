import { useEffect, useState } from "react";
import Banner from "../Component/Banner";
import Items from "../Component/Items";
import LatestBlogs from "../Component/LatestBlogs";
import NewsLetter from "../Component/NewsLetter";
import Tips from "../Component/Tips";
import { motion, useAnimation, } from "framer-motion";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useInView } from "react-intersection-observer";
import SliderContainer from "../Component/SliderContainer";

const Home = () => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const controls = useAnimation();

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (showScrollButton) {
      controls.start({ opacity: 1 });
    } else {
      controls.start({ opacity: 0 });
    }
  }, [showScrollButton, controls]);

  // const { scrollYProgress } = useScroll();
  // const scaleX = useSpring(scrollYProgress, {
  //   stiffness: 100,
  //   damping: 30,
  //   restDelta: 0.001,
  //   top: '5rem',
  // });

  return (
    <div className=" mx-auto">
      {/* <motion.div className="fixed top-18 left-0 right-0 h-3 bg-grn origin-[0] z-50" style={{ scaleX }} /> */}
      <Banner />
      <LatestBlogs />
      <div ref={ref}>
        <Tips />
        <NewsLetter />
        <Items />
        <SliderContainer></SliderContainer>
      </div>
      {inView ? (
        <motion.button
          className="fixed bottom-6 right-6 text-4xl md:text-5xl text-grn px-4 py-2 rounded-full opacity-0 transition-opacity duration-300 z-10"
          onClick={scrollToTop}
          title="Scroll To Top"
          initial={{ opacity: inView ? 1 : 0 }}
          animate={controls}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.1 },
          }}
          whileTap={{ scale: 0.9 }}
        >
          <BsFillArrowUpCircleFill />
        </motion.button>
      ) : null}
    </div>
  );
};

export default Home;

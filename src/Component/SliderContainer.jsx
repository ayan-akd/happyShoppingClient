import { motion } from "framer-motion";
import Slider from "./Slider";
import { InView } from "react-intersection-observer";
const SliderContainer = () => {
    const sliderAnimation = {
        hidden: {
          opacity: 0,
          scale: 0.9,
        },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.5,
          },
        },
      };
    return (
        <div>
            <InView threshold={0.5} triggerOnce>
          {({ inView, ref }) => (
            <motion.div
              ref={ref}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={sliderAnimation}
            >
              <div>
              <h1 className="text-3xl md:text-5xl text-center">
            Popular places to <span className="text-grn mb-5">Visit</span>
          </h1>
              <Slider />
              </div>
            </motion.div>
          )}
        </InView>
        </div>
    );
};

export default SliderContainer;
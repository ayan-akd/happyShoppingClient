import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { PhotoView } from "react-photo-view";
import { motion } from "framer-motion";
import img1 from "/Transition/transition1.jpg";
import img2 from "/Transition/transition2.jpg";
import img3 from "/Transition/transition4.jpg";
import img4 from "/Transition/transition5.jpg";

const SliderX = () => {
  const [sliderRef] = useKeenSlider(
    {
      loop: true,
    },
    [
      (slider) => {
        let timeout;
        let mouseOver = false;
        function clearNextTimeout() {
          clearTimeout(timeout);
        }
        function nextTimeout() {
          clearTimeout(timeout);
          if (mouseOver) return;
          timeout = setTimeout(() => {
            slider.next();
          }, 2000);
        }
        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true;
            clearNextTimeout();
          });
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false;
            nextTimeout();
          });
          nextTimeout();
        });
        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);
      },
    ]
  );

  return (
    <div ref={sliderRef} className=" keen-slider mx-auto rounded-xl">
      <div className="overlay-text absolute z-10 text-center rounded-lg p-4 right-1/2 translate-x-1/2 -translate-y-2/4 top-2/3 bg-base-100 bg-opacity-30 opacity-0 md:opacity-100">
        <h1 className="mb-5 text-5xl font-bold text-black">
          Elevate Your Lifestyle
        </h1>
        <p className="mb-5 text-black">
          Discover a curated collection of top-notch Electronics, stylish
          Furniture, and innovative Appliances. Redefine comfort, functionality,
          and elegance in every corner of your life.
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
          Start Shopping
        </motion.a>
      </div>

      <div className="keen-slider__slide number-slide1">
        <PhotoView src={img1}>
          <img
            className="mx-auto  h-[300px] md:h-[500px] lg:h-[800px] px-4"
            src={img1}
            alt=""
          />
        </PhotoView>
      </div>
      <div className="keen-slider__slide number-slide1">
        <PhotoView src={img2}>
          <img
            className="mx-auto  h-[300px] md:h-[500px] lg:h-[800px] px-4"
            src={img2}
            alt=""
          />
        </PhotoView>
      </div>

      <div className="keen-slider__slide number-slide1">
        <PhotoView src={img3}>
          <img
            className="mx-auto  h-[300px] md:h-[500px] lg:h-[800px] px-4"
            src={img3}
            alt=""
          />
        </PhotoView>
      </div>
      <div className="keen-slider__slide number-slide1">
        <PhotoView src={img4}>
          <img
            className="mx-auto  h-[300px] md:h-[500px] lg:h-[800px] px-4"
            src={img4}
            alt=""
          />
        </PhotoView>
      </div>
    </div>
  );
};

export default SliderX;

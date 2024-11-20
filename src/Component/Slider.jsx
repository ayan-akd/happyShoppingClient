import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const images = [
  {
    img: "/slider1.jpg",
    text: <div className="text-center">
        <p className="text-lg font-normal">Popular</p>
        <h1>SWEDEN</h1>
    </div>,
  },
  {
    img: "/slider2.jpg",
    text: <div className="text-center">
    <p className="text-lg font-normal">Popular</p>
    <h1>STOCKHOLM</h1>
</div>,
  },
  {
    img: "/slider3.jpg",
    text: <div className="text-center">
    <p className="text-lg font-normal">Popular</p>
    <h1>COLORADO</h1>
</div>,
  },
];

const Slider = () => {
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
    <>
      <div ref={sliderRef} className="keen-slider max-w-screen-xl mx-auto h-auto object-cover absolute opacity-75 my-12">
        {images.map((item, index) => (
          <div key={index} className="keen-slider__slide number-slide1 mx-auto relative">
            <div className="h-[300px] md:h-[500px] lg:h-[800px] relative">
              <img
                className="h-full w-full object-cover"
                src={item.img}
                alt=""
              />
              <div
              style={{
                backgroundImage: "url(/bg-slider.png)",
              }}
              className="absolute bg-no-repeat bg-center top-0 left-0 right-0 bottom-0 flex items-center justify-center text-2xl font-bold opacity-100 transition-opacity duration-300">
                {item.text}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Slider;

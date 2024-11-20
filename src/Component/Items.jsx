import { Rating, RoundedStar } from "@smastrom/react-rating";
import { motion } from "framer-motion";

const Items = () => {
  const myStyles = {
    itemShapes: RoundedStar,
    activeFillColor: "#59815B",
    inactiveFillColor: "#dcfce7",
  };
  return (
    <div
      className="hero min-h-screen my-12"
      style={{
        backgroundImage: "url(/bg.jpg)",
      }}
    >
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl md:text-5xl text-center mb-8">
          TRAVEL ESSENTIAL <span className="text-grn">ITEMS</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 px-2">
          <div className="flex flex-col items-center">
            <motion.img whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }} className="w-96" src="/item1.jpg" alt="" />
            <div className="text-center space-y-5">
              <p className="italic mt-4">$250.00</p>
              <h3 className="font-bold text-xl">Shoes</h3>
              <div className="flex items-center">
                <Rating
                  style={{ maxWidth: 150 }}
                  value={4}
                  itemStyles={myStyles}
                ></Rating>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <motion.img whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }} className="w-96" src="/item2.jpg" alt="" />
            <div className="text-center space-y-5">
              <p className="italic mt-4">$200.00</p>
              <h3 className="font-bold text-xl">CAMERA TRIPOD</h3>
              <div className="flex items-center">
                <Rating
                  style={{ maxWidth: 150 }}
                  value={5}
                  itemStyles={myStyles}
                ></Rating>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <motion.img whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }} className="w-96" src="/item3.jpg" alt="" />
            <div className="text-center space-y-5">
              <p className="italic mt-4">$150.00</p>
              <h3 className="font-bold text-xl">RAINCOAT</h3>
              <div className="flex items-center">
                <Rating
                  style={{ maxWidth: 150 }}
                  value={3}
                  itemStyles={myStyles}
                ></Rating>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <motion.img whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }} className="w-96" src="/item4.jpg" alt="" />
            <div className="text-center space-y-5">
              <p className="italic mt-4">$1250.00</p>
              <h3 className="font-bold text-xl">DSLR CAMERA</h3>
              <div className="flex items-center">
                <Rating
                  style={{ maxWidth: 150 }}
                  value={5}
                  itemStyles={myStyles}
                ></Rating>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <motion.img whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }} className="w-96" src="/item5.jpg" alt="" />
            <div className="text-center space-y-5">
              <p className="italic mt-4">$170.00</p>
              <h3 className="font-bold text-xl">WATTER BOTTLE</h3>
              <div className="flex items-center">
                <Rating
                  style={{ maxWidth: 150 }}
                  value={3}
                  itemStyles={myStyles}
                ></Rating>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Items;

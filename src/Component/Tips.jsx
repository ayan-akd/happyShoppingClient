/* eslint-disable react/no-unescaped-entities */
import { AiOutlineCalendar } from "react-icons/ai";
import { GiPencil } from "react-icons/gi";
import { motion } from "framer-motion";
import { PhotoView } from "react-photo-view";
const Tips = () => {
  return (
    <div
      style={{
        backgroundImage: "url(/bg-tips.jpg)",
      }}
    >
      <div className="max-w-screen-xl mx-auto mb-12">
        <div className="px-2">
          <h1 className="text-3xl md:text-5xl text-center">
            TRAVEL TIPS <span className="text-ylw">AND ADVICE</span>
          </h1>
        </div>
        <div className="flex flex-col justify-center md:flex-row gap-10 py-20 p-4 md:px-5 lg:px-10">
          <div className="md:w-1/2">
            <PhotoView src="/blog.jpg">
              <motion.img
                whileHover={{
                  rotate: -5,
                  transition: { duration: 0.5 },
                }}
                src="/blog.jpg"
                alt=""
              />
            </PhotoView>
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="flex gap-6 mb-5">
              <motion.p
                whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
              >
                {" "}
                <AiOutlineCalendar className="inline-block"></AiOutlineCalendar>{" "}
                October 8, 2019
              </motion.p>
              <motion.p
                whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
              >
                {" "}
                <GiPencil className="inline-block"></GiPencil> by Alisa Michaels
              </motion.p>
            </div>
            <h1 className="text-2xl mb-5">
              10 Essential Travel Tips for an Amazing Journey
            </h1>
            <p>
              Whether you're a seasoned traveler or just starting your
              adventure, these travel tips and advice will help you make the
              most of your journey. From packing essentials to cultural
              insights, we've got you covered!
            </p>
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              className="btn bg-ylw text-white w-fit mt-5 hover:bg-ylw"
            >
              Read More
            </motion.button>
          </div>
        </div>
        <div className="flex flex-col justify-center md:flex-row-reverse gap-10 py-20 p-4 md:px-5 lg:px-10">
          <div className="md:w-1/2">
            <PhotoView src="/blog1.jpg">
              <motion.img
                whileHover={{
                  rotate: 5,
                  transition: { duration: 0.5 },
                }}
                src="/blog1.jpg"
                alt=""
              />
            </PhotoView>
          </div>
          <div className="md:w-1/2 flex flex-col justify-center">
            <div className="flex gap-6 mb-5">
              <motion.p
                whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
              >
                {" "}
                <AiOutlineCalendar className="inline-block"></AiOutlineCalendar>{" "}
                October 10, 2019
              </motion.p>
              <motion.p
                whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
              >
                {" "}
                <GiPencil className="inline-block"></GiPencil> by Ayan Kumar
              </motion.p>
            </div>
            <h1 className="text-2xl mb-5">
              Explore the World: Top Travel Tips for Adventurers
            </h1>
            <p>
              Embark on a journey to the Peruvian Amazon Rainforest with
              confidence. Discover the best hiking trails and travel tips for an
              unforgettable adventure in the heart of nature.
            </p>
            <motion.button
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.1 },
              }}
              whileTap={{ scale: 0.9 }}
              className="btn bg-ylw text-white w-fit mt-5 hover:bg-ylw"
            >
              Read More
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;

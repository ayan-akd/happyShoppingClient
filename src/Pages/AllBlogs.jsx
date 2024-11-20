import BlogCard from "../Component/BlogCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Component/Loading";

const AllBlogs = () => {
  const { blogs, isLoading } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  useEffect(() => {
    if (blogs) {
      const results = blogs.filter((blog) => {
        if (selectedCategory === "all") {
          return blog.name.toLowerCase().includes(searchValue.toLowerCase());
        }
        const categoryMatch = blog.category
          ? blog.category.toLowerCase().includes(selectedCategory.toLowerCase())
          : false;
        const searchMatch = blog.name
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        return categoryMatch && searchMatch;
      });
      setFilteredBlogs(results);
    }
  }, [blogs, searchValue, selectedCategory]);
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(/bg-tips.jpg)",
      }}
    >
      {isLoading ? (
        <Loading></Loading>
      ) : (
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl md:text-5xl text-center my-12">
            Check Out Our <span className="text-grn">Blogs</span>
          </h1>
          <div className="join flex mt-12 justify-center">
            <input
              className="input input-bordered join-item input-accent md:w-4/12"
              placeholder="Search...."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="btn join-item btn-square w-20 bg-grn text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <div className="flex justify-center md:justify-end my-12">
            <div className="md:w-96">
              <label className="input-group flex">
                <select
                  name="category"
                  className="select select-bordered w-full"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="destinations">Destinations</option>
                  <option value="tips">Tips & Advice</option>
                  <option value="stories">Stories & Experiences</option>
                  <option value="food">Food & Cuisine</option>
                  <option value="culture">Culture & Insights</option>
                </select>
              </label>
            </div>
          </div>
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog}></BlogCard>
              ))}
            </div>
          ) : (
            <div className=" max-w-screen-xl w-screen mx-auto">
              <h1 className="text-center font-bold text-5xl">
                No match Found!!!
              </h1>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllBlogs;

import ProductCard from "../Component/ProductCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Component/Loading";

const AllProducts = () => {
  const { isLoading, products } = useContext(AuthContext);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState("none");

  useEffect(() => {
    if (products) {
      let results = products?.filter((product) => {
        if (selectedDepartment === "all") {
          return product?.name
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        }
        const departmentMatch = product?.department
          ? product?.department
              .toLowerCase()
              .includes(selectedDepartment.toLowerCase())
          : false;
        const searchMatch = product?.name
          .toLowerCase()
          .includes(searchValue.toLowerCase());
        return departmentMatch && searchMatch;
      });
      if (sortBy === "aToZ") {
        results = results.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            sensitivity: "base",
          })
        );
      } else if (sortBy === "zToA") {
        results = results.sort((a, b) =>
          b.name.localeCompare(a.name, undefined, {
            sensitivity: "base",
          })
        );
      } else if (sortBy === "highPriced") {
        results = results.sort((a, b) => a.price - b.price);
      } else if (sortBy === "lowPriced") {
        results = results.sort((a, b) => b.price - a.price);
      }
      setFilteredProducts(results);
    }
  }, [products, searchValue, selectedDepartment, sortBy]);
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
            Check Out Our <span className="text-ylw">products</span>
          </h1>
          <div className="join flex mt-12 justify-center">
            <input
              className="input input-bordered join-item input-accent md:w-4/12"
              placeholder="Search...."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="btn join-item btn-square w-20 bg-ylw text-white">
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
          <div className="flex justify-center md:justify-between my-12">
            <div className="md:w-96">
              <label className="input-group flex">
                <select
                  name="department"
                  className="select select-bordered w-full"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="appliances">Appliances</option>
                </select>
              </label>
            </div>
            <div className="md:w-96 ml-4">
              <label className="input-group flex">
                <select
                  name="sort"
                  className="select select-bordered w-full"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="none">Default</option>
                  <option value="aToZ">A &gt; Z</option>
                  <option value="zToA">Z &gt; A</option>
                  <option value="lowPriced">Price ( High &gt; Low)</option>
                  <option value="highPriced">Price ( Low &gt; High)</option>
                </select>
              </label>
            </div>
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product}></ProductCard>
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

export default AllProducts;

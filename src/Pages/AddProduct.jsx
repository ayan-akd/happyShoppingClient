import toast from "react-hot-toast";
import axiosPublic from "../Hooks/axiosPublic";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const AddProduct = () => {
  const { refetch } = useContext(AuthContext);
  const handleAddProduct = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const description = form.description.value;
    const price = form.price.value;
    const availability = form.availability.value;
    const brand = form.brand.value;
    const type = form.type.value;
    const department = form.department.value;

    const newProduct = {
      name,
      photo,
      description,
      price,
      availability,
      brand,
      type,
      rating: 0,
      department,
    };
    // send data to the server

    axiosPublic.post("/products", newProduct).then((res) => {
      if (res.status === 201) {
        refetch();
        toast("Product Added", {
          icon: "✅",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      }
    });
  };
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url(/bg.jpg)",
      }}
    >
      <div className="max-w-screen-xl mx-auto p-4 my-10">
        <h1 className="text-center text-4xl italic font-semibold mb-12">
          Add <span className="text-ylw">Product</span>
        </h1>
        <form onSubmit={handleAddProduct}>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Name</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Product Name..."
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div className="form-control md:ml-4">
              <label className="label">
                <span className="label-text">Department</span>
              </label>
              <label className="input-group">
                <select
                  name="department"
                  className="select select-bordered w-full"
                  defaultValue=""
                  required
                >
                  <option disabled value="">
                    Select Department. . .
                  </option>
                  <option value="electronics">Electronics</option>
                  <option value="furniture">Furniture</option>
                  <option value="appliances">Appliances</option>
                </select>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-2 md:flex md:justify-between gap-x-5 mb-2">
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Type of Product</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="type"
                  placeholder="Type..."
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Brand Name</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="brand"
                  placeholder="Brand Name..."
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Product Price</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  name="price"
                  placeholder="$Price..."
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div className="form-control flex-grow">
              <label className="label">
                <span className="label-text">Product Stock Amount</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  name="availability"
                  placeholder="Stock Amount..."
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div>
          <div className="md:flex mb-8">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Description of Product</span>
              </label>
              <label className="input-group">
                <div className="form-control w-full">
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Description of Product....."
                    className="textarea w-full h-52 textarea-bordered textarea-lg"
                    required
                  ></textarea>
                </div>
              </label>
            </div>
          </div>
          <div className="mb-8">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="photo"
                  placeholder="Photo URL...."
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div>
          <button className="w-full bg-ylw text-white btn">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

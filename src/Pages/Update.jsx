import toast from "react-hot-toast";
import useAxios from "../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../Component/Loading";

const Update = () => {
  const { user } = useContext(AuthContext);
  const userPhoto = user?.photoURL || "https://images2.imgbox.com/2f/46/t0HrsZQn_o.png";
  const axiosSecure = useAxios();
  const {id} = useParams();
  const { data: blogDetails, isLoading } = useQuery({
    queryKey: ["blogDetails"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/update/${id}`);
      return response.data;
    },
  });

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const category = form.category.value;
    const shortDis = form.shortDis.value;
    const longDis = form.longDis.value;
    const photo = form.photo.value;

    const updatedBlog = {
      name,
      category,
      shortDis,
      longDis,
      photo,
      userPhoto,
    };
    console.log(updatedBlog);


    axiosSecure.put(`/update/${id}`,updatedBlog)
    .then((res) =>{
        if (res.data.modifiedCount>0) {
                toast("Blog Updated", {
                    icon: "✅",
                    style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    },
                });
                }
    })
    
  };
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: "url(/bg.jpg)",
      }}
    >
      {
        isLoading ? (
            <Loading></Loading>
        ) : (
            <div className="max-w-screen-xl mx-auto p-4 my-10">
        <h1 className="text-center text-4xl italic font-semibold mb-12">
          Update <span className="text-grn">Blog</span>
        </h1>
        <form onSubmit={handleUpdate}>
          <div className="grid grid-cols-1 md:grid-cols-2 mb-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Blog Title</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="name"
                  defaultValue={blogDetails?.name}
                  placeholder="Blog Title"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
            <div className="form-control md:ml-4">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <label className="input-group">
                <select
                  name="category"
                  className="select select-bordered w-full"
                  defaultValue={blogDetails?.category}
                  required
                >
                  <option disabled value="">
                    Select Category. . .
                  </option>
                  <option value="destinations">Destinations</option>
                  <option value="tips">Tips & Advice</option>
                  <option value="stories">Stories & Experiences</option>
                  <option value="food">Food & Cuisine</option>
                  <option value="culture">Culture & Insights</option>
                </select>
              </label>
            </div>
          </div>
          <div className="md:flex mb-8">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Short Description</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="shortDis"
                  defaultValue={blogDetails?.shortDis}
                  placeholder="Short Description"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div>
          <div className="md:flex mb-8">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Long Description</span>
              </label>
              <label className="input-group">
                <div className="form-control w-full">
                  <textarea
                    type="text"
                    name="longDis"
                    defaultValue={blogDetails?.longDis}
                    placeholder="Long Description"
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
                    defaultValue={blogDetails?.photo}
                  placeholder="Photo URL"
                  className="input input-bordered w-full"
                  required
                />
              </label>
            </div>
          </div>
          <button className="w-full bg-grn text-white btn">Update Blog</button>
        </form>
      </div>
        )
      }
    </div>
  );
};

export default Update;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaClock, FaMapMarkerAlt, FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import useAuth from "../../../hooks/useAuth";

const BlogDetails = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [rating, setRating] = React.useState();
  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, [id]);
  const onSubmit = (data) => {
    console.log(data);
    data["rating"] = rating;
    const newReview = {
        ...data,
        status:'pending',
        title:blog.title,
        image: blog.image
        
    }
    axios
      .post("http://localhost:5000/review", newReview)
      .then((res) => {
        if (res.data.acknowledged) {
          swal("Good job!", "Review Added", "success");
        }
        reset();
      })
      .catch((error) => {
        swal("Something went wrong!", `${error.message}`, "error");
      });
  };
  return (
    <div className="container my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 my-20">
        {/* contect of the blog */}
        <div>
          <h1>{blog.title}</h1>
          <div>
            <img alt="" className="w-full h-80" src={blog.image} />
          </div>
          <div className="my-10">
            <h2 className="text-2xl font-bold">{blog.destination}</h2>
            <p className="text-gray-600 my-3">
              <span className="text-xl font-bold text-tomato">
                $ {blog.cost}
              </span>{" "}
              / per person
            </p>
            <div className="flex">
              <div className="my-3 flex mr-5">
                <span className="font-semibold">Time</span> :{" "}
                <FaClock className="mr-1" />
                {blog.time} days
              </div>

              <div className="my-3 flex">
                <span className="font-semibold">Location</span> :{" "}
                <FaMapMarkerAlt className="mr-1" />
                {blog.location}
              </div>
            </div>
            <p className="text-gray-600">
              <span className="font-semibold">Description</span> :{" "}
              {blog.description}
            </p>
          </div>
        </div>
        <div>
          <h2>Reviews</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              className="block mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              defaultValue={user.displayName}
              {...register("name")}
              placeholder="Your Name"
            />
            <input
              className="block mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              defaultValue={user?.email}
              {...register("email")}
              placeholder="Email"
            />
            <input
              className="block mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="number"
              defaultValue={user?.email}
              {...register("expense")}
              placeholder="Expense"
            />
            <textarea
              className="block mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              style={{ height: "150px" }}
              {...register("description")}
              placeholder="Description"
            />
            <div className="flex flex-col mb-3">
              <p className="text-gray-600 font-primary">Give a rating*</p>
              <Rating
                onChange={(rate) => setRating(rate)}
                stop={10}
                emptySymbol={<FaRegStar />}
                fullSymbol={<FaStar />}
              />
            </div>
            <input
              className="btn-1 theme-bg text-white px-4"
              type="submit"
              value="Submit Review"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

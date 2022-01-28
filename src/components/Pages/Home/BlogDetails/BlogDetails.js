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
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = React.useState();
  const [compareReview, setCompareReview] = useState([]);
  const handleCompare = (id) => {
    const filterReview = reviews.filter((review) => review._id === id);
    const allReviews = [...filterReview, ...compareReview];
    setCompareReview(allReviews.slice(0, 3));
    console.log(allReviews.slice(0, 3));
  };
  // const [count,setCount]= useState(0);
  const [selectedId, setSelectedId] = useState([]);

  useEffect(() => {
    fetch(`https://secure-eyrie-37258.herokuapp.com/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data));
  }, [id]);
  const onSubmit = (data) => {
    // console.log(data);
    const blogRating = parseInt(blog.rating) + parseInt(rating);
    
    const ratingBlog = { blogRating, id };
    data["rating"] = rating;
    const newReview = {
      ...data,
      status: "pending",
      title: blog.title,
      image: blog.image,
    };
    //add blog rating
    fetch(`https://secure-eyrie-37258.herokuapp.com/rating`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },

      body: JSON.stringify(ratingBlog),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    axios
      .post("https://secure-eyrie-37258.herokuapp.com/review", newReview)
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
  useEffect(() => {
    fetch(`https://secure-eyrie-37258.herokuapp.com/review`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  // console.log(reviews);
  // console.log(selectedId);
  return (
    <div className="container my-12">
      <div className="flex">
        <div className="flex-initial">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-10 my-20">
            {/* contect of the blog */}
            <div className="blog-area">
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
              {/* blog end */}
            </div>
            {/* main end */}
            <div>
              <h2 className="text-3xl ">Comparison Area:</h2>
              {compareReview.length > 0 && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border gap-10 my-20">
                    <div className="border-r text-2xl">
                      <h4 className="border-b">Title</h4>
                      <h4 className="border-b">Reviewer Name</h4>
                      <h5>Rating</h5>
                    </div>
                    {compareReview.map((com) => (
                      <div className="border-r text-2xl">
                        <h4 className="border-b">{com.title}</h4>
                        <h4 className="border-b">{com.name}</h4>
                        <h5>{com.rating}</h5>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="flex-1 ml-4" style={{ minWidth: "400px" }}>
                {reviews.map((review) => (
                  <div className="mb-3" key={review._id}>
                    <button
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => handleCompare(review._id)}
                    >
                      Compare
                    </button>
                    <p
                      className="hover:text-blue-500 hover:cursor-pointer"
                      onClick={() => {
                        setSelectedId([...selectedId, review._id]);
                      }}
                    >
                      {review.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Review start */}
            <div className="review-area">
              <h2 className="mb-4 text-3xl">Reviews</h2>
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
            {/* Review end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;

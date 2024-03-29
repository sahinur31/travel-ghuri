import React, { useEffect, useState } from "react";
import Blog from "../Blog/Blog";
import Pagination from "./Pagination";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(10);
  const [topBlogs, setTopBlogs] = useState([]);

  useEffect(() => {
    fetch("https://secure-eyrie-37258.herokuapp.com/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        data.sort((a, b) => b?.rating - a?.rating);
        setTopBlogs(data.slice(0, 5));
      });
  }, []);
  // console.log(topBlogs, blogs);
  const indexOfLastPage = currentPage * blogsPerPage;
  const indexOfFirstPage = indexOfLastPage - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPage, indexOfLastPage);
  useEffect(() => {
    fetch("https://secure-eyrie-37258.herokuapp.com/blogs")
      .then((res) => res.json())
      .then((data) => {
        const filterData = data.filter((d) => d.status === "Approved");
        setBlogs(filterData);
      });
  }, []);

  return (
    <section className="container my-20" id="tours">
      
      <div className="flex">
        <div className="flex-initial">
        <h1 className="font-primary m-0 text-2xl text-gray-700 text-left space-y-3 mb-4">
              All Blog
            </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {currentBlogs.map((blog) => (
              <Blog key={blog._id} data={blog} />
            ))}
          </div>
        </div>
        <div className="flex-1 ml-4" style={{ minWidth: "300px" }}>
          <div className="flex flex-col space-y-3 mb-4">
            <h1 className="font-primary m-0 text-xl text-gray-700 text-left">
              Top Rated Spots
            </h1>
            <div className="w-36 h-1 rounded-full bg-red-400"></div>
          </div>
          {topBlogs.map((blog) => (
            <div key={blog._id} className="top-blog border mb-4">
              <div>
                <img alt="" className="w-full h-40" src={blog.image} />
              </div>
              <div className="p-2">
                <h2 className=" font-bold">{blog.title}</h2>
                <p className="text-gray-600 my-3">
                  <span className="text-xl font-bold text-tomato">
                    Rating {blog?.rating}
                  </span>{" "}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <Pagination
          postsPerPage={blogsPerPage}
          totalPosts={blogs.length}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </section>
  );
};

export default Blogs;

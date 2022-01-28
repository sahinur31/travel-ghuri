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
        setTopBlogs(data);
      });
  }, []);
  console.log(topBlogs, blogs);
  const indexOfLastPage = currentPage * blogsPerPage;
  const indexOfFirstPage = indexOfLastPage - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPage, indexOfLastPage);
  useEffect(() => {
    fetch("https://secure-eyrie-37258.herokuapp.com/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);
  return (
    <section className="container my-20" id="tours">
      <h1>All Blog</h1>
      <div className="flex">
        <div className="flex-initial">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentBlogs.map((blog) => (
              <Blog key={blog._id} data={blog} />
            ))}
          </div>
        </div>
        <div className="flex-1 ml-4" style={{ minWidth: "300px" }}>
          <h2 className="text-4xl mb-4">Top rated Spots</h2>
          {topBlogs.map((blog) => (
            <div key={blog._id} className="top-blog border mb-4">
              <div>
                <img alt="" className="w-full h-40" src={blog.image} />
              </div>
              <div className="p-2">
                <h2 className=" font-bold">{blog.title}</h2>
                <p className="text-gray-600 my-3">
                  <span className="text-xl font-bold text-tomato">
                    Rating ${blog?.rating}
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

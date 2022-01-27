import React, { useEffect, useState } from "react";
import Blog from "../Blog/Blog";
import Pagination from "./Pagination";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage, setBlogsPerPage] = useState(10);

  const indexOfLastPage = currentPage * blogsPerPage;
  const indexOfFirstPage = indexOfLastPage - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstPage, indexOfLastPage);
  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);
  return (
    <section className="container my-20" id="tours">
      <h1>All Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 my-20">
        
         {currentBlogs.map((blog) => (
            <Blog key={blog._id} data={blog} />
          ))}
         
        <div className="">
          <h2>Top rated Spots</h2>
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

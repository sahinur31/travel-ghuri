import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import './Blogs.css';
const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [blogsPerPage, setBlogsPerPage] = useState(10)
    console.log(currentPage);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => setBlogs(json))
    }, []);
    const indexOfLastPage = currentPage * blogsPerPage;
    const indexOfFirstPage = indexOfLastPage - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstPage, indexOfLastPage);
    return (
        <div>
            {currentBlogs.map((blog, index) => (
                <>
                    <h1>{blog.id}</h1>
                    <p key={index}>{blog.title}</p></>
            ))}



            <Pagination postsPerPage={blogsPerPage} totalPosts={blogs.length} setCurrentPage={setCurrentPage} />
        </div>
    );
};

export default Blogs;
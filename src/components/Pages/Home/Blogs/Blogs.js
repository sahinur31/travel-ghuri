import React, { useEffect, useState } from 'react';
import Blog from '../Blog/Blog';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/blogs')
            .then(res => res.json())
            .then(data => setBlogs(data));
    }, [])
    return (
        <section className="container my-20" id="tours">
            <h1>All Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20">
            {
                blogs.map(blog => <Blog key={blog._id} data={blog}/>)
            }
            <div className="">
                <h2>Top rated Spots</h2>
            </div>
            </div>
            
        </section>
    );
};

export default Blogs;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(()=> {
        fetch('http://localhost:5000/blogs')
        .then(res => res.json())
        .then(data => {
            // setIsUpdated(false)
            setBlogs(data)
        })
    }, [])
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure you want to delete');
        if(proceed){
            const url = `http://localhost:5000/blogs/${id}`;
            fetch(url, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0){
                    swal('Deleted Successfully', "success");
                    const remainingBlogs = blogs.filter(blog => blog._id !== id);
                    setBlogs(remainingBlogs);
                }
            })
        }
    }
    return (
        <div>
            <table className="max-w-screen-xl mx-auto">
        <thead className="hidden lg:block bg-red-500 font-primary">
          <tr className="grid grid-cols-1 lg:grid-cols-6 place-items-center">
            <th
              scope="col"
              className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
            >
              Title
            </th>
            <th
              scope="col"
              className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
            >
              Cost
            </th>
            <th
              scope="col"
              className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
            >
              Location
            </th>
            <th
              scope="col"
              className="text-xs font-medium text-white px-6 py-3 text-left uppercase tracking-wider"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>
            {blogs.map(blog => 
          <tr key={blog._id} className="bg-white border-b font-primary text-sm grid grid-cols-1 lg:grid-cols-6 place-items-center">
            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">{blog.title}</td>
            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">{blog.cost}</td>
            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">{blog.location}</td>
            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
              <button
                className="bg-red-700 border-0 btn-1 mr-2"
                size="sm"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
              <Link to={`update/${blog._id}`}><button className="bg-red-700 border-0 btn-1 mr-2">Update</button></Link>
            </td>
          </tr>
          )}
        </tbody>
      </table>
        </div>
    );
};

export default AllBlogs;
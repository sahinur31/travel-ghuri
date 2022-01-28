import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [isUpdated , setIsUpdated] = useState(false)
    useEffect(()=> {
        fetch('https://secure-eyrie-37258.herokuapp.com/blogs')
        .then(res => res.json())
        .then(data => {
          setIsUpdated(false)
            setBlogs(data)
        })
    }, [isUpdated])
    const handleDelete = id => {
        const proceed = window.confirm('Are you sure you want to delete');
        if(proceed){
            const url = `https://secure-eyrie-37258.herokuapp.com/blogs/${id}`;
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
    // functionality for  update status
    const handleUpdateStatus = (id , blog) => {
      // console.log(id , blog)
      const updatedStatus = {
          ...blog,
          status : 'Approved'
      }
      // console.log(updatedStatus)
      fetch(`https://secure-eyrie-37258.herokuapp.com/blogStatus/${id}` , {
          method : "PUT",
          headers:{
              'Content-Type':'application/json'
          },
          body:JSON.stringify(updatedStatus)
      })
      .then(res => res.json())
      .then(data =>{
          setIsUpdated(true)
      })
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
              Status
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
            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">{blog.status}</td>
            <td className="text-sm text-gray-500 px-6 py-4 whitespace-nowrap">
              <button
                className="bg-red-700 text-white p-2 border-0 mr-2"
                size="sm"
                onClick={() => handleDelete(blog._id)}
              >
                Delete
              </button>
              <Link to={`update/${blog._id}`}><button className="bg-red-700 text-white border-0 p-2 mr-2">Update Data</button></Link>
            
            <button
                className="bg-red-700 text-white p-2 mr-2"
                size="sm"
                onClick={() => handleUpdateStatus(blog._id, blog)}
              >
                Status
              </button>
              </td>
          </tr>
          )}
        </tbody>
      </table>
        </div>
    );
};

export default AllBlogs;
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

const UpdateBlog = () => {
    const { register, handleSubmit, reset } = useForm();
    const [blog, setBlog] = useState({});
    const {id} = useParams();
    useEffect(() => {
        const url = `https://secure-eyrie-37258.herokuapp.com/blogs/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => setBlog(data));
    }, [id]);
    const onSubmit = (data) => {
      // console.log(data);

         axios
           .put(`https://secure-eyrie-37258.herokuapp.com/blogs/${id}`, data)
           .then((res) => {
             if (res.data.acknowledged) {
               swal("Good job!", "Blog Added", "success");
             }
             reset();
           })
           .catch((error) => {
             swal("Something went wrong!", `${error.message}`, "error");
            
           });

       };
    return (
        
            <div className="py-4">
            <div className="flex flex-col space-y-3 mb-4">
                <h1 className="font-primary text-xl text-gray-700 m-0 text-left">Updated Blog {id}</h1>
                <div className="w-36 h-1 rounded-full bg-red-400"></div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                <div className="flex flex-col space-y-4">
                    {/* title  */}
                    <input type="text" className="input-primary" defaultValue={blog.title || ''} placeholder="Title" {...register("title")} />
                    {/* description  */}
                    <textarea cols="30" rows="9" defaultValue={blog.description || ''} className="input-primary resize-none" placeholder="Description" {...register("description")}></textarea>
                </div>

                <div className="flex flex-col space-y-4">
                    {/* Image URL  */}
                    <input type="text" className="input-primary" defaultValue={blog.image || ''} placeholder="Image Link" {...register("image")} />
                    {/* category  */}
                    <input className="input-primary" defaultValue={blog.category || ''} placeholder="Category" {...register("category")} />
                    {/* location  */}
                    <input type="text" className="input-primary" defaultValue={blog.location || ''} placeholder="location" {...register("location")} />
                    {/* expense  */}
                    <input type="number" className="input-primary" defaultValue={blog.cost || ''} placeholder="Cost" {...register("cost")} />
                    {/* info  */}
                    <input type="text" className="input-primary" defaultValue={blog.info || ''} placeholder="Traveler Info" {...register("info")} />
                    <button className="btn-1 w-36 ml-auto">
                      Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateBlog;
import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';

const UpdateBlog = () => {
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        /*  console.log(data);
         data["rating"] = rating;
         const blog = {
           ...data,
           status:'pending',
           blog:blog
       } */
         
         axios
           .post("http://localhost:5000/blogs", data)
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
        <div>
            <div className="py-4">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                <div className="flex flex-col space-y-4">
                    {/* title  */}
                    <input type="text" className="input-primary" placeholder="Title" {...register("title", { required: true })} />
                    {/* description  */}
                    <textarea cols="30" rows="9" className="input-primary resize-none" placeholder="Description" {...register("description", { required: true })}></textarea>
                </div>

                <div className="flex flex-col space-y-4">
                    {/* Image URL  */}
                    <input type="text" className="input-primary" placeholder="Image Link" {...register("image", { required: true })} />
                    {/* category  */}
                    <input className="input-primary" placeholder="Category" {...register("category", { required: true })} />
                    {/* location  */}
                    <input type="text" className="input-primary" placeholder="location" {...register("location", { required: true })} />
                    {/* expense  */}
                    <input type="number" className="input-primary" placeholder="Cost" {...register("cost", { required: true })} />
                    {/* info  */}
                    <input type="text" className="input-primary" placeholder="Traveler Info" {...register("info", { required: true })} />
                 {/*    
                    <p className="text-gray-600 font-primary">
                              Give a rating*
                            </p>
                            <Rating
                              onChange={(rate) => setRating(rate)}
                              emptySymbol={<FaRegStar />}
                              fullSymbol={<FaStar />}
                            /> */}
                    <button className="btn-1 w-36 ml-auto">Add</button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default UpdateBlog;
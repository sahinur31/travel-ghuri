import axios from 'axios';
import React from 'react';
import { FaRegStar, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import { useForm } from "react-hook-form";
import swal from 'sweetalert';

const AddNewForm = () => {
    const { register, handleSubmit, reset } = useForm();
    const [rating, setRating] = React.useState();
   
    const onSubmit = (data) => {
        console.log(data);
        data["rating"] = rating;
        axios
          .post("https://localhost:5000/blog", data)
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
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                <div className="flex flex-col space-y-4">
                    {/* title  */}
                    <input className="input-primary" placeholder="Blog Title" {...register("title", { required: true })} />
                    {/* description  */}
                    <textarea cols="30" rows="9" className="input-primary resize-none" placeholder="Blog Description" {...register("description", { required: true })}></textarea>
                </div>

                <div className="flex flex-col space-y-4">
                    {/* Image URL  */}
                    <input className="input-primary" placeholder="Image Link" {...register("image", { required: true })} />
                    {/* duration  */}
                    <input className="input-primary" placeholder="Tour Duration" {...register("duration", { required: true })} />
                    {/* location  */}
                    <input type="number" className="input-primary" placeholder="location" {...register("location", { required: true })} />
                    {/* expense  */}
                    <input type="number" className="input-primary" placeholder="Expense" {...register("expense", { required: true })} />
                    {/* country  */}
                    <p className="text-gray-600 font-primary">
                              Give a rating*
                            </p>
                            <Rating
                              onChange={(rate) => setRating(rate)}
                              emptySymbol={<FaRegStar />}
                              fullSymbol={<FaStar />}
                            />
                    <button className="btn-1 w-36 ml-auto">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddNewForm


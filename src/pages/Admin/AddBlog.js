import React, { useState } from 'react';

const AddBlog = () => {

    const [title, setTitle] = useState('');
    const [img, setImg] = useState(null);
    const [address, setAddress] = useState('');
    const [cost, setCost] = useState('');
    const [category, setCategory] = useState('');
    const [traveler, setTraveler] = useState('');
    const [description, setDescription] = useState('');


    // console.log(licence, profile, nid)

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('img', img);
        formData.append('address', address);
        formData.append('cost', cost);
        formData.append('category', category);
        formData.append('traveler', traveler);
        formData.append('description', description);


        fetch('http://localhost:5000/addBlog', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log(data)
                    alert('added successfully')

                }
            })


        console.log(formData)

    }
    return (
        <div>
            <h3>Add Blog</h3>
            <form onSubmit={handleSubmit}>
                <input onChange={e => setTitle(e.target.value)} placeholder='Title' type="text" /> <br />
                <label htmlFor="profile">Image</label> <br />
                <input onChange={e => setImg(e.target.files[0])} id='profile' accept="image/* " type="file" /> <br />
                <input onChange={e => setAddress(e.target.value)} placeholder='Location Address' type="text" /> <br />
                <input onChange={e => setCost(e.target.value)} placeholder='Fee' type="number" name="" id="" /> <br />

                <input onChange={e => setCategory(e.target.value)} placeholder='Category' type="text" /> <br />
                <textarea onChange={e => setTraveler(e.target.value)} type="text" placeholder='traveler info' /><br />
                <textarea onChange={e => setDescription(e.target.value)} type="text" placeholder='Description' /><br />



                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddBlog;
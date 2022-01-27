import React from 'react';

const Pagination = ({ postsPerPage, totalPosts, setCurrentPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    return (
        <div>
            {
                pageNumbers.map(number => (

                    <button className='border-2 border-indigo-500 px-5 mr-2' key={number} onClick={() => setCurrentPage(number)}>{number}</button>
                ))
            }

        </div>
    );
};

export default Pagination;
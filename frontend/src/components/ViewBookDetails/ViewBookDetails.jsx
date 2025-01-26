/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { GrLanguage } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { FaEdit, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { MdOutlineDelete } from 'react-icons/md';

const ViewBookDetails = () => {

    const { id } = useParams();
    const navigate =useNavigate();
    const [Data, setData] = useState(null); // Updated initial state to null
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BASE_URL}/api/v1/get-book-by-id/${id}`
                );
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };
        fetch();
    }, [id]);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id,
    };

    const handleFavourite = async () => {
        try {
            const response = await axios.put(
                 `${import.meta.env.VITE_BASE_URL}/api/v1/add-book-to-favourite`,
                {},
                { headers }
            );
            alert(response.data.message);
        } catch (error) {
            console.error('Error adding to favourites:', error);
        }
    };

    const handleCart = async () => {
        try {
            const response = await axios.put(
                 `${import.meta.env.VITE_BASE_URL}/api/v1/add-to-cart`,
                {},
                { headers }
            );
            alert(response.data.message); // Display success message
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert("Failed to add the book to the cart.");
        }
    };
    const deleteBook = async () => {
        const response = await axios.delete( `${import.meta.env.VITE_BASE_URL}/api/v1/delete-book`,
            {headers}
        );
        alert(response.data.message);
        navigate("/all-books");
    }

    return (
        <>
            {Data ? (
                <div className="px-4 md:px-12 py-8 bg-zinc-900 flex  flex-col md:flex-row gap-8 items-start">
                    <div className='p-4 w-full lg:w-3/6'>
                        <div className='flex flex-col lg:flex-row justify-around bg-zinc-800 p-12 rounded'>
                            <img src={Data.url} alt={Data.title} className='h-[50vh] md:h-[60vh] lg:h-[70vh] rounded' />
                            {isLoggedIn && role === "user" && (
                                <div className='flex flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
                                    <button
                                        className='bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-red-500 flex items-center justify-center'
                                        onClick={handleFavourite}
                                    >
                                        <FaHeart />{" "}
                                        <span className='ms-4 block lg:hidden'>Favourites</span>
                                    </button>
                                    <button
                                        className='text-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 mt-0 lg:mt-8 bg-blue-500 flex items-center justify-center'
                                        onClick={handleCart}
                                    >
                                        <FaShoppingCart />{" "}
                                        <span className='ms-4 block lg:hidden'>Add to cart</span>
                                    </button>
                                </div>
                            )}
                            {isLoggedIn && role === "admin" && (
                                <div className='flex flex-row lg:flex-col items-center justify-between lg:justify-start mt-8 lg:mt-0'>
                                    <Link
                                    to={`/updateBook/${id}`}
                                    className='bg-white rounded lg:rounded-full text-4xl lg:text-3xl p-3 text-red-500 flex items-center justify-center'>
                                        <FaEdit />{" "}
                                        <span className='ms-4 block lg:hidden'>Edit</span>
                                    </Link>
                                    <button className='text-red-500 rounded lg:rounded-full text-4xl lg:text-3xl p-3 mt-0 lg:mt-8 bg-blue-500 flex items-center justify-center'
                                        onClick={deleteBook}
                                    >
                                        <MdOutlineDelete />
                                        <span className='ms-4 block lg:hidden'>Delete Book</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='p-4 w-full lg:w-3/6'>
                        <h1 className='text-4xl text-zinc-400 font-semibold '>{Data.title}</h1>
                        <p className='mt-1 text-zinc-400 '>by {Data.author}</p>
                        <p className='mt-4 text-zinc-500 text-xl'> {Data.desc}</p>
                        <p className='flex mt-4 items-center justify-start text-zinc-400'>
                            <GrLanguage className="me-3" />{Data.language}
                        </p>
                        <p className='mt-4 text-zinc-100 text-3xl font-semibold'>
                            Price: ₹ {Data.price}{" "}
                        </p>
                    </div>
                </div>
            ) : (
                <div className='h-screen bg-zinc-900 flex items-center justify-center'>
                    <Loader />
                </div>
            )}
        </>
    );
}

export default ViewBookDetails;

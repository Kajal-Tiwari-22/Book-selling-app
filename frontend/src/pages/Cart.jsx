import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
    const navigate = useNavigate();
    const [Cart, setCart] = useState([]); // Initialize as an empty array
    const [Total, setTotal] = useState(0); // State to track total amount
    const [loading, setLoading] = useState(true); // Loading state
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    };

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await axios.get(
                    `https://book-selling-app-ta5y.onrender.com/api/v1/get-user-cart`,
                    { headers }
                );
                console.log("API Response: ", res.data); // Log the response
                setCart(res.data.data || []); // Ensure Cart is an array
            } catch (error) {
                console.error("Error fetching cart: ", error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetch();
    }, []);

    // Calculate total whenever Cart changes
    useEffect(() => {
        const totalAmount = Cart.reduce((acc, item) => acc + parseFloat(item.price || 0), 0); // Ensure item.price is a number
        setTotal(totalAmount.toFixed(2)); // Ensure total is displayed as float
    }, [Cart]);

    
    const deleteItem = async (id) => {
        try {
            await axios.put(`https://book-selling-app-ta5y.onrender.com/api/v1/remove-from-cart/${id}`, {} ,{ headers }); // Call the backend to delete item
            const updatedCart = Cart.filter((item) => item._id !== id);
            setCart(updatedCart);
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

/*
    const deleteItem = async (bookid) => {
        const response = await axios.put(`https://book-selling-app-ta5y.onrender.com/api/v1/remove-from-cart/${bookid}`, {}, { headers }

        );
        alert(response.data.message);
    };
    useEffect(() => {
        if (Cart && Cart.length > 0) {
            let total = 0;
            Cart.map((items) => {
                total += items.price;
            });
            setTotal(total);
            total = 0;
        }   
    }, [Cart]);



    const PlaceOrder = async () => {
        try {
            const response = await axios.post(
                `https://book-selling-app-ta5y.onrender.com/api/v1/place-order`,
                { order: Cart },
                { headers }
            );
            alert(response.data.message);
            navigate("/profile/orderHistory");
        }
        catch (error) {
            console.log(error);
        }
    };


    */
    const createOrder = async () => {
        const orderData = {
            order: Cart.map(item => ({
                _id: item._id,
                title: item.title,
                price: item.price,
            })),
        };

        try {
            await axios.post(`https://book-selling-app-ta5y.onrender.com/api/v1/place-order`, orderData, { headers });
            alert("Order placed successfully!");
            setCart([]); // Clear the cart after placing the order
        } catch (error) {
            alert(`Failed to place order: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className='bg-zinc-900 px-12 h-screen py-8'>
            {loading && <Loader />} {/* Show loader when Cart is being fetched */}
            {!loading && Cart.length === 0 && (
                <div className='h-screen'>
                    <div className='h-[100%] flex items-center justify-center flex-col'>
                        <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
                            Empty Cart
                        </h1>
                        <img
                            src="/empty-cart.png"
                            alt="empty cart"
                            className='lg:h-[50vh]'
                        />
                    </div>
                </div>
            )}
            {!loading && Cart.length > 0 && (
                <>
                    <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
                        Your Cart
                    </h1>
                    {Cart.map((item) => (
                        <div
                            className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
                            key={item._id}
                        >
                            <img
                                src={item.url}
                                alt={item.title}
                                className='h-[20vh] md:h-[10vh] object-cover'
                            />
                            <div className="w-full md:w-auto">
                                <h1 className='text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0'>
                                    {item.title}
                                </h1>
                                <p className="text-normal text-zinc-300 mt-2 hidden lg:block">
                                    {item.desc.slice(0, 100)}...
                                </p>
                                <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden'>
                                    {item.desc.slice(0, 65)}...
                                </p>
                                <p className='text-normal text-zinc-300 mt-2 block md:hidden'>
                                    {item.desc.slice(0, 100)}...
                                </p>
                            </div>
                            <div className='flex mt-4 w-full md:w-auto items-center justify-between'>
                                <h2 className='text-zinc-100 text-3xl font-semibold flex'>
                                    ₹ {item.price}
                                </h2>


                                <button
                                    className='bg-red-100 text-red-700 border border-red-700 rounded p-2 ms-12'
                                    onClick={() => deleteItem(item._id)}
                                >
                                    <AiFillDelete />
                                </button>


                            </div>
                        </div>
                    ))}

                    {/* Total Amount and Place Order Button */}
                    <div className='w-full flex flex-col items-end mt-8'>
                        <h2 className='text-4xl text-zinc-100 font-semibold mb-4'>
                            Total: ₹ {Total} {/* Total displayed as a float */}
                        </h2>
                        <button
                            className='bg-green-100 text-green-700 border border-green-700 rounded p-2'
                            onClick={createOrder}
                        >
                            Place Order for All Items
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;





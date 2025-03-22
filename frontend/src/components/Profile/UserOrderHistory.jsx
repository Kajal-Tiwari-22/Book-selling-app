/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(`https://book-selling-app-ta5y.onrender.com/api/v1/get-order-history`, { headers });
        console.log("Order History Response:", response.data); // Log successful response
        setOrderHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching order history:", error); // Log error
        if (error.response) {
          // Server responded with a status outside the 2xx range
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        } else if (error.request) {
          // Request was made but no response was received
          console.error("Request data:", error.request);
        } else {
          // Something else caused the error
          console.error("Error message:", error.message);
        }
        setError("Failed to fetch order history. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetch();
  }, []);

  return (
    <>
      {loading && <div className='flex items-center justify-center h-[100%]'><Loader /></div>}
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!loading && OrderHistory.length === 0 && (
        <div className='h-[80vh] p-4 text-zinc-100'>
          <div className='h-[100%] flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-semibold text-zinc-500 mb-8'>
              No Order History
            </h1>
            <img
              src="https://cdn.iconscout.com/icon/premium/png-512-thumb/empty-box-3455002-2887429.png?f=webp&w=256"
              alt="No orders"
              className='h-[20vh] mb-8'
            />
          </div>
        </div>
      )}
      {!loading && OrderHistory.length > 0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            Your Order History
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[22%]'>
              <h1>Books</h1>
            </div>
            <div className='w-[45%]'>
              <h1>Description</h1>
            </div>
            <div className='w-[9%]'>
              <h1>Price</h1>
            </div>
            <div className='w-[16%]'>
              <h1>Status</h1>
            </div>
            <div className='w-none md:w-[5%] hidden md:block'>
              <h1 className='text-sm'>Mode</h1>
            </div>
          </div>
          {OrderHistory.map((items, i) => (
            <div key={items._id} className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer'>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i + 1}</h1>
              </div>
              <div className='w-[22%]'>
                <Link
                  to={`/view-book-details/${items.book?._id}`}
                  className="hover:text-blue-300"
                >
                  {items.book?.title || "Unknown Title"}
                </Link>
              </div>
              <div className='w-[45%]'>
                <h1>{items.book?.desc.slice(0, 50)} ...</h1>
              </div>
              <div className='w-[9%]'>
                <h1>{items.book?.price || "N/A"}</h1>
              </div>
              <div className='w-[16%]'>
                <h1 className='font-semibold text-green-500'>
                  {items.status === "Order Placed" ? (
                    <div className='text-yellow-500'>{items.status}</div>
                  ) : items.status === "Canceled" ? (
                    <div className='text-red-500'>{items.status}</div>
                  ) : (
                    items.status
                  )}
                </h1>
              </div>
              <div className='w-none md:w-[5%] hidden md:block'>
                <h1 className=''>COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;

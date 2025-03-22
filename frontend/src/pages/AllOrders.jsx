/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FaUserLarge } from 'react-icons/fa6';
import Loader from '../components/Loader/Loader';
import { Link } from 'react-router-dom';

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `https://book-selling-app-ta5y.onrender.com/api/v1/get-all-orders`,
        { headers }
      );
      setAllOrders(response.data.data);
    }
    fetch();
  }, []);
  return (
    <>
      {!AllOrders && (
        <div className='h-[100%] flex items-center justify-center'>
          {" "}
          <Loader />{" "}
        </div>
      )}
      {AllOrders && AllOrders.length > 0 && (
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
         <div className='w-[9%]'>
         </div>
           <h1>Price</h1>
         </div>
         <div className='w-[16%]'>
           <h1>Status</h1>
         </div>
         <div className='w-[10%] md:w-[5%]'>
           <h1 className=''><FaUserLarge/></h1>
         </div>
       </div>
       {AllOrders.map((items, i) => (
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
  )
}

export default AllOrders;
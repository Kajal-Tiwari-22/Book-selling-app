/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MobileNav = () => {
    const role = useSelector((state) => state.auth.role);
    return (
        <>
            {role === "user" && (<div className='w-full lg:hidden flex items-center justify-between my-4'>
                <Link
                    to="/profile"
                    className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all direction-300'
                >
                    Favourites
                </Link>
                <Link
                    to="/profile/orderHistory"
                    className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all direction-300'
                >
                    Order History
                </Link>
                <Link
                    to="/profile/settings"
                    className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all direction-300'
                >
                    Settings
                </Link>
            </div>
            )}

            {role === "admin" && (<div className='w-full lg:hidden flex items-center justify-between my-4'>
                <Link
                    to="/profile"
                    className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all direction-300'
                >
                    All Orders
                </Link>
                <Link
                    to="/profile/add-book"
                    className='text-zinc-100 font-semibold w-full text-center hover:bg-zinc-900 rounded transition-all direction-300'
                >
                    Add Book
                </Link>
                
            </div>
            )}
        </>
    )
}

export default MobileNav
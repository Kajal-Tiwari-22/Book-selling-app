/* eslint-disable no-unused-vars */
import { React, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import MobileNav from "../components/Profile/MobileNav";


const Profile = () => {
  //const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`https://book-selling-app-ta5y.onrender.com/api/v1/get-user-information`,
        { headers }
      );
      setProfile(response.data);
    }
    fetch();
  }, []);
  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row  py-8 gap-4 text-white">
      {!Profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {Profile && (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <Sidebar data={Profile} />
            <MobileNav/>
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>

        </>
      )}
    </div>
  );
};


export default Profile;



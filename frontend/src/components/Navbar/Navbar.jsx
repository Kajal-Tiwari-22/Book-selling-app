// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
  const location = useLocation(); // Get current route path
  const [MobileNav, setMobileNav] = useState("hidden");

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  // Links based on login and role
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    ...(isLoggedIn ? [{ title: "Cart", link: "/cart" }] : []), // Cart visible only after login
    ...(isLoggedIn
      ? role === "admin"
        ? [{ title: "Admin Profile", link: "/profile" }]
        : [{ title: "Profile", link: "/profile" }]
      : []),
  ];

  const toggleMobileNav = () => {
    setMobileNav(MobileNav === "hidden" ? "block" : "hidden");
  };

  const getLinkClass = (path) => {
    return location.pathname === path
      ? "px-4 py-1 border border-blue-500 bg-blue-500 text-white rounded" // Active link styling
      : "hover:text-blue-500 transition-all duration-300"; // Default hover styling
  };

  return (
    <>
      <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            className="h-10 me-4"
            src="https://cdn-icons-png.flaticon.com/512/7417/7417771.png"
            alt="logo"
          />
          <h1 className="text-2xl font-semibold">BookHeaven</h1>
        </Link>
        <div className="nav-links-bookheaven block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((item) => (
              <div className="flex items-center justify-center" key={item.link}>
                <Link
                  to={item.link}
                  className={getLinkClass(item.link)} // Apply class based on active route
                >
                  {item.title}
                </Link>
              </div>
            ))}
          </div>
          <div className="hidden md:flex">
            {!isLoggedIn && (
              <>
                <Link
                  to="/LogIn"
                  className="px-1 py-1 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  LogIn
                </Link>
                <Link
                  to="/SignUp"
                  className="px-2 py-1 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
          <button
            className="block md:hidden text-white text-2xl hover:text-zinc-400"
            onClick={toggleMobileNav}
          >
            <FaGripLines />
          </button>
        </div>
      </nav>

      <div
        className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item) => (
          <Link
            to={item.link}
            className={`text-white text-4xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300 ${getLinkClass(
              item.link
            )}`}
            key={item.link}
            onClick={toggleMobileNav}
          >
            {item.title}
          </Link>
        ))}
        {!isLoggedIn && (
          <>
            <Link
              to="/LogIn"
              className="px-8 mb-8 text-3xl font-semibold py-2 border bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={toggleMobileNav}
            >
              LogIn
            </Link>
            <Link
              to="/SignUp"
              className="px-8 mb-8 text-3xl font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
              onClick={toggleMobileNav}
            >
              SignUp
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;

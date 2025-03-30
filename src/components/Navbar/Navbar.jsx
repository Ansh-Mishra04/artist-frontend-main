import React, { useEffect, useState } from "react";
import logo from "/logo.svg";
import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `font-semibold uppercase hover:text-[#5DC9DE] ${isActive ? "text-[#5DC9DE]" : ""}`;



  return (
    <nav className="absolute w-full top-0 left-0 z-[10000]">
      <div className="container mx-auto px-4 lg:px-6 xl:px-16 pt-8 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold text-gray-800">
          <a href="/">
            <img src={logo} alt="Logo" className="w-16" />
          </a>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex space-x-12 text-white">
          <li>
            <NavLink
              to="/"
              className={navLinkClass}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={navLinkClass}
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/artists"
              className={navLinkClass}
            >
              Artists
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leaderboard"
              className={navLinkClass}
            >
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resources"
              className={navLinkClass}
            >
              Resources
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={navLinkClass}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Desktop Login/Signup Buttons */}
        <div className="hidden lg:flex space-x-4">
          <button
            className="px-4 py-2 text-[#5DC9DE] font-bold uppercase"
            onClick={() =>{window.location.href=import.meta.env.VITE_PORTAL_URL+'/auth/signin'}}
          >
            Login
          </button>
          <button
            className="px-4  py-2 bg-[#5DC9DE] text-[#181B24] font-bold uppercase rounded-full"
            onClick={() =>{window.location.href=import.meta.env.VITE_PORTAL_URL+'/auth/signup'}}
          >
            Sign Up
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden flex items-center">
          <button
            className="text-gray-800 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="#5DC9DE"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-800 text-white transition-transform transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } w-64`}
      >
        <div className="p-4 flex justify-between items-center border-b border-gray-700">
          <h2 className="text-lg font-bold">Menu</h2>
          <button
            className="text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="flex flex-col space-y-4 p-4">
          <li>
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Events
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/artists"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Artists
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leaderboard"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Leaderboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/resources"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Resources
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={navLinkClass}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Mobile Login/Signup Buttons */}
        <div className="p-4 border-t border-gray-700 flex flex-col space-y-4">
          <button
            className="px-4 py-2 text-[#5DC9DE] font-bold uppercase"
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.location.href=import.meta.env.VITE_PORTAL_URL+'/auth/signin';
            }}
          >
            Login
          </button>
          <button
            className="px-4 py-2 bg-[#5DC9DE] text-[#181B24] font-bold uppercase rounded-full"
            onClick={() => {
              setIsMobileMenuOpen(false);
              window.location.href=import.meta.env.VITE_PORTAL_URL+'/auth/signup';
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
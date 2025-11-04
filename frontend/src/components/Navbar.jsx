import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-5 backdrop-blur-3xl bg-[#1a0025] text-white shadow-md bg-tr">
      {/* Logo */}
      <div className="text-2xl font-bold  bg-clip-text bg-gradient-to-r text-white">
        Vidyavanni
      </div>

      {/* Nav Links */}
      <ul className="flex space-x-8  font-medium">
        <li>
          <Link
            to="/"
            className="hover:text-[#7226FF] transition duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/learn"
            className="hover:text-[#7226FF] transition duration-200"
          >
            Learn
          </Link>
        </li>
        <li>
          <Link
            to="/mock-interview"
            className="hover:text-[#7226FF] transition duration-200"
          >
            Mock Interview
          </Link>
        </li>
        <li>
          <Link
            to="/project-insights"
            className="hover:text-[#7226FF] transition duration-200"
          >
            Project Insights
          </Link>
        </li>
        <li>
          <Link
            to="/progress"
            className="hover:text-[#7226FF] transition duration-200"
          >
            Progress
          </Link>
        </li>
      </ul>

      {/* Auth Buttons */}
      <div className="space-x-3">
        <Link
          to="/login"
          className="px-4 py-2  transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 rounded-md text-white  hover:opacity-90 transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3]">
        Vidyavanni
      </div>

      {/* Nav Links */}
      <ul className="flex space-x-8 text-gray-700 font-medium">
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
          className="px-4 py-2 text-[#7226FF] border border-[#7226FF] rounded-md hover:bg-[#7226FF] hover:text-white transition duration-300"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-[#7E22CE] via-[#9333EA] to-[#C026D3] hover:opacity-90 transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

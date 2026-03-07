import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-8 py-5 backdrop-blur-3xl bg-[#26004d] text-white shadow-md">

      {/* Logo */}
      <div className="text-2xl font-bold bg-clip-text bg-gradient-to-r text-white">
        vidyavaani
      </div>

      {/* Nav Links */}
      <ul className="flex space-x-8 font-medium">
        <li>
          <Link to="/" className="hover:text-[#7226FF] transition duration-200">
            Home
          </Link>
        </li>

        <li>
          <Link to="/mock-interview" className="hover:text-[#7226FF] transition duration-200">
            Mock Interview
          </Link>
        </li>

        <li>
          <Link to="/project-insights" className="hover:text-[#7226FF] transition duration-200">
            Project Insights
          </Link>
        </li>

        <li>
          <Link to="/progress" className="hover:text-[#7226FF] transition duration-200">
            Progress
          </Link>
        </li>
      </ul>

      {/* Auth Buttons */}
      <div className="space-x-4 flex items-center">

        {token ? (
          <>
            <span className="text-sm text-gray-200">
              {user?.name}
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-md bg-[#7226FF] hover:opacity-90 transition duration-300"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="px-4 py-2 transition duration-300">
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-md text-white hover:opacity-90 transition duration-300"
            >
              Sign Up
            </Link>
          </>
        )}

      </div>

    </nav>
  );
};

export default Navbar;
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1f1c2c] to-[#928DAB] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-yellow-500">
            RajkumarTools
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-yellow-300 duration-200">
            Home
          </Link>
          <Link to="/youtube-downloader" className="hover:text-yellow-300 duration-200">
            YouTube Downloader
          </Link>
          <Link to="/video-downloader" className="hover:text-yellow-300 duration-200">
            Shorts Downloader
          </Link>
        </div>

        {/* Burger Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#1f1c2c] border-t border-white/20 px-4 pb-4 flex flex-col space-y-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-yellow-300">
            Home
          </Link>
          <Link to="/youtube-downloader" onClick={() => setIsOpen(false)} className="hover:text-yellow-300">
            YouTube Downloader
          </Link>
          <Link to="/video-downloader" onClick={() => setIsOpen(false)} className="hover:text-yellow-300">
            Video Downloader
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;



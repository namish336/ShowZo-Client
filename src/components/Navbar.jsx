import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets } from '../assets/assets';
import { MenuIcon, SearchIcon, TicketPlus, XIcon, LayoutDashboard } from "lucide-react";
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "Theaters", path: "/theaters" },
    { name: "Collections", path: "/collections" },
    { name: "Watch Guide", path: "/WatchGuides" },
    { name: "News", path: "/news" },
    { name: "About", path: "/about" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-3 md:px-16 lg:px-36 py-4 md:py-5 bg-[#C0C9DB]/90 backdrop-blur-md border-b border-white/30 text-gray-900 shadow-sm">

      <Link to='/' className="shrink-0">
        <img src={assets.logo} alt="" className="w-28 md:w-36 h-auto" />
      </Link>

      <div className={`fixed inset-0 h-[100dvh] z-[100] flex flex-col items-center justify-center md:static md:h-auto md:inset-auto gap-8 overflow-y-auto overflow-x-hidden backdrop-blur-3xl bg-[#C0C9DB]/95 md:bg-white/20 md:backdrop-blur-lg md:flex-row md:py-3 md:px-8 md:rounded-full md:border border-white/40 transition-all duration-300 ${isOpen ? 'max-md:translate-x-0 max-md:opacity-100 max-md:pointer-events-auto' : 'max-md:translate-x-full max-md:opacity-0 max-md:pointer-events-none md:opacity-100'}`}>

        <button 
          className="md:hidden absolute top-6 right-6 p-2 bg-white/20 hover:bg-white/40 transition-colors rounded-full text-gray-900" 
          onClick={() => setIsOpen(false)}
        >
          <XIcon className="w-7 h-7" />
        </button>

        <div className="flex flex-col items-center justify-center w-full h-full gap-8 py-10 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              onClick={() => { scrollTo(0, 0); setIsOpen(false); }}
              to={link.path}
              className={`text-2xl sm:text-3xl font-bold hover:text-blue-600 transition-colors duration-300 ${location.pathname === link.path ? 'text-blue-600' : 'text-gray-900'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden md:contents">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              onClick={() => { scrollTo(0, 0); setIsOpen(false); }}
              to={link.path}
              className={`font-normal text-sm hover:text-blue-600 transition-colors duration-300 ${location.pathname === link.path ? 'text-blue-600 font-bold' : 'text-gray-900'}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">

        {/* 🔥 Improved Search */}
        <div className="relative flex items-center">

          {/* Animated Input */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out fixed md:relative left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 top-[80px] md:top-auto z-[60] ${isSearchOpen ? "w-[90vw] sm:w-[320px] md:w-64 opacity-100 shadow-2xl rounded-full" : "w-0 opacity-0 pointer-events-none"
              }`}
          >
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="
                  w-full
                  px-4 md:px-5 py-2
                  rounded-full
                  bg-white/90
                  backdrop-blur-md
                  border border-gray-300
                  focus:border-primary
                  focus:ring-2 focus:ring-primary/40
                  outline-none
                  text-gray-800
                  placeholder-gray-500
                  shadow-md
                  transition-all duration-300
                  text-sm md:text-base
                "
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </form>
          </div>

          {/* Search Icon */}
          <SearchIcon
            className="w-6 h-6 cursor-pointer hover:scale-110 transition-transform duration-200"
            onClick={() => {
              if (isSearchOpen && searchQuery.trim()) {
                handleSearchSubmit({ preventDefault: () => { } });
              } else {
                setIsSearchOpen(!isSearchOpen);
              }
            }}
          />
        </div>

        {/* Login / User */}
        {!user ? (
          <button onClick={openSignIn} className="px-4 py-1 sm:px-7 sm:py-2 bg-blue-600 hover:bg-blue-700 transition rounded-full font-medium cursor-pointer text-white">
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />}
                onClick={() => navigate("/my-bookings")}
              />
              {user?.primaryEmailAddress?.emailAddress === "namishs457@gmail.com" && (
                <UserButton.Action
                  label="Admin"
                  labelIcon={<LayoutDashboard width={15} />}
                  onClick={() => navigate("/admin")}
                />
              )}
            </UserButton.MenuItems>
          </UserButton>
        )}
        {/* Mobile Menu Icon */}
        <MenuIcon onClick={() => setIsOpen(true)} className="md:hidden w-7 h-7 cursor-pointer text-gray-800" />
      </div>
    </div>
  );
};

export default Navbar;

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
    { name: "Movie", path: "/movies" },
    { name: "Theaters", path: "/theaters" },
    { name: "Collections", path: "/collections" },
    { name: "Watch Guide", path: "/WatchGuides" },
    { name: "News", path: "/news" },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-black/20 backdrop-blur-lg border-b border-white/5">

      <Link to='/' className="max-md:flex-1">
        <img src={assets.logo} alt="" className="w-20 h-11" />
      </Link>

      <div className={`max-md:absolute max-md:top-0 max-md:left-0 z-50 flex flex-col md:flex-row items-center max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen min-md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20 overflow-hidden transition-[width] duration-300 ${isOpen ? 'max-md:w-full' : 'max-md:w-0'}`}>

        <XIcon className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer" onClick={() => setIsOpen(false)} />

        {navLinks.map((link) => (
          <Link
            key={link.path}
            onClick={() => { scrollTo(0, 0); setIsOpen(false); }}
            to={link.path}
            className={`hover:text-primary transition-colors duration-300 ${location.pathname === link.path ? 'text-primary font-bold' : ''}`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">

        {/* 🔥 Improved Search */}
        <div className="relative flex items-center">

          {/* Animated Input */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${isSearchOpen ? "w-40 md:w-64 opacity-100 mr-2" : "w-0 opacity-0"
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
          <button onClick={openSignIn} className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer">
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
      </div>

      <MenuIcon onClick={() => setIsOpen(!isOpen)} className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer" />
    </div>
  );
};

export default Navbar;

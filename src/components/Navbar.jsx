import React, { useState } from 'react';

function Navbar() {
  // State to manage visibility of user menu and dropdown
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to toggle user menu visibility
  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    setShowDropdown(false); // Close dropdown when user menu is toggled
  };

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setShowUserMenu(false); // Close user menu when dropdown is toggled
  };

  // Function to handle mouse enter for user menu and dropdown
  const handleMouseEnter = (menu) => {
    if (menu === 'user') {
      setShowUserMenu(true);
    } else if (menu === 'dropdown') {
      setShowDropdown(true);
    }
  };

  // Function to handle mouse leave to close both user menu and dropdown
  const handleMouseLeave = () => {
    setShowUserMenu(false);
    setShowDropdown(false);
  };

  // Function to handle dropdown click for small screens
  const handleDropdownClick = () => {
    toggleDropdown(); // Toggle dropdown visibility
    setShowUserMenu(false); // Close user menu when dropdown is clicked
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-gray-200 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold">Campus Vibes</span>
        </div>
        <div className="flex space-x-4 relative ml-3 z-20">
          {/* Navigation links for large screens */}
          <a href="#" className="hover:text-gray-300 hidden sm:inline">Home</a>
          <a href="#" className="hover:text-gray-300 hidden sm:inline">About</a>
          <a href="#" className="hover:text-gray-300 hidden sm:inline">Services</a>
          <a href="#" className="hover:text-gray-300 hidden sm:inline">Contact</a>

          {/* Logo */}
          <span className="block sm:hidden" onClick={handleDropdownClick}>
            <button className="focus:outline-none">
              {/* Icon for dropdown */}
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </span>

          {/* Profile */}
          <div onClick={toggleUserMenu} onMouseEnter={() => handleMouseEnter('user')} onMouseLeave={handleMouseLeave}>
            <button
              type="button"
              className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              id="user-menu-button"
              aria-expanded={showUserMenu}
              aria-haspopup="true"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">Open user menu</span>
              {/* User profile image */}
              <img
                className="h-8 w-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </button>
          </div>

          {/* User menu dropdown for large screens */}
          {showUserMenu && (
            <div
              className="absolute -right-2 z-30 mt-9 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
              onMouseEnter={() => handleMouseEnter('user')}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:underline transition duration-300"
                role="menuitem"
              >
                Your Profile
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:underline transition duration-300"
                role="menuitem"
              >
                Settings
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:underline transition duration-300"
                role="menuitem"
              >
                Sign out
              </a>
            </div>
          )}

          {/* Dropdown menu for small screens */}
          {showDropdown && (
            <div
              className="absolute -right-2 z-30 mt-9 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu-button"
            >
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Home</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">About</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Services</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700" role="menuitem">Contact</a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

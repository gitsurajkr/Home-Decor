import React, { useState, useEffect, useRef, useCallback } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulated auth state
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Simulate login
    const handleLogin = () => {
        setIsLoggedIn(true); // Update auth state
        closeDropdown();
        navigate("/signin");
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // Reset auth state
        closeDropdown();
        console.log("User logged out");
    };

    const toggleDropdown = useCallback(() => {
        setDropdownOpen((prev) => !prev);
    }, []);

    const closeDropdown = useCallback(() => {
        setDropdownOpen(false);
    }, []);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                closeDropdown();
            }
        };

        if (dropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownOpen, closeDropdown]);

    return (
        <div className="bg-silver flex items-center justify-center">
            <header className="fixed top-0 left-0 right-0 bg-[rgba(0,0,0,0.4)] w-full p-4 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Navigation Links */}
                    <div className="flex space-x-6 pl-7">
                        <button
                            onClick={() => navigate("/")}
                            className="text-headerColour font-cantarell text-lg tracking-wide hover:underline"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => navigate("/product-page")}
                            className="text-headerColour font-cantarell text-lg tracking-wide hover:underline"
                        >
                            Shop
                        </button>
                        <button
                            onClick={() => navigate("/category")}
                            className="text-headerColour font-cantarell text-lg tracking-wide hover:underline"
                        >
                            Category
                        </button>
                    </div>

                    {/* Search, Cart, and Profile */}
                    <div className="flex items-center space-x-4 pr-5">
                        {/* Search Box */}
                        <div className="relative">
                            <Input
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="opacity-40 text-black pr-10 tracking-wider font-cantarell w-64 rounded-lg text-sm"
                                type="text"
                                required
                            />
                            <IoIosSearch
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-900 cursor-pointer"
                                onClick={handleSearch}
                            />
                        </div>
                        {/* Cart Icon */}
                        <button aria-label="Cart">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 text-headerColour hover:text-gray-300"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                        </button>

                        {/* User Dropdown */}
                        <div
                            className="relative text-headerColour text-2xl hover:text-gray-300 cursor-pointer"
                            ref={dropdownRef}
                        >
                            <AiOutlineUser onClick={toggleDropdown} />
                            {dropdownOpen && (
                                <div
                                    className={`absolute right-0 mt-2 w-44 bg-navyBlue shadow-lg rounded-lg overflow-hidden transition-transform transform ${
                                        dropdownOpen
                                            ? "scale-100 opacity-100"
                                            : "scale-95 opacity-0"
                                    } duration-200 ease-in-out`}
                                >
                                    <ul className="py-2">
                                        {isLoggedIn ? (
                                            <>
                                                <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                                                    <button
                                                        onClick={() => {
                                                            closeDropdown();
                                                            navigate("/profile");
                                                        }}
                                                        className="w-full text-left"
                                                    >
                                                        Profile
                                                    </button>
                                                </li>
                                                <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                                                    <button
                                                        onClick={() => {
                                                            closeDropdown();
                                                            navigate("/orders");
                                                        }}
                                                        className="w-full text-left"
                                                    >
                                                        Orders
                                                    </button>
                                                </li>
                                                <li className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">
                                                    <button
                                                        onClick={() => {
                                                            closeDropdown();
                                                            navigate("/settings");
                                                        }}
                                                        className="w-full text-left"
                                                    >
                                                        Settings
                                                    </button>
                                                </li>
                                                <li className="px-4 py-2 text-sm hover:bg-red-100 text-red-600 cursor-pointer">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-left"
                                                    >
                                                        Sign Out
                                                    </button>
                                                </li>
                                            </>
                                        ) : (
                                            <li className="px-4 py-2 text-sm hover:bg-gray-800 cursor-pointer">
                                                <button
                                                    onClick={handleLogin}
                                                    className="w-full text-left"
                                                >
                                                    Login
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;
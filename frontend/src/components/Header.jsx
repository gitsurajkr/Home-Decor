import React from "react";
import { Input } from "@/components/ui/input";
import { AiOutlineUser } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
    return (
        <div className="bg-silver flex items-center justify-center">
            <header className="fixed top-0 left-0 right-0 bg-[rgba(0,0,0,0.4)] w-full p-4 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex space-x-6 pl-7">
                        <a href="#" className="text-headerColour font-cantarell text-lg tracking-wide hover:underline">Home</a>
                        <a href="#" className="text-headerColour font-cantarell text-lg tracking-wide hover:underline">Shop</a>
                        <a href="#" className="text-headerColour font-cantarell text-lg tracking-wide hover:underline">Category</a>
                    </div>

                    <div className="flex items-center space-x-4 pr-5">
                        {/* Search Box */}
                        <div className="relative">
                            <Input
                                placeholder="Search"
                                className="text-black pr-10 tracking-wider font-cantarell w-64 rounded-lg text-sm"
                                type="text"
                                required
                            />
                            <IoIosSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        </div>

                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-headerColour hover:text-gray-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                            </svg>
                        </div>

                        {/* User Icon */}
                        <div className="text-headerColour text-2xl hover:text-gray-300">
                            <AiOutlineUser />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Header;

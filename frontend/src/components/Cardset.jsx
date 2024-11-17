import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Button } from "./ui/button";

const Cardset = ({ headText, images = [], text }) => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 p-2">
            <p className="text-navyBlue font-cantarell text-2xl font-medium tracking-widest text-center pt-5">
                {headText}
            </p>
            <div className="flex items-center justify-center space-x-4">
                {/* Left Arrow */}
                <div className="flex items-center justify-center cursor-pointer rounded-full w-10 h-10 hover:shadow-lg hover-bg-white transition-all">
                    <FaChevronLeft />
                </div>
                {/* Cards */}
                <div className="w-[80vw] p-5 grid grid-cols-3 gap-4">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="border-2 border-CardSet hover:scale-105 transition-transform"
                        >
                            <img
                                src={image}
                                alt={`Decor ${index + 1}`}
                                className="w-full h-64 object-cover transition-transform hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
                {/* Right Arrow */}
                <div className="flex items-center justify-center cursor-pointer rounded-full w-10 h-10 hover:shadow-lg hover-bg-white transition-all">
                    <FaChevronRight />
                </div>
            </div>
            <Button className="text-xl items-center bg-silver hover:bg-red-200 text-navyBlue rounded-none font-cantarell tracking-wider md:w-[30vw] lg:w-[25vw] lg:text-xl">
                {text || "Explore Now"}
            </Button>
        </div>
    );
};

export default Cardset;

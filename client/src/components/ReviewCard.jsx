import React, { useState } from "react";
import StarRating from "@/components/StarsRating";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ReviewCard = ({ text, reviews }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const reviewsPerPage = 3;
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);

    const handleNext = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
    };

    const handlePrev = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
    };

    const startIndex = currentPage * reviewsPerPage;
    const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

    return (
        <div className="pb-7">
            {/* Section Heading */}
            <h2 className="text-2xl font-medium text-navyBlue font-cantarell tracking-wide text-center p-8">
                {text}
            </h2>

            {/* Reviews Container */}
            <div className="relative flex flex-col items-center justify-center py-10 px-4 bg-silver max-w-[80vw] mx-auto">
                {/* Left Arrow */}
                <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center rounded-full w-10 h-10 hover:shadow-lg hover:bg-white transition-all"
                    aria-label="Previous reviews"
                >
                    <FaChevronLeft  />
                </button>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
                    {currentReviews.map((review, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center bg-white shadow-md p-6 rounded-lg text-center space-y-4"
                        >
                            <img
                                src={review.image}
                                alt={`${review.name}'s profile`}
                                className="w-24 h-24 object-cover rounded-full"
                            />
                            <p className="font-semibold text-lg text-navyBlue">{review.name}</p>
                            <StarRating rating={review.stars} />
                            <p className="text-CardSet">"{review.comment}"</p>
                            <p className="font-JimNightshade font-semibold text-md text-CardSet">
                                ~ {review.userName}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Right Arrow */}
                <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center justify-center  rounded-full w-10 h-10 hover:shadow-2xl hover:bg-white transition-all"
                    aria-label="Next reviews"
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
};

export default ReviewCard;

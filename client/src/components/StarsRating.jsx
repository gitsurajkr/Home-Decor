import React from "react";
import  Stars  from "@/assets/star.png"

const StarRating = ({ rating }) => {
    const totalStars = 5;
    return (
        <div className="flex justify-center">
            {Array.from({ length: totalStars }, (_, index) => (
               <img className=" -mb-1 w-5 h-5 mx-1" src={Stars} alt="" />
            ))}
        </div>
    );
};

export default StarRating;

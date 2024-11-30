import React from "react";
import Stars from "@/assets/star.png"; 
import EmptyStar from "@/assets/empty-star.png"; 

const StarRating = ({ rating }) => {
  const totalStars = 5;

  return (
    <div className="flex justify-center">
      {Array.from({ length: totalStars }, (_, index) => (
        <img
          key={index} 
          className="-mb-1 w-5 h-5 mx-1"
          src={index < rating ? Stars : EmptyStar} 
          alt={index < rating ? "Filled star" : "Empty star"} 
        />
      ))}
    </div>
  );
};

export default StarRating;

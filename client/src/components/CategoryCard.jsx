import React from "react";

const CategoryCard = ({ image, title, alt }) => (
    <div className="flex flex-col items-center text-center w-full sm:w-[10%] ">
      <img
        className="w-full object-cover rounded-full border-2 border-black "
        src={image}
        alt={alt}
      />
      <p className="mt-4 text-md font-semibold">{title}</p>
    </div>
);

export default CategoryCard;
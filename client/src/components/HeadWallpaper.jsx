import React from "react";
import Wallpaper from "@/assets/image.jpg";

const HeadWallpaper = () => {
    return (
        <div className="flex-grow">
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
            <img
                src={Wallpaper}
                alt="Beautiful scenic landscape wallpaper"
                className="w-full h-screen object-fill"
            />
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold ">
                <p className="text-center font-Italiana font-medium tracking-wide pt-20 text-6xl text-textColour">HOME DECOR</p>
                <p className="text-center font-JimNightshade font-medium tracking-wide text-3xl pt-5 text-textColour">TURNING HOUSES INTO HOMES</p>
            </div>
        </div>
    );
};

export default HeadWallpaper;

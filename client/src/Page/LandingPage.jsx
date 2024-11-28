import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import Bedroom from "../assets/images/bed-room.png";
import DiningRoom from "../assets/images/dining-room.png";
import DrawingRoom from "../assets/images/drawing-room.png";
import CategoryCard from "../components/CategoryCard";
import HeadWallpaper from "@/components/HeadWallpaper";
import Cardset from "@/components/Cardset";
import Decor1 from "@/assets/decor/decor1.png";
import Decor2 from "@/assets/decor/decor2.jpg";
import Decor3 from "@/assets/decor/decor3.jpg";
import Decor4 from "@/assets/decor/decor4.jpg";
import Decor5 from "@/assets/decor/decor5.jpg";
import Review from "@/components/ReviewCard";

const reviewsData = [
    {
        image: Decor4,
        name: "Candles",
        comment: "Great Product! Totally recommend it.",
        userName: "John Doe",
    },
    {
        image: Decor5,
        name: "Floral Cushion",
        comment: "Excellent quality and service.",
        userName: "John Doe",
    },
    {
        image: Decor1,
        name: "Wall Hanging",
        comment: "Amazing design and value for money!",
        userName: "John Doe",
    },
];

const LandingPage = () => {
    return (
        <div>
            <div className="flex flex-col min-h-screen bg-silver">
                <Header />
                <div>
                    <HeadWallpaper />
                </div>
                <div className="flex flex-col items-center space-y-5 p-4">
                    <p className="text-xl font-semibold text-navyBlue font-cantarell tracking-wider">
                        SHOP BY CATEGORY
                    </p>
                    <div className="flex flex-wrap justify-center gap-20">
                        <CategoryCard
                            title="Bedroom"
                            image={Bedroom}
                            alt="Bedroom"
                        />
                        <CategoryCard
                            title="Dining-Room"
                            image={DiningRoom}
                            alt="Dining Room"
                        />
                        <CategoryCard
                            title="Drawing Room"
                            image={DrawingRoom}
                            alt="Drawing Room"
                        />
                    </div>

                </div>

            </div>
            <div>
                <Cardset
                    headText="NEW ARRIVALS"
                    text="VIEW COLLECTION"
                    images={[Decor1, Decor2, Decor3]}

                />

                <Cardset
                    headText="BEST SELLERS"
                    text="VIEW COLLECTION"
                    images={[Decor1, Decor2, Decor3]}
                />
            </div>
            <div>
                <Review reviews={reviewsData} text="Hear from Our Customers"
                />

            </div>

            <Footer />
        </div>
    );
};

export default LandingPage;

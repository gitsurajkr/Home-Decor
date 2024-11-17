import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { SiGmail } from "react-icons/si";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-navyBlue p-5">
            <div className="container mx-auto flex flex-col justify-between items-center -mt-6">
                {/* Contact Section */}
                <div className="text-white text-center mt-4">
                    <p className="font-bold text-lg mb-2">Contact Us</p>
                </div>
                {/* Social Media Section */}
                <div className="flex space-x-6 justify-center md:justify-start items-start">
                    <a href="mailto:example@gmail.com" aria-label="Email">
                        <SiGmail className="text-white text-xl hover:text-gray-200 transition-colors" />
                    </a>
                    <a href="https://facebook.com" aria-label="Facebook">
                        <ImFacebook2 className="text-white text-xl hover:text-gray-200 transition-colors" />
                    </a>
                    <a href="https://twitter.com" aria-label="Twitter">
                        <FaTwitter className="text-white text-xl hover:text-gray-200 transition-colors" />
                    </a>
                    <a href="https://instagram.com" aria-label="Instagram">
                        <FaInstagram className="text-white text-xl hover:text-gray-200 transition-colors" />
                    </a>
                </div>

                {/* Footer Section */}
                <div className="text-white text-center mt-4">
                    <p className="text-sm">© 2021 All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

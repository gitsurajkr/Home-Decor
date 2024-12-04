import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Google from "@/assets/google.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IoEye, IoEyeOff } from "react-icons/io5";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const SigninPage = () => {
    const [emailOrPhone, setEmailOrPhone] = useState(""); // Handles both email and phone number
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const togglePassword = () => setShowPassword(!showPassword);
    const navigatToForgetPassword = () => {
        navigate('/reset-password')
    }
    const OnSubmit = async (e) => {
        e.preventDefault();

        // Determine if the input is email or phone number
        const isPhoneNumber = /^\d{10,14}$/.test(emailOrPhone); // Regex for phone numbers
        const payload = isPhoneNumber
            ? { phoneNumber: emailOrPhone, password }
            : { email: emailOrPhone, password };

        try {
            const response = await axios.post("http://localhost:3737/api/user/signin", payload);

            if (response.status === 200) {
                Cookies.set("token", response.data.token);
                toast.success("Signin Successful",{
                    position: "top-right",
                    duration: 3000,
                    hideProgressBar: true,  
                });
                navigate("/home");
            }
        } catch (error) {
            console.error("Signin error:", error.response?.data || error.message);
            // alert("Signin Failed. Please try again.");
            toast.error("Signin Failed. Please try again!!",{
                position: "top-right",
                duration: 3000,
                hideProgressBar: true,  
            });
        }
    };

    return (
        <div className="bg-silver min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center">
                <Card className="w-full max-w-sm bg-silver border-none">
                    <form onSubmit={OnSubmit}>
                        <CardContent className="space-y-4">
                            <p className="text-navyBlue font-cantarell text-3xl font-semibold tracking-widest text-center">
                                LOGIN
                            </p>
                            <p className="text-left opacity-85">Please enter your email/phone and password</p>
                            <div className="space-y-2">
                                <Input
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                    placeholder="Email or Phone Number"
                                    className="tracking-wider font-cantarell w-full rounded-none text-sm"
                                    type="text"
                                    required
                                />
                                <div className="relative">
                                    <Input
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="tracking-wider font-cantarell w-full rounded-none text-sm"
                                        type={showPassword ? "text" : "password"}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePassword}
                                        className="absolute inset-y-0 right-0 flex items-center pr-4"
                                    >
                                        {showPassword ? <IoEyeOff className="text-slate-800" /> : <IoEye className="text-slate-800" />}
                                    </button>
                                </div>
                                {/* <div>
                                <a className="text-sm text-navyBlue hover:text-black cursor-pointer" >Forget Password?</a>

                                </div> */}
                                <p onClick={navigatToForgetPassword} className="text-sm text-navyBlue hover:text-black cursor-pointer">Forget Password?</p>
                            </div>
                            <Button type="submit" className="w-full bg-navyBlue hover:bg-gray-800 text-silver rounded-none font-cantarell tracking-wider">
                                LOGIN
                            </Button>
                            <p className="text-sm text-center text-navyBlue">
                                Don't have an account?{" "}
                                <a href="/signup" className="text-navyBlue underline">
                                    Signup here
                                </a>
                            </p>
                            <div className="flex items-center justify-center space-x-2 text-navyBlue">
                                <div className="flex-grow border-t border-navyBlue"></div>
                                <span className="text-sm">OR</span>
                                <div className="flex-grow border-t border-navyBlue"></div>
                            </div>
                            <div>
                                <Button className="w-full bg-white text-navyBlue font-cantarell tracking-wide rounded-none hover:bg-gray-100 flex items-center justify-center">
                                    <img src={Google} alt="Google" className="w-5 h-5 mr-3" />
                                    Signin with Google
                                </Button>
                            </div>
                        </CardContent>
                    </form>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default SigninPage;




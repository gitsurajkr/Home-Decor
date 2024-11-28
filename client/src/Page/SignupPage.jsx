import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Google from "@/assets/google.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { IoEye, IoEyeOff } from "react-icons/io5";

const SignupPage = () => {
    const navigate = useNavigate();

    // Form states
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStrength, setPasswordStrength] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    // Visibility toggles
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Error states
    const [phoneNumberError, setPhoneNumberError] = useState("");

    // Validation functions
    const validatePhoneNumber = (phoneNumber) => /^[0-9]{10,14}$/.test(phoneNumber);

    const getPasswordStrength = (password) => {
        if (password.length < 6) return "Weak";
        if (/^(?=.*[!@#$%^&*])(?=.*\d)/.test(password)) return "Strong";
        return "Moderate";
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            alert("Password must contain at least one special character and one digit.");
            return false;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return false;
        }
        return true;
    };

    // Input handlers
    const phoneNumberHandler = (e) => {
        const input = e.target.value;
        setPhoneNumber(input);

        if (!validatePhoneNumber(input)) {
            setPhoneNumberError("Phone number must be 10-14 digits long.");
        } else {
            setPhoneNumberError("");
        }
    };

    // Submit handler
    const onSubmit = async (e) => {
        e.preventDefault();

        if (!validatePassword()) return;

        if (phoneNumberError) {
            alert("Please fix the errors in the form.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3737/api/user/signup", {
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                phoneNumber,
            });

            if (response.status === 200) {
                Cookies.set("token", response.data.token);
                alert("Signup Successful");
                navigate("/signin");
            }
        } catch (error) {
            console.error("Signup error:", error.response?.data || error.message);
            alert("Signup Failed. Please try again.");
        }
    };

    // Toggle functions
    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div className="bg-silver min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center pt-8">
                <Card className="w-full max-w-sm bg-silver border-none pt-12">
                    <form onSubmit={onSubmit}>
                        <CardContent className="space-y-3">
                            <p className="text-navyBlue font-cantarell text-3xl font-semibold tracking-widest text-center">SIGNUP</p>
                            <p className="text-left opacity-85">Enter your details</p>

                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-3">
                                    <Input
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                        className="tracking-wider font-cantarell w-full rounded-none text-sm"
                                        type="text"
                                        required
                                    />
                                    <Input
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                        className="tracking-wider font-cantarell w-full rounded-none text-sm"
                                        type="text"
                                        required
                                    />
                                </div>
                                <Input
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                    className="tracking-wider font-cantarell w-full rounded-none text-sm"
                                    type="email"
                                    required
                                />
                                <div className="relative">
                                    {/* Password Input */}
                                    <div className="relative">
                                        <Input
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setPasswordStrength(getPasswordStrength(e.target.value));
                                            }}
                                            placeholder="Password"
                                            className="tracking-wider font-cantarell w-full rounded-none text-sm pr-10" // Add padding-right to prevent text overlap with the icon
                                            type={showPassword ? "text" : "password"}
                                            required
                                        />
                                        {/* Eye Icon */}
                                        <button
                                            type="button"
                                            onClick={togglePassword}
                                            className="absolute inset-y-0 right-4 flex items-center"
                                        >
                                            {showPassword ? <IoEyeOff className="text-slate-800" /> : <IoEye className="text-slate-800" />}
                                        </button>
                                    </div>

                                    {/* Password Strength Message */}
                                    {password && (
                                        <p
                                            className={`mt-1 text-sm ${passwordStrength === "Strong"
                                                    ? "text-green-800"
                                                    : passwordStrength === "Moderate"
                                                        ? "text-yellow-800"
                                                        : "text-red-800"
                                                }`}
                                        >
                                            Password Strength: {passwordStrength}
                                        </p>
                                    )}
                                </div>
                                <div className="relative">
                                    <Input
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm Password"
                                        className="tracking-wider font-cantarell w-full rounded-none text-sm"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                    />
                                    <button type="button" onClick={toggleConfirmPassword} className="absolute inset-y-0 right-0 flex items-center pr-4">
                                        {showConfirmPassword ? <IoEyeOff className="text-slate-800" /> : <IoEye className="text-slate-800" />}
                                    </button>
                                </div>

                                <div className="relative">
                                    <Input
                                        onChange={phoneNumberHandler}
                                        placeholder="Phone Number"
                                        className={`tracking-wider font-cantarell w-full rounded-none text-sm ${phoneNumberError ? "border-red-500" : ""}`}
                                        type="tel"
                                        required
                                    />
                                    {phoneNumberError && <p className="text-red-500 text-xs">{phoneNumberError}</p>}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={!!phoneNumberError}
                                className={`w-full bg-navyBlue hover:bg-gray-800 text-silver rounded-none font-cantarell tracking-wider ${phoneNumberError ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                            >
                                CREATE MY ACCOUNT
                            </Button>
                            <p className="text-sm text-center text-navyBlue">
                                Already have an account?{" "}
                                <a href="/signin" className="text-navyBlue underline">
                                    Login here
                                </a>
                            </p>
                            <div className="flex items-center justify-center space-x-2 text-navyBlue">
                                <div className="flex-grow border-t border-navyBlue"></div>
                                <span className="text-sm">OR</span>
                                <div className="flex-grow border-t border-navyBlue"></div>
                            </div>
                            <Button className="w-full bg-white text-navyBlue font-cantarell tracking-wide rounded-none hover:bg-gray-100 flex items-center justify-center">
                                <img src={Google} alt="Google" className="w-5 h-5 mr-3" />
                                Signup with Google
                            </Button>
                        </CardContent>
                    </form>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default SignupPage;

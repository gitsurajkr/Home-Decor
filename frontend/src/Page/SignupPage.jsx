import React from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Google from "@/assets/google.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SignupPage = () => {
    return (
        <div className="bg-silver min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center pt-8 ">
                <Card className="w-full max-w-sm bg-silver border-none pt-12">
                    <form>
                        <CardContent className="space-y-3">
                            <p className="text-navyBlue font-cantarell text-3xl font-semibold tracking-widest text-center">SIGNUP</p>
                            <p className="text-left opacity-85">Enter your details</p>

                            <div className="space-y-2">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Input
                                            placeholder="First Name"
                                            className="tracking-wider font-cantarell w-full rounded-none text-sm"
                                            type="text"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            placeholder="Last Name"
                                            className="tracking-wider font-cantarell w-full rounded-none text-sm"
                                            type="text"
                                            required
                                        />
                                    </div>
                                </div>
                                <Input
                                    placeholder="Email"
                                    className="tracking-wider font-cantarell w-full rounded-none text-sm"
                                    type="email"
                                    required
                                />
                                <Input
                                    placeholder="Password"
                                    className="tracking-wider font-cantarell w-full rounded-none text-sm"
                                    type="password"
                                    required
                                />
                                <Input
                                    placeholder="Confirm Password"
                                    className="tracking-wider font-cantarell w-full rounded-none text-sm"
                                    type="password"
                                    required
                                />
                                <Input
                                    placeholder="Phone Number"
                                    className="tracking-wider font-cantarell w-full rounded-none text-sm"
                                    type="tel"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Button className="w-full bg-navyBlue hover:bg-gray-800 text-silver rounded-none font-cantarell tracking-wider">
                                    CREATE MY ACCOUNT
                                </Button>
                                <p className="text-sm text-center text-navyBlue">
                                    Already have an account?{" "}
                                    <a href="#" className="text-navyBlue underline">
                                        Login here
                                    </a>
                                </p>
                                <div className="flex items-center justify-center space-x-2 text-navyBlue">
                                    <div className="flex-grow border-t border-navyBlue"></div>
                                    <span className="text-sm">OR</span>
                                    <div className="flex-grow border-t border-navyBlue"></div>
                                </div>
                            </div>
                            <div>
                                <Button
                                    className="w-full bg-white text-navyBlue font-cantarell tracking-wide rounded-none hover:bg-gray-100 flex items-center justify-center"
                                >
                                    <img src={Google} alt="Google" className="w-5 h-5 mr-3" />
                                    Signup with Google
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

export default SignupPage;

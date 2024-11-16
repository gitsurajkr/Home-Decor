import React from "react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle } from "react-icons/fa";
import Google from "@/assets/google.png";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SigninPage = () => {
    return (
        <div className="bg-silver min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow flex items-center justify-center">
                <Card className="w-full max-w-sm bg-silver border-none">
                    <form>
                        <CardContent className="space-y-4">
                            <p className="text-navyBlue font-cantarell text-3xl font-semibold tracking-widest text-center">
                                LOGIN
                            </p>
                            <p className="text-left opacity-85">Please enter your email and password</p>
                            <div className="space-y-2">
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
                            </div>
                            <div className="space-y-2">
                                <Button className="w-full bg-navyBlue hover:bg-gray-800 text-silver rounded-none font-cantarell tracking-wider">
                                    LOGIN
                                </Button>
                                <p className="text-sm text-center text-navyBlue">
                                    Don't have an account?{" "}
                                    <a href="#" className="text-navyBlue underline">
                                        Create one
                                    </a>
                                </p>
                                <div className="flex items-center justify-center space-x-2 text-navyBlue">
                                    <div className="flex-grow border-t border-navyBlue"></div>
                                    <span className="text-sm">OR</span>
                                    <div className="flex-grow border-t border-navyBlue"></div>
                                </div>
                            </div>
                            <div>
                                <Button className="w-full bg-white text-navyBlue font-cantarell tracking-wide rounded-none hover:bg-gray-100 flex items-center justify-center">
                                    <img
                                        src={Google}
                                        alt="Google"
                                        className="hover:bg-white w-5 h-5 mr-3"
                                    />
                                    Login with Google
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

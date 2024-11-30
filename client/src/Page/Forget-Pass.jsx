import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Footer from '../components/Footer';
import axios from 'axios';
import { ThreeDot } from 'react-loading-indicators';
import toast from 'react-hot-toast';

const ResetPassword = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setIsLoading(true);

        if (!isValidEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            setIsLoading(false);
            return;
        }

        try {
            const API_URL = 'http://localhost:3737';
            const response = await axios.post(`${API_URL}/api/user/password-reset/request`, { email });

            if (response.status === 200) {
                setIsSubmitted(true);
                // window.alert('Password reset link sent successfully.');
                toast.success('Password reset link sent successfully!', {
                    position: 'top-right',
                    duration: 3000,
                    hideProgressBar: true,
                });
            }
        } catch (error) {
            console.error('Password reset request error:', error);
            setErrorMessage('Failed to send reset link. Please check your email and try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isSubmitted) {
            setStep(2);
        }
    }, [isSubmitted]);

    return (
        <div className="bg-silver flex flex-col min-h-screen">
            <Header />
            <div className="flex-grow flex items-center justify-center">
                <div className="p-8 w-full max-w-md bg-textColour shadow-lg rounded-lg border-t-4 border-navyBlue">
                    {step === 1 && (
                        <>
                            <h1 className="text-navyBlue font-cantarell text-2xl font-semibold tracking-wide text-center">
                                Reset Your Password
                            </h1>
                            <p className="text-center text-gray-600 mt-2">
                                Enter your email below to receive a password reset link.
                            </p>
                            <form
                                onSubmit={handleEmailSubmit}
                                className="space-y-6 mt-6 animate-fadeIn"
                            >
                                <div>
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="w-full border-gray-300 rounded-none shadow-sm focus:ring-navyBlue focus:border-navyBlue"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    {errorMessage && (
                                        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    className={`${isLoading ? 'bg-navyBlue text-silver' : 'bg-navyBlue hover:bg-gray-800 text-silver'
                                        }  rounded-none font-cantarell tracking-wider w-full py-2 px-4 focus:ring-2 focus:ring-offset-2 focus:ring-navyBlue transition`}
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex justify-center ">
                                            <ThreeDot color="#000000" size="small" text="" textColor="" />
                                        </div>
                                    ) : (
                                        'Send Reset Link'
                                    )}
                                </Button>
                            </form>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <h1 className="text-2xl font-cantarell font-semibold text-navyBlue text-center tracking-wide">
                                Reset Link Sent!
                            </h1>
                            <div aria-live="polite" className="mt-6 text-center">
                                <p className="text-gray-600 text-center mt-4">
                                    We’ve sent a password reset link to{' '}
                                    <span className="font-semibold text-navyBlue">{email}</span>.
                                    Please check your email inbox (and spam folder) to proceed.
                                </p>
                            </div>
                        </>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ResetPassword;

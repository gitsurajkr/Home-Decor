import React, { useState } from 'react';
import Header from '../components/Header';
import { Card, CardTitle, CardDescription, CardHeader } from '../components/ui/card';
import Footer from '../components/Footer';
import { Label } from '@/components/ui/label';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Changepassword = () => {
    const { userId } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const togglePassword = () => setShowPassword(!showPassword);

    const getPasswordStrength = (password) => {
        if (password.length < 6) return 'Weak';
        if (/^(?=.*[!@#$%^&*])(?=.*\d)/.test(password)) return 'Strong';
        return 'Moderate';
    };

    const validatePassword = () => {
        const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{6,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage("Password must contain at least one special character and one digit.");
            return false;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword()) return;

        setLoading(true);
        try {
            await axios.post(
                `http://localhost:3737/api/user/password-reset/update/${userId}`,
                { newPassword: password },
                { withCredentials: true }
            );

            setPassword('');
            setConfirmPassword('');
            alert('Password updated successfully!');
            navigate('/signin');
        } catch (error) {
            console.error('Password reset error:', error);
            setErrorMessage(error.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderInput = (type, value, onChange, placeholder, id) => (
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            id={id}
            className="bg-textColour border border-gray-400 p-2 rounded-none"
            aria-label={placeholder}
        />
    );

    return (
        <div className="bg-silver min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-grow justify-center items-center pt-12">
                <Card className="w-96 p-6 shadow-md bg-textColour border-t-4 border-navyBlue">
                    <CardHeader className="text-center">
                        <CardTitle className="text-navyBlue font-cantarell text-2xl font-semibold tracking-wide">
                            Reset Password
                        </CardTitle>
                        <CardDescription className="text-center text-gray-600 mt-2">
                            Enter Your New Password below
                        </CardDescription>
                    </CardHeader>
                    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                        {renderInput(
                            showPassword ? 'text' : 'password',
                            password,
                            (e) => {
                                setPassword(e.target.value);
                                setPasswordStrength(getPasswordStrength(e.target.value));
                            },
                            'Enter New Password',
                            'new_password'
                        )}
                        {renderInput(
                            showPassword ? 'text' : 'password',
                            confirmPassword,
                            (e) => setConfirmPassword(e.target.value),
                            'Confirm New Password',
                            'confirm_password'
                        )}
                        <p
                            className={`text-sm ${
                                passwordStrength === 'Strong'
                                    ? 'text-green-700'
                                    : passwordStrength === 'Moderate'
                                    ? 'text-yellow-700'
                                    : 'text-red-700'
                            }`}
                        >
                            {password && `Password Strength: ${passwordStrength}`}
                        </p>
                        <div className="flex items-center space-x-1">
                            <button onClick={togglePassword} className="focus:outline-none" type="button">
                                {showPassword ? (
                                    <MdCheckBox className="text-xl" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="text-xl" />
                                )}
                            </button>
                            <Label className="text-navyBlue cursor-pointer" onClick={togglePassword}>
                                Show Password
                            </Label>
                        </div>
                        {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`bg-navyBlue text-silver p-2 rounded-none hover:bg-gray-800 ${
                                loading && 'opacity-50 cursor-not-allowed'
                            }`}
                        >
                            {loading ? 'Updating...' : 'Change Password'}
                        </button>
                    </form>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default Changepassword;

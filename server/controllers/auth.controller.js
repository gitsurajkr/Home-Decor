const User = require('../models/UserSchema');
const bcrypt = require('bcrypt');
const zod = require('zod');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { getDataFromToken } = require('../helpers/getDataFromToken');

const SignupBodyValidation = zod
    .object({
        firstName: zod.string().min(3, "First name must have at least 3 characters").max(20),
        lastName: zod.string().min(3, "Last name must have at least 3 characters").max(20),
        email: zod.string().email("Invalid email format"),
        password: zod
            .string()
            .min(6, "Password must be at least 6 characters long.")
            .regex(/^(?=.*[!@#$%^&*])(?=.*\d).{6,}$/, "Password must contain at least one special character and one digit."),
        confirmPassword: zod.string(),
        phoneNumber: zod.string().min(10).max(14),
        role: zod.string().optional().default("user"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

// Signup handler
const UserSignUp = async (req, res) => {
    const validationResult = SignupBodyValidation.safeParse(req.body);

    if (!validationResult.success) {
        const errorMessage = validationResult.error.errors[0].message;
        return res.status(400).json({
            message: errorMessage,
            errors: validationResult.error.errors,
        });
    }

    try {
        const { email, password, firstName, lastName, phoneNumber, role } = req.body;

        // Check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            role,
        });

        console.log("User created:", user);

        // Generate token
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({
            message: "User created successfully",
            token,
        });
    } catch (error) {
        console.error("SignUp Error:", error);
        return res.status(500).json({
            message: "An error occurred during signup. Please try again later.",
        });
    }
};

// Signin validation schema
const SigninValidation = zod
    .object({
        email: zod.string().email().optional(),
        password: zod.string().min(6, "Password must be at least 6 characters long."),
        phoneNumber: zod.string().min(10).max(14).optional(),
    })
    .refine((data) => data.email || data.phoneNumber, {
        message: "Either email or phone number is required",
    });

// Signin handler
const UserSignIn = async (req, res) => {
    const validationResult = SigninValidation.safeParse(req.body);

    if (!validationResult.success) {
        const errorMessage = validationResult.error.errors.map((err) => err.message).join(", ");
        return res.status(400).json({ message: errorMessage });
    }

    try {
        const { email, phoneNumber, password } = req.body;
        const user = await User.findOne(email ? { email } : { phoneNumber });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT payload
        const tokenData = {
            userId: user._id,
            userData: user
        };

        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie("token", token, {
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            success: true,
            message: "User signed in successfully",
            token
        });
    } catch (error) {
        console.error("SignIn Error:", error);
        return res.status(500).json({
            success: false,
            message: "An error occurred during sign-in. Please try again later."
        });
    }
};

const userSignOut = async (req, res) => {

    try {

        res.clearCookie('token');

        return res.status(200).json({
            message: "User signed out successfully",
        })
    } catch (error) {
        console.error("SignOut Error:", error);
        return res.status(500).json({
            message: "An error occurred during sign-out. Please try again later.",
        });
    }
}

const userForgetPassword = async (req, res) => {


    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        // Include user ID in reset link

        const resetLink = `http://localhost:5173/update-password/${user._id}`;

        // Nodemailer setup for sending the email

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: 'Password Reset Link',
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({
            message: "Password reset link sent successfully"
        })
    } catch (err) {
        console.error("Forget Password Error:", err);
        res.status(500).json({ message: 'Failed to send email' })
    }
}


const passwordResetUpdate = async (req, res) => {
    const { userId } = req.params;

    const newPassword = req.body.password || req.body.newPassword;

    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d).{6,}$/; // Same regex as frontend
    if (!newPassword || !passwordRegex.test(newPassword)) {
        return res.status(400).json({
            message: "Password must be at least 6 characters long and contain at least one special character and one digit.",
        });
    }


    try {

        const user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }

        // hash new password and update user record

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;

        await user.save();

        res.status(200).json({
            message: "Password updated successfully"
        })
    } catch (err) {
        console.error("Password Reset Error:", err);
        res.status(500).json({ message: 'Failed to reset password' })
    }
}
// const ProductDetails = async (req, res) => {

// }

const getUser = async (req, res) => {
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json({
            message: "User found",
            data: user,
        });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}


module.exports = {
    UserSignUp,
    UserSignIn,
    userSignOut,
    userForgetPassword,
    passwordResetUpdate,
    getUser
};


const zod = require('zod');

// Example Signup schema
const SignupBodyValidation = zod
    .object({
        firstName: zod.string().min(3).max(20),
        lastName: zod.string().min(3).max(20),
        email: zod.string().email(),
        password: zod
            .string()
            .min(6, "Password must be at least 6 characters long.")
            .regex(/^(?=.*[!@#$%^&*])(?=.*\d).{6,}$/, "Password must contain at least one special character and one digit."),
        confirmPassword: zod.string(),
        phoneNumber: zod.string().min(10).max(14),
        role: zod.string().default("user"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match.",
        path: ["confirmPassword"],
    });

module.exports = {
    SignupBodyValidation,
};

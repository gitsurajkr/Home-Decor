const validateRequest = (schema) => (req, res, next) => {
    // Ensure that the schema passed is a Zod schema
    const validation = schema.safeParse(req.body);

    if (!validation.success) {
        const errors = validation.error.issues.map((issue) => ({
            path: issue.path.join('.'),
            message: issue.message,
        }));

        return res.status(400).json({
            message: "Invalid request",
            errors,
        });
    }

    next();
};

module.exports = validateRequest;

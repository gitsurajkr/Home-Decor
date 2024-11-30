const jwt = require("jsonwebtoken");

const getDataFromToken = (req) => {
    try {
        // Extract token from Authorization header or cookies
        const authHeader = req.headers.authorization;

        const token =
            authHeader && authHeader.startsWith("Bearer ")
                ? authHeader.split(" ")[1]
                : req.cookies?.token; // Fallback to cookies if Authorization is not present

        if (!token) {
            throw new Error("Token not provided");
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decodedToken.userData._id)
        return decodedToken.userData._id;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { getDataFromToken };

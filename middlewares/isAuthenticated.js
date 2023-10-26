const jwt = require("jsonwebtoken");
const Users = require("../models/User");

// protecting routes with token
const isAuthenticated = async(req, res, next) => {
    try {

        const token = req.headers["token"] || req.cookies.Token;
        if (!token) {
            return res.status(403).json({
                status: 403,
                success: false,
                message: "Please Login to Continue"
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decode._id
        const checkExists = await Users.findById(userId);

        if(checkExists){
            next()
        }else{
            console.log(userId)
            return res.status(409).json({
                success: false,
                status: 409,
                message: "User Not Found"
            })
        }

    } catch (error) {
        console.error("Error:", error);
        return res.status(401).json({
            status: 401,
            success: false,
            message: "Token not found"
        });
    }
}

module.exports = isAuthenticated
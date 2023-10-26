const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// protecting routes with token
const isAdmin = async(req, res, next) => {
    try {
        const token = req.headers["token"] || req.cookies.Token;
        if (!token) {
            return res.status(403).json({
                status: 403,
                success: false,
                message: "No Token Found"
            });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const userId = decode._id
        const checkExists = await Admin.findById(userId);

        if(checkExists){
            if(checkExists.verificationStatus === "ACTIVE")
                next()
            else{
                return res.status(201).json({
                    status: 201,
                    success: true,
                    message: 'Admin not verified'
                })
            }
        }else{
            return res.status(404).json({
                success: false,
                status: 404,
                message: "No Such Admin Found"
            })
        }

    } catch (error) {
        console.error("Error:", error);
        return res.status(401).json({
            status: 401,
            success: false,
            message: "Please login to continue"
        });
    }
}

module.exports = isAdmin
const express = require("express");
const userRouter = express.Router();
// imports
const { register, login } = require("../controllers/authController");

// routes
// REGISTER
userRouter.post("/register", async(req, res) => {
    const requestBody = req.body
    const response = await register(requestBody);
    const { success, status, message, user } = response;
    if(status === 201){
        return res.status(status).json({
            success,
            status,
            message,
            user
        })
    }
    else if(status === 400){
        return res.status(status).json({
            success,
            status,
            message,
            user
        })
    } 
    else{
        return res.status(status).json({
            success,
            status,
            message,
            user
        })
    }
})
// LOGIN
userRouter.post("/login", async(req, res) => {
    const reqBody = req.body
    const response = await login(reqBody);
    const { success, status, message, token, error } = response;
    if(status === 200){
        return res.status(status).json({
            success,
            status,
            message,
            token
        })
    }
    else if(status === 403){
        return res.status(status).json({
            success,
            status,
            message,
            token
        })
    }
    else if(status === 404){
        return res.status(status).json({
            success,
            status,
            message,
            token
        })
    }
    else{
        return res.status(status).json({
            success,
            status,
            message,
            error,
            token
        })
    }
})


module.exports = userRouter
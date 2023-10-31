const express = require("express");
const userRouter = express.Router();
const isEither = require("../middlewares/isEither")
const isAuthenticated = require("../middlewares/isAuthenticated")
// imports
const { register, login, getuser } = require("../controllers/authController");

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
    const { success, status, message, token, error, id } = response;
    if(status === 200){
        return res.status(status).json({
            success,
            status,
            message,
            token,
            id
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

// FEtch user
userRouter.get('/fetchuser/:id', isAuthenticated, async (req,res) => {
    let id = req.params.id;
    const response = await getuser(id);
    const {success, status, message, user} = response;

    return res.status(status).json({
        success,
        status,
        message,
        user
    })
})



module.exports = userRouter